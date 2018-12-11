import qs from 'querystringify';
import extend from 'extend';

// 工具函数

/**
 * 获取当前页面的 URL, 默认会追加当前页面的 query 参数
 * 
 * @param {boolean} stripQuery 是否去除页面的 query 参数, 默认不去除
 * @returns {string} 页面的 URL
 */
export function getCurrentPageUrl(stripQuery) {
    var url = '';

    // 获取当前页面栈的实例，以数组形式按栈的顺序给出，第一个元素为首页，最后一个元素为当前页面。
    // 不要尝试修改页面栈，会导致路由以及页面状态错误
    // 不要在 App.onLaunch 的时候调用 getCurrentPages()，此时 page 还没有生成
    // https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/route.html
    var pages = getCurrentPages();
    if (pages) {
        var currentPage = pages[pages.length - 1];
        url = `/${currentPage.route}`;
        if (!stripQuery) {
            url = appendUrl(url, currentPage.options);
        }
    }

    return url;
};

/**
 * 获取当前页面的 URL 参数
 *
 * @returns {object} 页面的 URL 参数
 */
export function getCurrentPageUrlParams() {
    var urlParams = {};
    var pages = getCurrentPages();
    if (pages) {
        var currentPage = pages[pages.length - 1];
        urlParams = currentPage.options;
    }

    return urlParams;
};

/**
 * 刷新当前页面
 * 
 * @param {boolean} stripQuery 是否去除页面的 query 参数, 默认不去除
 */
export function reloadCurrentPage(stripQuery) {
    wx.redirectTo({
        url: getCurrentPageUrl(stripQuery)
    });
};

/**
 * 调用某个页面的方法
 * 
 * @param {string} methodName 
 * @param {Array} args 
 * @param {number} index 默认为当前页
 * @return {any}
 */
export function invokePageMethod(methodName, args, index) {
    var pages = getCurrentPages();
    var lastIndex = pages.length - 1;

    // 默认取当前页面
    var _index = typeof index !== 'undefined' ? index : lastIndex;
    if (_index <= 0) { // 首页
        _index = 0;
    } else if (_index >= lastIndex) { // 当前页
        _index = lastIndex;
    } else { // 传入的 index 可能不是数值
        _index = lastIndex;
    }

    var page = pages[_index];
    if (page && page[methodName]) {
        return page[methodName].apply(page, args);
    }
};

/**
 * 在 URL 上追加参数
 * 
 * @param {string} url
 * @param {string | object} params 要追加在 URL 上的参数
 * @param {boolean} replaceExistParams 如果原 URL 中已经有了待追加的参数, 是否覆盖, 默认不覆盖
 *                                     注意会使原 URL 中的重复参数合并成一个
 *                                     例如: https://domain.com?a=1&a=2&b=3
 *                                     追加 a=4
 *                                     最终 https://domain.com?a=4&b=3
 * @return {string} 追加了参数的 URL
 */
export function appendUrl(url, params, replaceExistParams) {
    var _url = url;
    var _params = params;

    if (typeof _params === 'object') {
        // 排除 undefined 的属性
        var filteredUndefined = {};
        for (var key in _params) {
            if (typeof _params[key] !== 'undefined') {
                filteredUndefined[key] = _params[key];
            }
        }
        _params = qs.stringify(filteredUndefined);
    }

    if (replaceExistParams && url.indexOf('?') !== -1) {
        var urlAndQs = url.split('?');
        var querystring = '';
        _url = urlAndQs[0];
        querystring = urlAndQs[1];

        var originalParams = qs.parse(querystring);
        _params = extend({}, originalParams, qs.parse(_params));
        _params = qs.stringify(_params);
    }

    if (_params) {
        if (_url.indexOf('?') === -1) {
            _url = _url + '?' + _params;
        } else {
            _url = _url + '&' + _params;
        }
    }

    return _url;
};

/**
 * 检测是否有新版本
 * 建议在 app.js#onShow 中调用
 * 
 * @param {object} options
 *                 options.showModal {boolean} 有新版本时是否显示新版本的提示框
 *                 options.modalTitle {string} 新版本提示框的标题
 *                 options.modalContent {string} 新版本提示框的内容
 *                 options.forceUpdate {boolean} 是否强制升级, 开启强制升级新版本提示框不会有取消按钮
 *                 options.checkCallback {Function} 检测更新的回调
 */
export function checkUpdate(options) {
    var _options = extend({
        showModal: true,
        modalTitle: '更新提示',
        modalContent: '新版本已经准备好了，是否重启应用？',
        forceUpdate: true,
        checkCallback: function() {}
    }, options);

    // https://developers.weixin.qq.com/miniprogram/dev/api/update/wx.getUpdateManager.html
    if (wx.getUpdateManager) {
        var updateManager = wx.getUpdateManager();
        updateManager.onCheckForUpdate(function(result) {
            _options.checkCallback.apply(updateManager, arguments);

            if (result.hasUpdate) {
                if (_options.showModal) {
                    wx.showModal({
                        title: _options.modalTitle,
                        content: _options.modalContent,
                        showCancel: !_options.forceUpdate,
                        success(result) {
                            if (result.confirm) {
                                updateManager.onUpdateReady(function() {
                                    updateManager.applyUpdate();
                                });
                            }
                        }
                    });
                }
            }
        });
    } else {
        console.log('没有获取到全局唯一的版本更新管理器, 支持版本 >= 1.9.90');
    }
};

/**
 * 获取用户信息回调时判断是否取到了用户信息
 * 
 * - bindgetuserinfo
 * 
 * @param {object} userInfoResult
 * @return {boolean}
 */
export function isGetUserInfoSuccess(userInfoResult) {
    return userInfoResult.errMsg.indexOf('getUserInfo:fail') == -1;
};

/**
 * 获取用户手机号回调时判断是否取到了用户信息
 * 
 * - bindgetphonenumber
 * 
 * @param {object} phoneResult
 * @return {boolean}
 */
export function isGetPhoneNumberSuccess(phoneResult) {
    return phoneResult.errMsg.indexOf('getPhoneNumber:fail') == -1;
};

/**
 * 获取 CSS 样式字符串
 * 
 * {position:'absolute',top:'104rpx'} => position:absolute;top:10rpx;
 * 
 * @param {object} styleObject
 * @return {string}
 */
export function getCssString(styleObject) {
    var style = [];
    if (styleObject) {
        for (var key in styleObject) {
            style.push(`${key}:${styleObject[key]}`);
        }
    }
    return style.join(';');
};