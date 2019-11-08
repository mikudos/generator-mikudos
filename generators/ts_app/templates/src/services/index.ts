import { Application } from 'mikudos-node-app';
import method from './_method';

export default function(app: Application): void {
    app.configure(method);
}
