export default class {
    options: any;
    constructor(options?: any) {
        this.options = options || {};
    }
<% methods.forEach(function(item){ %>
    async <%=item%>(ctx: any) {
        let app = ctx.app;
        ctx.response.res = { message: 'Hello '.concat(ctx.req.name) };
    }
<% }); %>
}
