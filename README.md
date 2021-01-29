# @domain.js/axios
基于 axios 库包封装的适合 @domain.js/domain 的网络请求库, 不改变 axios 原本的用法

[![Build status](https://travis-ci.com/domain-js/axios.svg?branch=master)](https://travis-ci.org/domain-js/axios)
[![codecov](https://codecov.io/gh/domain-js/axios/branch/master/graph/badge.svg)](https://codecov.io/gh/domain-js/axios)

# Installation
<pre>npm i @domain.js/axios --save</pre>

# cnf
<pre>专属配置 cnf.axios</pre>
|名称|类型|必填|默认值|描述|样例|
|----|----|----|------|----|----|
|loggers|Array&lt;string&gt;|否|[]|需要被处理自动记录日志的方法名列表|['post', 'get', 'put']|
|retrys|Array&lt;string&gt;|否|[]|需要在失败时自动重试的方法名列表|['post', 'get']|
|retryTimes|Integer|否|3|失败自动重试次数，针对retrys指定的方法|2|
|retryIntervalMS|Integer|否|10000|失败自动重试间隔的毫秒|2000|
|conf|Object|否|{}|参考 axios.create 的 config 配置| |
## 配置样例
```javascript
// @domain.js/axios 配置信息
axios: {
  loggers: ["post", "get", "put", "patch", "delete"],
  retry: ["post", "get"],
  retryTimes: 3,
  retryIntervalMS: 10 * 1000,
  conf: {
    // defines the max size of the http response content in bytes allowed
    maxContentLength: 100 * 1024 * 1024,
    // defines the max size of the http request content in bytes allowed
    maxBodyLength: 100 * 1024 * 1024
  }
}
```

# deps
| 模块名 | 别名 | 用到的方法 | 描述 |
| ------ | ---- | ---------- | ---- |
| utils | U | sleep | 在失败重试的时候等待 |
| logger | | logger | 在处理自动记录日志方法时候用到 |


# Usage
<pre>

// Usage is same with axios
const { data} = await axios.get(url)

// without log
const axios = axios.origin;
</pre>
