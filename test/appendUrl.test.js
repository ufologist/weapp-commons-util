import {
    appendUrl
} from '../src/index.js';

describe('拼接不带 querystring 的 URL', function() {
    test('拼接字符串', function() {
        expect(appendUrl('https://domain.com', 'a=1')).toBe('https://domain.com?a=1');
    });
    test('拼接对象', function() {
        expect(appendUrl('https://domain.com', {
            a: 1
        })).toBe('https://domain.com?a=1');
    });
});

describe('拼接带 querystring 的 URL', function() {
    test('拼接字符串', function() {
        expect(appendUrl('https://domain.com?a=1', 'b=2')).toBe('https://domain.com?a=1&b=2');
    });
    test('拼接对象', function() {
        expect(appendUrl('https://domain.com?a=1', {
            b: 2
        })).toBe('https://domain.com?a=1&b=2');
    });
});

describe('拼接参数时使用 URL 编码', function() {
    test('拼接字符串参数不做 URI 编码', function() {
        expect(appendUrl('https://domain.com', 'a=中文')).toBe('https://domain.com?a=中文');
    });
    test('拼接对象参数做 URI 编码', function() {
        expect(appendUrl('https://domain.com', {
            a: '中文'
        })).toBe('https://domain.com?a=%E4%B8%AD%E6%96%87');
    });
});

test('拼接空对象', function() {
    expect(appendUrl('https://domain.com', {})).toBe('https://domain.com');
});

test('拼接对象时排除 undefined 的属性', function() {
    expect(appendUrl('https://domain.com', {
        a: undefined,
        b: 1
    })).toBe('https://domain.com?b=1');
});

describe('参数去重', function() {
    test('默认不去重, 直接追加', function() {
        expect(appendUrl('https://domain.com?a=1&a=2', 'a=3&b=4')).toBe('https://domain.com?a=1&a=2&a=3&b=4');
        expect(appendUrl('https://domain.com?a=1&a=2', {
            a: 3,
            b: 4
        })).toBe('https://domain.com?a=1&a=2&a=3&b=4');

        expect(appendUrl('https://domain.com?a=1', 'a=2&b=3')).toBe('https://domain.com?a=1&a=2&b=3');
        expect(appendUrl('https://domain.com?a=1', {
            a: 2,
            b: 3
        })).toBe('https://domain.com?a=1&a=2&b=3');
    });

    test('拼接字符串', function() {
        expect(appendUrl('https://domain.com?a=1', 'a=2&b=3', true)).toBe('https://domain.com?a=2&b=3');
    });

    test('拼接对象', function() {
        expect(appendUrl('https://domain.com?a=1', {
            a: 2,
            b: 3
        }, true)).toBe('https://domain.com?a=2&b=3');
    });
});