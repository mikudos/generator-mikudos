import grpc_caller from 'grpc-caller';
import path from 'path';
import { Application } from 'mikudos-node-app';
import { Client } from '@grpc/grpc-js';

<% serviceNames.forEach(function(item, index){ %>
interface <%=item%> {
    <% methods[index].forEach(function(mt, mi){ %>
    <%=mt%>: Function;<% }); %>
}
<% }); %>

export class Client {
<% serviceNames.forEach(function(sn){ %>
    <%=sn%>: <%=sn%>;<% }); %>
    constructor(file: string, load: object, serviceClients: any) {
<% serviceNames.forEach(function(sn){ %>
        this.<%=sn%> = grpc_caller(
            `${serviceClients.name}:${serviceClients.port}`,
            { file, load },
            '<%=sn%>'
        );
<% }); %>
    }
}

export default function (app: Application): void {
    let serviceClients = app.get('interServiceClients').<%=proto%>;
    const file = path.resolve(
        __dirname,
        '../../proto/<%=proto%>/<%=proto%>.proto'
    );
    const load = {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    };
    app.context.grpcClients.<%=protoCamel%>Client = new Client(file, load, serviceClients);
};
