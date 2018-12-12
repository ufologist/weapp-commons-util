import {
    getCurrentPageUrlParams
} from '../src/index.js';

import './__mocks__/getCurrentPages.js';

test('获取当前页面的 URL 的参数', function() {
    expect(getCurrentPageUrlParams()).toEqual({
        a: 2
    });
});