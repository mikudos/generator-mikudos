const path = require('path')
const caller = require('grpc-caller')

module.exports = function (app) {
    const file = path.resolve(__dirname, '../proto/greeter/greeter.proto')
    const load = {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    }
    app.context.grpcClients.greeterClient = caller('mikudos_greeter_service:50051', { file, load }, 'GreeterService')
};