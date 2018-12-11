import {
    getCssString
} from '../src/index.js';

test('获取 CSS 样式字符串', function() {
    expect(getCssString({
        position: 'absolute',
        top: '10rpx'
    })).toBe('position:absolute;top:10rpx');
});