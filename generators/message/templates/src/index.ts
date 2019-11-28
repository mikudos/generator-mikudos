import http from 'http';
import socket from 'socket.io';
import { Application } from 'mikudos-socketio-app';
import rpcs from './rpcs';
import channel from './channel';
import authentication from './authentication';
import message from './message';
import duplexs from './duplexs';
import inter_service_clients from './inter_service_clients';

const server = http.createServer();
const io = socket(server);

const app = new Application(io);
app.configure(inter_service_clients);
app.configure(authentication);
app.configure(rpcs);
app.configure(channel);
app.configure(message);
app.configure(duplexs);

app.init();

server.listen(app.get('port'));
console.log('socket.io server started at port: ' + app.get('port'));
