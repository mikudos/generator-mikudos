import { Application } from 'mikudos-node-app';

import SayHello from './say_hello.class';
import hooks from './say_hello.hooks';

export default function(app: Application) {
    app.use(
        'SayHello',
        ...hooks.before,
        new SayHello().SayHello,
        ...hooks.after
    );
}
