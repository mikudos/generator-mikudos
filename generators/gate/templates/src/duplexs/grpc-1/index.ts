import Grpc1 from './grpc-1.class';
import hooks from './before.hooks';
import { Application, mikudos } from 'mikudos-socketio-app';
import { EventEmitter } from 'events';

class Service implements mikudos.DuplexService {
    constructor(
        public before: { [key: string]: mikudos.DuplexHandle[] } = {},
        public service: any
    ) {}
}

export default function(app: Application) {
    return new Service(hooks, new Grpc1());
}
