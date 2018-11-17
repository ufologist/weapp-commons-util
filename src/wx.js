import extend from 'extend';
import {
    appendUrl,
    invokePageMethod
} from './util.js';

// 包装 wx 的方法

/**
 * 封装原生的 navigateTo 方法
 * 
 * - 解决只允许 10 层路由的问题
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
 * 封装原生的 navigateBack 方法
 * 
 * - 回退页面时调用回退页的特定方法
 * 
 * @param options
 * @param options._triggerOnNavigateBack 调用回退页中的 _onNavigateBack 方法
 * @param options._onNavigateBackArgs 传入 _onNavigateBack 方法的参数
 */
export function navigateBack(options = {}) {
    var originalSuccessCallback = options.success;
    if (originalSuccessCallback) {
        options.success = function() {
            originalSuccessCallback();

            if (options._triggerOnNavigateBack) {
                invokePageMethod('_onNavigateBack', [options._onNavigateBackArgs]);
            }
        };
    } else {
        options.success = function() {
            if (options._triggerOnNavigateBack) {
                invokePageMethod('_onNavigateBack', [options._onNavigateBackArgs]);
            }
        };
    }

    return wx.navigateBack(options);
};