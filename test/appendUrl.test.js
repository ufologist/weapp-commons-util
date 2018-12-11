import {
    appendUrl
} from '../src/index.js';

import qs from 'querystringify';

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

test('拼接空对象', function() {
    expect(appendUrl('https://domain.com', {})).toBe('https://domain.com');
});

test('拼接对象时排除 undefined 的属性', function() {
    expect(appendUrl('https://domain.com', {
        a: undefined,
        b: 1
    })).toBe('https://domain.com?b=1');
});

test('拼接字符串时做参数去重', function() {
    expect(appendUrl('https://domain.com?a=1', 'a=2&b=3', true)).toBe('https://domain.com?a=2&b=3');
});

test('拼接对象时做参数去重', function() {
    expect(appendUrl('https://domain.com?a=1', {
        a: 2,
        b: 3
    }, true)).toBe('https://domain.com?a=2&b=3');
});