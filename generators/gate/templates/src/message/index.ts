import { Application, CHAT_HANDLER } from 'mikudos-socketio-app';
import messageHooks from './message.hooks';

export default function(app: Application) {
    app.chat_services = new CHAT_HANDLER(app, {}, messageHooks);
}
