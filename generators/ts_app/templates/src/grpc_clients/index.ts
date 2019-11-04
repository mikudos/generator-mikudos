import { Application } from 'mikudos-node-app';
import greeterClient from './greeter.client';

export = function(app: Application): void {
    app.context.grpcClients = {};
    greeterClient(app);
};
