const protoLoader = require('@grpc/proto-loader');
const grpcLibrary = require('@grpc/grpc-js');

let protoFileName = "./proto/ai/ai.proto"
let options = { keepCase: true }

class ProtoInfo {
    constructor(protoFileName) {
        protoLoader.load(protoFileName, options).then(packageDefinition => {
            this.packageObject = grpcLibrary.loadPackageDefinition(packageDefinition);
            this.packageName = Object.keys(packageDefinition)[0].split('.')[0];
            this.serviceName = Object.keys(packageDefinition)[0].split('.')[1];
            this.methodsList = Object.keys(packageDefinition[Object.keys(packageDefinition)[0]]);
            this.methods = packageDefinition[Object.keys(packageDefinition)[0]];
        });
    }

}

module.exports = {
    ProtoInfo
}