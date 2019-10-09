const protoLoader = require('@grpc/proto-loader');
const grpcLibrary = require('@grpc/grpc-js');

let protoFileName = "./proto/ai/ai.proto"
let options = { keepCase: true }
protoLoader.load(protoFileName, options).then(packageDefinition => {
    const packageObject = grpcLibrary.loadPackageDefinition(packageDefinition);
    console.log("packageDefinition", packageDefinition)
});
module.exports = {}