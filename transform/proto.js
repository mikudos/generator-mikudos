const protoLoader = require('@grpc/proto-loader');
const grpcLibrary = require('@grpc/grpc-js');

let protoFileName = "./proto/ai/ai.proto"
let options = { keepCase: true }

class ProtoInfo {
    constructor(protoFileName) {
        this.protoFileName = protoFileName;
    }

    async init() {
        let packageDefinition = await protoLoader.load(this.protoFileName, options);
        this.packageObject = grpcLibrary.loadPackageDefinition(packageDefinition);
        this.packageName = Object.keys(packageDefinition)[0].split('.')[0];
        this.serviceList = [];
        this.methodsList = [];
        for (const i in this.packageObject[this.packageName]) {
            const item = this.packageObject[this.packageName][i];
            if (item.service) {
                this.serviceList.push(i);
                // console.log('item', item.service);
                this.methodsList.push(Object.keys(item.service));
            }
        }
        return this;
    }
}

module.exports = {
    ProtoInfo
}