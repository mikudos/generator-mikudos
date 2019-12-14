const { Application } = require('mikudos-node-app');
const path = require('path');
const mongoose = require('./mongoose');
const middleware = require('./middleware');
const models = require('./models');
const grpc_clients = require('./grpc_clients');
const services = require('./services');

const PROTO_PATH = path.resolve(
    __dirname,
    '../proto/helloworld/helloworld.proto'
);

const app = new Application(PROTO_PATH);
app.configure(mongoose);
app.configure(models);
// app.configure(broker)
app.configure(grpc_clients);
app.configure(middleware);
app.configure(services);

module.exports = app;
