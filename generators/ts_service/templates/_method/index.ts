import { Application } from 'mikudos-node-app';

import * as Funcs from './_method.funcs';
import hooks from './_method.hooks';

export default function(app: Application) {
    app.use(
        'service',
        'Method',
        ...hooks.before,
        Funcs['Method'],
        ...hooks.after
    );
}
