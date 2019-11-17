import ServiceClass from './<%=serviceNameSnake%>.class';
const service = new ServiceClass();

<% methods.forEach(function(item){ %>
export async function <%=item.name%>(ctx: any) {
    await service['<%=item.name%>'](ctx);
}
<% }); %>
