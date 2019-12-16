import { Application, Service } from 'mikudos-node-app';
import HandlerClass from './rbac_service.class';
import methodMap from './rbac_service.map';
import hooks from './rbac_service.hooks';

export default function(app: Application) {
    let handler = new HandlerClass({}, app);
    const service = new Service(handler, methodMap, 'RbacService');
    app.register(service.name, service, hooks);
}
