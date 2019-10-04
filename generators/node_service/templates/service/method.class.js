/* eslint-disable no-unused-vars */
exports.SayHello = class SayHello {
    constructor(options) {
        this.options = options || {};
    }

    async enter(ctx) {
        ctx.res = { message: 'Hello '.concat(ctx.req.name) }
        await ctx.broker.send({
            topic: 'test-topic',
            messages: [
                { value: 'Hello '.concat(ctx.req.name) },
            ],
        })
    }
};