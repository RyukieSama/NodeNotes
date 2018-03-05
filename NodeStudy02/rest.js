/**
 * Created by RyukieW on 2018/3/5.
 */

module.exports = {
    restify : (pathPrefix) => {
        pathPrefix = pathPrefix || '/api/';

        return async (ctx,next) => {
            if (ctx.request.path.startsWith(pathPrefix)) {
                ctx.rest = (data) => {
                    ctx.response.type = 'application/json';
                    ctx.response.body = data;
                }
                await next();
            } else {
                await next();
            }
        };
    }
};