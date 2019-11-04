import { Application } from 'mikudos-node-app';

import SayHi from './say_hi.func';
import hooks from './say_hi.hooks';

export default function(app: Application) {
    app.use('SayHi', ...hooks.before, SayHi, ...hooks.after);
}
