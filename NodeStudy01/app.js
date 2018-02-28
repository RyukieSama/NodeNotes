/**
 * Created by RyukieW on 2018/2/28.
 */

"use_strict";

//这里导入的是 class 所以用 大写
const Koa = require('koa');
/**
 * require('koa-router')返回的是函数
 * 相当于
 * const fn_router = require('koa-router');
 const router = fn_router();
 * */
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
var fs = require('fs');

const controller = require('./controller');

const app = new Koa();



// addControllers(router);
app.use(controller());

// add router middleware:
// 由于middleware的顺序很重要，这个koa-bodyparser必须在router之前被注册到app对象上。
app.use(bodyParser());
app.use(router.routes());

//监听端口
app.listen(3000);
console.log('app started at port 3000...');