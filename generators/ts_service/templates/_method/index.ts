import { Application, Service } from 'mikudos-node-app';
import HandlerClass from './<%=serviceNameSnake%>.class';
import methodMap from './<%=serviceNameSnake%>.map';
import hooks from './<%=serviceNameSnake%>.hooks';

export default function(app: Application) {
    let handler = new HandlerClass({}, app);
    const service = new Service(handler, methodMap, '<%=serviceName%>');
    app.register(service.name, service, hooks);
}
