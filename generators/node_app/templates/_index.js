const path = require('path')
const Mali = require('mali')

const PROTO_PATH = path.resolve(__dirname, './proto/users/users.proto')

const config = require('config');
const middleware = require('./middleware')
const mongoose = require('./mongoose');
const models = require('./models');
const broker = require('./broker');
const grpc_clients = require('./grpc_clients');
const services = require('./services')

function main() {
    const app = new Mali(PROTO_PATH)
    app.config = config;
    app.configure = function (middle) {
        middle(app)
    }
    app.configure(mongoose)
    app.configure(models)
    app.configure(broker)
    app.configure(grpc_clients)
    app.configure(middleware)
    app.configure(services)
    app.start(`0.0.0.0:${config.get('port')}`)
    console.log(`app is started at Port: ${app.ports}`)
}

main()