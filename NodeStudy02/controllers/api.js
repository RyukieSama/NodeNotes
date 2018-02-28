/**
 * Created by RyukieW on 2018/2/28.
 */

var products = [{
    name: 'iPhone8',
    price: 5288
}, {
    name: 'iPhoneX',
    price: 9288
}];

module.exports = {
    'GET /api/products' : async(ctx,next) => {
        //设置Content-type
        ctx.response.type = 'application/json';
        //设置Body
        ctx.response.body = {
            iPhone : products
        };
    },

    'POST /api/products' : async(ctx,next) => {
        var p = {
            name : ctx.request.body.name,
            price : ctx.request.body.price
        };
        products.push(p);

        ctx.response.type = 'application/json';
        ctx.response.body = p;

        console.log(p);
    }
}