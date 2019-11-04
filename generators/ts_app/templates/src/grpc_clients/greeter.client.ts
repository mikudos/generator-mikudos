import grpc_caller from 'grpc-caller';
import path from 'path';
import { Application } from 'mikudos-node-app';

export = function(app: Application): void {
    const file = path.resolve(__dirname, '../../proto/greeter/greeter.proto');
    const load = {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    };
    app.context.grpcClients.gameConfigClient = grpc_caller(
        'mikudos_greeter_service:50051',
        { file, load },
        'GreeterService'
    );
};
