import {
    invokePageMethod
} from '../src/index.js';

import './__mocks__/getCurrentPages.js';

getCurrentPages().forEach(function(item) {
    item._onNavigateBack = jest.fn(item._onNavigateBack);
});
afterEach(function() {
    getCurrentPages().forEach(function(item) {
        item._onNavigateBack.mockClear();
    });
});

test('默认调用当前页面的方法', function() {
    invokePageMethod('_onNavigateBack', [1, 2]);
    var _onNavigateBack = getCurrentPages()[getCurrentPages().length - 1]._onNavigateBack;

    expect(_onNavigateBack.mock.calls.length).toBe(1);
    expect(_onNavigateBack.mock.calls[0][0]).toBe(1);
    expect(_onNavigateBack.mock.calls[0][1]).toBe(2);
    expect(_onNavigateBack.mock.results[0].value).toBe(2);
});

test('调用指定页面的方法', function() {
    var index = 0;

    invokePageMethod('_onNavigateBack', [1, 2], index);
    var _onNavigateBack = getCurrentPages()[index]._onNavigateBack;

    expect(_onNavigateBack.mock.calls.length).toBe(1);
    expect(_onNavigateBack.mock.calls[0][0]).toBe(1);
    expect(_onNavigateBack.mock.calls[0][1]).toBe(2);
    expect(_onNavigateBack.mock.results[0].value).toBe(1);
});

test('负索引时调用第一个页面的方法', function() {
    var index = -1;

    invokePageMethod('_onNavigateBack', [1, 2], index);
    var _onNavigateBack = getCurrentPages()[0]._onNavigateBack;

    expect(_onNavigateBack.mock.calls.length).toBe(1);
    expect(_onNavigateBack.mock.calls[0][0]).toBe(1);
    expect(_onNavigateBack.mock.calls[0][1]).toBe(2);
    expect(_onNavigateBack.mock.results[0].value).toBe(1);
});

test('索引超出时调用当前页面的方法', function() {
    var index = 100;

    invokePageMethod('_onNavigateBack', [1, 2], index);
    var _onNavigateBack = getCurrentPages()[getCurrentPages().length - 1]._onNavigateBack;

    expect(_onNavigateBack.mock.calls.length).toBe(1);
    expect(_onNavigateBack.mock.calls[0][0]).toBe(1);
    expect(_onNavigateBack.mock.calls[0][1]).toBe(2);
    expect(_onNavigateBack.mock.results[0].value).toBe(2);
});