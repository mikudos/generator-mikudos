import { Application } from 'mikudos-socketio-app';
import usersClient from './users_service_client';
// Don't remove this comment. It's needed to format import lines nicely.

class clientsClass {
    UserClient: any;
    constructor() {}
}

export default function(app: Application) {
    let interClients = new clientsClass();
    app.set('interClients', interClients);
    app.configure(usersClient);
}
