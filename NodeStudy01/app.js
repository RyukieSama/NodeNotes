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

const app = new Koa();

function  addControllers(router) {
    var files = fs.readdirSync(__dirname + '/controller');
    var js_files = files.filter((f) => {
            return f.endsWith('.js');
        });

    for (var f of js_files) {
        console.log(`process controller: ${f}...`);
        let mapping = require(__dirname + '/controller/' + f);
        addMapping(router,mapping);
    }
}

function addMapping(router,mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET')) {

            var path = url.substring(4);
            router.get(path,mapping[url]);
            console.log(`register URL mapping: GET ${path}`);

        } else if (url.startsWith('POST ')) {

            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);

        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
}

addControllers(router);

// add router middleware:
// 由于middleware的顺序很重要，这个koa-bodyparser必须在router之前被注册到app对象上。
app.use(bodyParser());
app.use(router.routes());

//监听端口
app.listen(3000);
console.log('app started at port 3000...');