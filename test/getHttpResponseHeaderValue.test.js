import {
    getHttpResponseHeaderValue
} from '../src/index.js';

test('获取 HTTP 返回结果中的 header 值', function() {
    var headerObject = {
        'Connection': 'keep-alive',
        'ETag': 'foobar123',
        'content-type': 'application/json',
        'X-Powered-By': 'Express'
    };

    expect(getHttpResponseHeaderValue(headerObject, 'Connection')).toBe('keep-alive');
    expect(getHttpResponseHeaderValue(headerObject, 'connection')).toBe('keep-alive');

    expect(getHttpResponseHeaderValue(headerObject, 'ETag')).toBe('foobar123');

    expect(getHttpResponseHeaderValue(headerObject, 'Content-Type')).toBe('application/json');
    expect(getHttpResponseHeaderValue(headerObject, 'content-type')).toBe('application/json');
    expect(getHttpResponseHeaderValue(headerObject, 'Content-TYpe')).toBe('application/json');

    expect(getHttpResponseHeaderValue(headerObject, 'X-Powered-By')).toBe('Express');
    expect(getHttpResponseHeaderValue(headerObject, 'x-powered-by')).toBe('Express');
});