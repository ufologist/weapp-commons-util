# weapp-commons-util

[![NPM version][npm-image]][npm-url] [![Build Status][ci-status-image]][ci-status-url] [![Coverage Status][coverage-status-image]][coverage-status-url] [![changelog][changelog-image]][changelog-url] [![license][license-image]][license-url]

[ci-status-image]: https://travis-ci.org/ufologist/weapp-commons-util.svg?branch=master
[ci-status-url]: https://travis-ci.org/ufologist/weapp-commons-util
[coverage-status-image]: https://coveralls.io/repos/github/ufologist/weapp-commons-util/badge.svg?branch=master
[coverage-status-url]: https://coveralls.io/github/ufologist/weapp-commons-util
[npm-image]: https://img.shields.io/npm/v/weapp-commons-util.svg?style=flat-square
[npm-url]: https://npmjs.org/package/weapp-commons-util
[license-image]: https://img.shields.io/github/license/ufologist/weapp-commons-util.svg
[license-url]: https://github.com/ufologist/weapp-commons-util/blob/master/LICENSE
[changelog-image]: https://img.shields.io/badge/CHANGE-LOG-blue.svg?style=flat-square
[changelog-url]: https://github.com/ufologist/weapp-commons-util/blob/master/CHANGELOG.md

[![npm-image](https://nodei.co/npm/weapp-commons-util.png?downloads=true&downloadRank=true&stars=true)](https://npmjs.com/package/weapp-commons-util)

微信小程序通用工具库

## Example

```javascript
import {
    appendUrl
} from 'weapp-commons-util';

appendUrl('https://domain.com', {
    a: 1,
    b: 2
});
```

## APIDoc

[ESDoc](https://doc.esdoc.org/github.com/ufologist/weapp-commons-util/)

* `util` - 工具函数
  * `appendUrl`
  * `checkUpdate`
  * `getCssString`
  * `getCurrentPageUrl`
  * `getCurrentPageUrlParams`
  * `getHttpResponseHeaderValue`
  * `hasAuth`
  * `invokePageMethod`
  * `isGetPhoneNumberSuccess`
  * `isGetUserInfoSuccess`
  * `reloadCurrentPage`
* `wx` - 包装 wx 的方法
  * `navigateBack`
  * `navigateTo`
  * `redirectTo`