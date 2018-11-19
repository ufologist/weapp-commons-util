import extend from 'extend';
import {
    appendUrl,
    invokePageMethod
} from './util.js';

// 包装 wx 的方法

/**
 * 封装原生的 navigateTo 方法
 * 
 * - 解决微信小程序只允许跳转 10 层路由的问题, 超过限制后自动变为 redirectTo 跳转页面
 * 
 * @param {object} options
 *                 options._urlParams {object} 需要追加到 URL 上的参数
 */
export function navigateTo(options) {
    var _options = extend({}, options);

    if (_options._urlParams) {
        _options.url = appendUrl(_options.url, _options._urlParams);
    }

    // 最多 10 次路由(首页本身也算一次)
    if (getCurrentPages().length < 10) {
        return wx.navigateTo(_options);
    } else {
        return wx.redirectTo(_options);
    }
};

/**
 * 封装原生的 redirectTo 方法
 * 
 * @param {object} options
 *                 options._urlParams {object} 需要追加到 URL 上的参数
 */
export function redirectTo(options) {
    var _options = extend({}, options);

    if (_options._urlParams) {
        _options.url = appendUrl(_options.url, _options._urlParams);
    }

    return wx.redirectTo(_options);
};

/**
 * 封装原生的 navigateBack 方法
 * 
 * - 回退页面时调用回退页的特定方法
 * - 判断预期返回的页面
 * 
 * @param options
 *        options._triggerOnNavigateBack 调用回退页中的 _onNavigateBack 方法
 *        options._onNavigateBackArgs 传入 _onNavigateBack 方法的参数
 *        options._expectedBackUrl 预期返回的页面 URL
 */
export function navigateBack(options = {}) {
    var _options = extend({}, options);

    // 包装成功方法
    _options.success = options.success;
    if (_options._triggerOnNavigateBack) {
        _options.success = function() {
            options.success && options.success();
            invokePageMethod('_onNavigateBack', [_options._onNavigateBackArgs]);
        };
    }

    // 预期返回的页面
    if (_options._expectedBackUrl) {
        var pages = getCurrentPages();

        if (pages.length === 1) { // 没有上一页
            _options.url = _options._expectedBackUrl;
            // XXX tabbar 的页面算是第一个页面
            return navigateTo(_options);
        } else {
            var delta = isNaN(parseInt(_options.delta)) ? 1 : parseInt(_options.delta);
            if (delta >= pages.length) { // 首页
                delta = pages.length - 1;
            } else if (delta <= 0) { // 上一页
                delta = 1;
            }

            // 需要排掉当前页
            var backPage = pages[pages.length - (delta + 1)];

            // 回退的页面符合预期直接回退
            if (backPage.route.indexOf(_options._expectedBackUrl) != -1) {
                return wx.navigateBack(_options);
            } else { // 不符合预期则跳转到预期页面
                _options.url = _options._expectedBackUrl;
                return navigateTo(_options);
            }
        }
    } else { // 兜底
        return wx.navigateBack(_options);
    }
};