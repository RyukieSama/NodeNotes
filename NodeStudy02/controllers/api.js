/**
 * Created by RyukieW on 2018/2/28.
 */

const APIError = require('../rest').APIError;

var products = [{
    name: 'iPhone8',
    price: 5288
}, {
    name: 'iPhoneX',
    price: 9288
}];

module.exports = {
    'GET /api/products' : async(ctx,next) => {

        ctx.rest({
            iPhone : products
        });

    },

    'POST /api/products' : async(ctx,next) => {
        var p = {
            name : ctx.request.body.name,
            price : ctx.request.body.price
        };

        if (p.price < 4000) {
            throw new APIError('product:priceError', 'priceError');
        } else {
            products.push(p);

            ctx.rest(p);

            console.log(p);
        }

    }
}