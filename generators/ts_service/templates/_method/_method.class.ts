<% if (methods.some(md=>md.type!=='unary')) { %>import highland from "highland";<%}%>

export default class {
    options: any;
    constructor(options?: any) {
        this.options = options || {};
    }
<% methods.forEach(function(item){ %>
    async <%=item.name%>(ctx: any) {
        const app = ctx.app;
<% if (item.type=="unary") { %>
        ctx.res = { message: 'Hello '.concat(ctx.req.name) };
<% } else if (item.type=="responseStream") { %>
        ctx.res = highland([{message: "Hello!"}]);
        ctx.res.end();
<% } else if (item.type=="requestStream") { %>
        ctx.res = await new Promise((resolve, reject) => {
            let st = highland(ctx.req)
            st
              .tap(message => {
                // do something to message or reject Error
                if (message.right) {
                    return message;
                } else {
                    return reject(new Error);
                }
              })
              .toCallback((err, result) => {
                if (err) return reject(err)
                resolve({ succeeded, failed })
              })
        })
<% } else if (item.type=="duplex") { %>
        ctx.req.on('data', d => ctx.res.write({ message: d.message.toUpperCase() }))
        ctx.req.on('end', () => ctx.res.end())
<% } %>
    }
<% }); %>
}
