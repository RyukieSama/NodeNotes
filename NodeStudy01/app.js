/**
 * Created by RyukieW on 2018/2/24.
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

const app = new Koa();

// demo 001
// //对于任何请求, app将调用异步函数处理请求
// app.use(async(ctx,next) => {
//     await next();
//     ctx.response.type = 'text/html';
//     ctx.response.body = '<h1>HelloRyukieSama!</h1>';
// });
//
// app.use(async(ctx,next) => {
//     console.log('end');
// });

//demo 002
app.use(async(ctx,next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url} ...`);
    await next();
});

router.get(`/`,async(ctx,next) => {
    ctx.response.body = `<h1>Index<h1>`;
});

router.get(`/hello/:name`,async(ctx,next) => {
    var name = ctx.params.name;
    // ctx.response.type = 'text/html';
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
});

// Demo 003 post
router.get('/home', async (ctx, next) => {
    ctx.response.body = `<h1>Index</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
});

router.post('/signin', async (ctx, next) => {
    var name = ctx.request.body.name || '',
    password = ctx.request.body.password || '';
console.log(`signin with name: ${name}, password: ${password}`);
if (name === 'koa' && password === '12345') {
    ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
} else {
    ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/home">Try again</a></p>`;
}
});


// add router middleware:
// 由于middleware的顺序很重要，这个koa-bodyparser必须在router之前被注册到app对象上。
app.use(bodyParser());
app.use(router.routes());

//监听端口
app.listen(3000);
console.log('app started at port 3000...');