import { Application, Service } from 'mikudos-node-app';
import HandlerClass from './<%=serviceNameSnake%>.class';

export default function(app: Application) {
    app.register(HandlerClass);
}
