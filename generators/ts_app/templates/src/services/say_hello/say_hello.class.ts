export default class SayHello {
    options: any;
    constructor(options?: any) {
        this.options = options || {};
    }
    async SayHello(ctx: any) {
        let app = ctx.app;
        ctx.response.res = { message: 'Hello '.concat(ctx.req.name) };
    }
}
