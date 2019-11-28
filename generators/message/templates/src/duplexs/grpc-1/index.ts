import Grpc1 from './grpc-1.class';
import hooks from './before.hooks';
import { Application } from 'mikudos-socketio-app';
import { EventEmitter } from 'events';

class Service {
    service: any;
    constructor(public before: Function[] = [], service: any) {
        this.service = service;
    }

    handle(
        namespace: string,
        method: string,
        data: any,
        socketEvent: EventEmitter
    ) {
        if (!this.service[method])
            return { error: { message: "method dosn't exist" } };
        this.service[method](`${namespace}.${method}`, data, socketEvent);
    }
}

export default function(app: Application) {
    return new Service(hooks, new Grpc1());
}
