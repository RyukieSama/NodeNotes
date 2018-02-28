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
    'GET /api/products': async (ctx, next) => {
        // 设置Content-Type:
        ctx.response.type = 'application/json';
        // 设置Response Body:
        ctx.response.body = {
            products: products
        };
    }
}