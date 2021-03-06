const Generator = require('../../lib');
const { ProtoInfo } = require('../../lib/proto');
const fs = require('fs');
const mkdir = require('mkdirp');
const _ = require('lodash');

module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);
    }

    async initializing() {
        this.proto = this.options['name'] || this.options['proto'];
        if (this.proto) {
            this.protoInfo = await new ProtoInfo(`./proto/${this.proto}/${this.proto}.proto`).init();
        }
        if (this.options['client']) {
            // gather all the protos
            this.protos = fs.readdirSync(this.destinationPath(`./${this.options["name"] ? this.options["name"] + "_service/" : ""}proto`))
            this.protos = this.protos.filter(p => !fs.statSync(this.destinationPath(`./proto/${p}`)).isFile())
            if (this.protos.includes(this.proto)) {
                this.protos.splice(this.protos.indexOf(this.proto), 1)
            }
        }
    }

    async prompting() {
        this.answers = {}
        if (this.proto) {
            // prepare for generate serive files
            let confirm = await this.prompt({
                type: "confirm",
                name: "confirm",
                message: "Do you want to generate implementation for all Services?"
            })
            if (confirm.confirm) {
                this.answers['serviceList'] = this.protoInfo.serviceList.map((name, index) => index)
            } else {
                this.answers = await this.prompt([
                    {
                        type: "checkbox",
                        name: "serviceList",
                        message: "Select the service Name that you want to generate for:",
                        choices: this.protoInfo.serviceList.map((name, index) => { return { name, value: index } })
                    }
                ])
            }
        }
        if (this.options['client']) {
            let clientList = await this.prompt([
                {
                    type: "checkbox",
                    name: "clientList",
                    message: "Select the proto folder for the Clients that you want to generate for:",
                    choices: this.protos.map((name, index) => { return { name, value: index } })
                }
            ])
            this.answers['clientList'] = clientList['clientList'];
        }
        if (!this.options['clientFolder']) {
            let folder = await this.prompt({
                type: "input",
                name: "folder",
                message: "Please write the folder name which located in src folder, and under that you want to generate your client implementation files.",
                default: this.options['clientFolder'] || "grpc_clients"
            })
            this.options['clientFolder'] = folder.folder;
        }
    }
    async configuring() { }
    async default() { }
    async writing() {
        if (this.proto) {
            // generate files for implementation all methods for each service
            for (const key in this.answers['serviceList']) {
                const serviceIndex = this.answers['serviceList'][key];
                let serviceName = this.protoInfo.serviceList[serviceIndex];
                mkdir.sync(this.destinationPath(`./src/services/${_.snakeCase(serviceName)}`));
                let files = fs.readdirSync(this.templatePath('_method'));
                for (let index = 0; index < files.length; index++) {
                    const f = files[index];
                    let fPath = this.templatePath(`_method/${f}`)
                    if (fs.statSync(fPath).isFile()) {
                        let fName = f.replace(/^_method/, _.snakeCase(serviceName))
                        this.fs.copyTpl(
                            this.templatePath(`_method/${f}`),
                            this.destinationPath(`./src/services/${_.snakeCase(serviceName)}/${fName}`),
                            {
                                serviceName,
                                serviceNameSnake: _.snakeCase(serviceName),
                                methods: this.protoInfo.methodsList[serviceIndex],
                                serviceObj: this.protoInfo.packageObject[this.protoInfo.packageName][serviceName]
                            }
                        )
                    }
                }
            }
            // handle the service configure
            this.fs.copyTpl(
                this.templatePath(`index.ts`),
                this.destinationPath(`./src/services/index.ts`),
                {
                    serviceNames: this.answers['serviceList'].map(serviceIndex => {
                        return {
                            camelCase: this.protoInfo.serviceList[serviceIndex],
                            snakeCase: _.snakeCase(this.protoInfo.serviceList[serviceIndex])
                        }
                    })
                }
            )
        }

        if (this.options['client']) {
            // generate all client implementation
            for (const key in this.answers['clientList']) {
                let tempProto = this.protos[this.answers['clientList'][key]];
                let tempProtoInfo = await new ProtoInfo(`./proto/${tempProto}/${tempProto}.proto`).init();
                this.fs.copyTpl(
                    this.templatePath(`grpc_clients/_impl.client.ts`),
                    this.destinationPath(`./src/${this.options['clientFolder']}/${_.snakeCase(tempProtoInfo.packageName)}.client.ts`),
                    {
                        proto: tempProto,
                        protoCamel: _.camelCase(tempProto),
                        serviceNames: tempProtoInfo.serviceList,
                        serviceNamesSnake: tempProtoInfo.serviceList.map(name => _.snakeCase(name)),
                        methods: tempProtoInfo.methodsList
                    }
                )
            }
            // handle the clients configure
            this.fs.copyTpl(
                this.templatePath(`grpc_clients/index.ts`),
                this.destinationPath(`./src/${this.options['clientFolder']}/index.ts`),
                {
                    protos: this.answers['clientList'].map(index => this.protos[index]),
                    protosCamel: this.answers['clientList'].map(index => _.camelCase(this.protos[index]))
                }
            )
        }
    }
    async conflicts() { }
    async install() { }
    async end() { }
}