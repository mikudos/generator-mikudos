const Generator = require('../../lib');
const fs = require('fs');
const yaml = require('js-yaml');
const _ = require('lodash');
const { ProtoInfo } = require('../../transform/proto');

module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);
        this.option("protoList", { type: Array, required: false })
    }

    async initializing() {
        this.protoInfos = {}
        // list all proto names
        if (!this.options["protoList"]) {
            this.protos = fs.readdirSync(this.destinationPath("./proto"))
            this.protos = this.protos.filter(p => !fs.statSync(this.destinationPath(`./proto/${p}`)).isFile())
            this.log("the following proto list will be include to be scanning: \n", this.protos.join("\n"))
        }
    }
    async prompting() {
        let format = await this.prompt({
            type: "list",
            name: "format",
            message: "Select the format that you want to generate to:",
            choices: [{ name: "YAML" }, { name: "JSON" }]
        })
        this.format = format.format
    }
    async configuring() {
        // scanning all protos
        for (const proto of this.protos) {
            this.protoInfos[proto] = [];
            let tempProtoInfo = await new ProtoInfo(`./proto/${proto}/${proto}.proto`).init();
            for (const key in tempProtoInfo.methodsList) {
                let list = tempProtoInfo.methodsList[key];
                list = list.map(method => {
                    return { file: proto, package: tempProtoInfo.packageName, service: tempProtoInfo.serviceList[key], path: `${tempProtoInfo.packageName}.${tempProtoInfo.serviceList[key]}.${method.name}`, ...method }
                })
                this.protoInfos[proto] = _.concat(this.protoInfos[proto], list);
            }
        }
    }
    async default() { }
    async writing() {
        if (this.format === "YAML") {
            this.fs.write(this.destinationPath("./proto/proto_info.yml"), yaml.safeDump(this.protoInfos))
        } else if (this.format === "JSON") {
            this.fs.writeJSON(this.destinationPath("./proto/proto_info.json"), this.protoInfos)
        }
    }
    async conflicts() { }
    async install() { }
    async end() { }
};
