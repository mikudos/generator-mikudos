import { Application } from 'mikudos-node-app';
<% protos.forEach(function(proto, index){ %>
import { <%=protosCamel[index]%>Client, Type as <%=protosCamel[index]%>Type } from './<%=proto%>.client';<% }); %>

interface GrpcClients {
    gameConfigClient: greeterType;
}

export = function(app: Application): void {
    app.context.grpcClients = {};
<% protosCamel.forEach(function(proto, index){ %>
    <%=protoCamel%>Client(app);<% }); %>
};
