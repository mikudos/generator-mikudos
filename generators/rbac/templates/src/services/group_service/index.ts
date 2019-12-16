import { concat, get } from 'lodash';
import { Application, Service } from 'mikudos-node-app';
import HandlerClass from './group_service.class';
import methodMap from './group_service.map';
import hooks from './group_service.hooks';

export = function(app: Application) {
    let handler = new HandlerClass({}, app);
    const service = new Service(handler, methodMap, 'GroupService');
    app.register(service.name, service, hooks);
};
