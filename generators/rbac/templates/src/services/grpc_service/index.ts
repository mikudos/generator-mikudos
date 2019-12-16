import { Application, Service } from 'mikudos-node-app';
import HandlerClass from './grpc_service.class';
import methodMap from './grpc_service.map';
import hooks from './grpc_service.hooks';

export default function(app: Application) {
    let handler = new HandlerClass({}, app);
    const service = new Service(handler, methodMap, 'GrpcService');
    app.register(service.name, service, hooks);
}
