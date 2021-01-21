# @domain.js/axios
基于 axios 库包封装的适合 @domain.js/domain 的网络请求库

[![Build status](https://travis-ci.com/domain-js/axios.svg?branch=master)](https://travis-ci.org/domain-js/axios)
[![codecov](https://codecov.io/gh/domain-js/axios/branch/master/graph/badge.svg)](https://codecov.io/gh/domain-js/axios)

# Installation
<pre>npm i @domain.js/axios --save</pre>

# cnf
|名称|类型|必填|默认值|描述|样例|
|----|----|----|------|----|----|
|loggers|Array<string>|否|[]|需要被处理自动记录日志的方法名列表|['post', 'get', 'put']|
|retrys|Array&lt;string&gt;|否|[]|需要在失败时自动重试的方法名列表|['post', 'get']|
|retryTimes|Integer|否|3|失败自动重试次数，针对retrys指定的方法|2|
|retryIntervalMS|Integer|否|10000|失败自动重试间隔的毫秒|2000|
|conf|Object|否|{}|参考 axios.create 的 config 配置| |

# deps
| 模块名 | 别名 | 用到的方法 |
| ------ | ---- | ---------- |
| utils | U | sleep |
| logger | | logger |


# Usage
<pre>

// Usage is same with axios
const { data} = await axios.get(url)

// without log
const axios = axios.origin;
</pre>
