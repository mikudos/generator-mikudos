import { Application } from 'mikudos-node-app';

import * as Funcs from './say_hello.funcs';
import hooks from './say_hello.hooks';

export default function(app: Application) {
    app.use('SayHello', ...hooks.before, Funcs['SayHello'], ...hooks.after);
}
