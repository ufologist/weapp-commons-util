# CHANGELOG

* v0.0.4 2019-1-8

  * [fix] `appendUrl` 将对象追加到 URL 作为参数时存在二次编码的 bug

* v0.0.3 2019-1-7

  * [feat] 封装的 `navigateTo` 调用失败时尝试降级为 `switchTab` 来完成跳转
  * [feat] 封装的 `redirectTo` 调用失败时尝试降级为 `switchTab` 来完成跳转
  * [feat] 封装原生的 `switchTab` 方法, 调用失败时尝试降级为 `redirectTo` 来完成跳转

* v0.0.2 2018-12-19

  * 添加方法 `hasAuth` 判断用户是否有授权过某些权限
  * 添加方法 `getHttpResponseHeaderValue` 获取 HTTP 返回结果中的 header 值

* v0.0.1 2018-12-12

  * 初始版本