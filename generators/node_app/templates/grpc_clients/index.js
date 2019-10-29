const greeterClient = require('./greeter.client');

module.exports = function (app) {
    app.context.grpcClients = {}
    greeterClient(app);
}