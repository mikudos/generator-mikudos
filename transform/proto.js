const protoLoader = require('@grpc/proto-loader');
const grpcLibrary = require('@grpc/grpc-js');
const _ = require('lodash');

// let protoFileName = "./proto/rbac/rbac.proto"
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
                this.methodsList.push(Object.keys(item.service).map(name => {
                    let type = _.at(item.service[name], ['requestStream', 'responseStream'])
                    return { name, type: type[0] && type[1] ? 'duplex' : (type[0] ? 'requestStream' : (type[1] ? 'responseStream' : 'unary')) }
                }));
            }
        }
        return this;
    }
}

module.exports = {
    ProtoInfo
}