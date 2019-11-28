import { Application } from 'mikudos-node-app';

import * as Funcs from './grpc_service.funcs';
import hooks from './grpc_service.hooks';

export default function(app: Application) {
    app.use(
        'GrpcService',
        'UpdateGrpcMethods',
        ...hooks.before,
        Funcs['UpdateGrpcMethods'],
        ...hooks.after
    );
    app.use(
        'GrpcService',
        'ListGrpcServer',
        ...hooks.before,
        Funcs['ListGrpcServer'],
        ...hooks.after
    );
    app.use(
        'GrpcService',
        'ListServicesWithFullPath',
        ...hooks.before,
        Funcs['ListServicesWithFullPath'],
        ...hooks.after
    );
    app.use(
        'GrpcService',
        'ListMethodsWithFullPath',
        ...hooks.before,
        Funcs['ListMethodsWithFullPath'],
        ...hooks.after
    );
    app.use(
        'GrpcService',
        'GetServiceListOnServer',
        ...hooks.before,
        Funcs['GetServiceListOnServer'],
        ...hooks.after
    );
    app.use(
        'GrpcService',
        'getMethodsListInService',
        ...hooks.before,
        Funcs['getMethodsListInService'],
        ...hooks.after
    );
}
