/**
 * Created by RyukieW on 2018/3/5.
 */

module.exports = {
    APIError : function (code,message) {
        this.code = code || 'internal:unknown_error';
        this.message = message || '';
    },


    restify : (pathPrefix) => {
        pathPrefix = pathPrefix || '/api/';

        return async (ctx,next) => {
            if (ctx.request.path.startsWith(pathPrefix)) {
                ctx.rest = (data) => {
                    ctx.response.type = 'application/json';
                    ctx.response.body = data;
                }

                try {
                    await next();
                } catch (err) {
                    console.log('Process API error...');
                    ctx.response.status = 400;
                    ctx.response.type = 'application/json';
                    ctx.response.body = {
                        code: err.code || 'internal:unknown_error',
                        message: err.message || ''
                    };
                }

            } else {
                await next();
            }
        };
    }
};