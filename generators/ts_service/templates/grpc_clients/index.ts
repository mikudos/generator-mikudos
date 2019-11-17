import { Application } from 'mikudos-node-app';
<% protos.forEach(function(proto, index){ %>
import <%=protosCamel[index]%>Client, { Client as <%=protosCamel[index]%>Type } from './<%=proto%>.client';<% }); %>

export = function(app: Application): void {
    app.context.grpcClients = {};
<% protosCamel.forEach(function(proto, index){ %>
    <%=proto%>Client(app);<% }); %>
};
