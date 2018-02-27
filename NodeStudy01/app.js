/**
 * Created by RyukieW on 2018/2/24.
 */

"use_strict";

//这里导入的是 class 所以用 大写
const Koa = require('koa');

const app = new Koa();

//对于任何请求, app将调用异步函数处理请求
app.use(async(ctx,next) => {
    await next();
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>HelloRyukieSama!</h1>';
});

app.use(async(ctx,next) => {
    console.log('end');
});


//监听端口
app.listen(3000);
console.log('app started at port 3000...');