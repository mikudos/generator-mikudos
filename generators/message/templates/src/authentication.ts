import { Application, Authentication } from 'mikudos-socketio-app';

async function authJoinCallback(socket: SocketIO.Socket) {}

export default function(app: Application) {
    app.authentication = new Authentication(
        {
            ...app.get('authentication.request')
        },
        { authJoinCallback: authJoinCallback }
    );
}
