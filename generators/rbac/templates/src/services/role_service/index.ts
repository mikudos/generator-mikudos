import { Application, Service } from 'mikudos-node-app';
import HandlerClass from './role_service.class';
import methodMap from './role_service.map';
import hooks from './role_service.hooks';

export default function(app: Application) {
    let handler = new HandlerClass({}, app);
    const service = new Service(handler, methodMap, 'RoleService');
    app.register(service.name, service, hooks);
}
