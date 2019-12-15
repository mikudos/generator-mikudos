/* eslint-disable no-unused-vars */
exports.<%=className%> = class <%=className%> {
    constructor(options = {}, app) {
        this.options = options;
        this.app = app;
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