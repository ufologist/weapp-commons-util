import {
    getCurrentPageUrl
} from '../src/index.js';

import './__mocks__/getCurrentPages.js';

test('获取当前页面的 URL', function() {
    expect(getCurrentPageUrl()).toBe('/path/to/page2?a=2');
});
test('获取当前页面的 URL, 去除页面的 query 参数', function() {
    expect(getCurrentPageUrl(true)).toBe('/path/to/page2');
});