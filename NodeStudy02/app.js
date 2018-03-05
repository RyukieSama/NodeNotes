/**
 * Created by RyukieW on 2018/2/28.
 */

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('koa-router')();

const app = new Koa();
const controller = require('./contoller');
const rest = require('./rest');

//一定要注意顺序
app.use(bodyParser());

app.use(rest.restify());

app.use(controller());

app.listen(3000);
console.log('app started at port 3000...');