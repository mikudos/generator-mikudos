import { Application } from 'mikudos-node-app';
import sayHello from './say_hello';
import sayHi from './say_hi';

export default function(app: Application): void {
    app.configure(sayHello);
    app.configure(sayHi);
}
