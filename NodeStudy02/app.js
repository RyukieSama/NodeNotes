/**
 * Created by RyukieW on 2018/2/28.
 */

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('koa-router')();

const app = new Koa();
const controller = require('./contoller');
const rest = require('./rest');

const MongoClient = require('mongodb').MongoClient;
var mongoURL = "mongodb://localhost:27017/";

MongoClient.connect(mongoURL, function(err, db) {
    if (err) throw err;
    var dbo = db.db("NodeStudy02");
    var myobj = { name: "test", url: "www.google.com" };
    dbo.collection("site").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("文档插入成功");
        db.close();
    });
});

//一定要注意顺序
app.use(bodyParser());

app.use(rest.restify());

app.use(controller());

app.listen(3000);
console.log('app started at port 3000...');