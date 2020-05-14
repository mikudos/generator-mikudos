import { Application, JSON_RPC_HANDLER } from 'mikudos-socketio-app';
import rpc_1 from './rpc-1';

export default function(app: Application) {
    app.json_rpc_services = new JSON_RPC_HANDLER(
        { rpc_1: rpc_1(app) },
        { eventPath: app.get('eventPath.json_rpc_services') }
    );
}
