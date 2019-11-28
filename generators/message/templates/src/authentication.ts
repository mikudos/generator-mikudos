import { Application, Authentication } from 'mikudos-socketio-app';

export default function(app: Application) {
    app.authentication = new Authentication({
        ...app.get('authentication.request')
    });
}
