var Generator = require('../../copy_generator');
var inquirer = require('inquirer');
const { ProtoInfo } = require('../../transform/proto');
const fs = require('fs');
const path = require('path');
const mkdir = require('mkdirp');
const _ = require('lodash');

module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);
        this.argument("name");
    }

    async initializing() {
        this.proto = this.options['name'] || this.options['proto'];
        this.protoInfo = await new ProtoInfo(`./proto/${this.proto}/${this.proto}.proto`).init();
        if (this.options['client']) {
            // gather all the protos
            this.protos = fs.readdirSync(this.destinationPath("./proto"))
            this.protos.splice(this.protos.indexOf(this.proto), 1)
            console.log("protos:", this.protos);
        }
    }

    async prompting() {
        let confirm = await this.prompt({
            type: "confirm",
            name: "confirm",
            message: "Do you want to generate implementation for all Services?"
        })
        this.answers = {}
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
        if (this.options['client']) {
            let clientList = await this.prompt([
                {
                    type: "checkbox",
                    name: "clientList",
                    message: "Select the service Name that you want to generate for:",
                    choices: this.protos.map((name) => { return { name, value: index } })
                }
            ])
            this.answers['clientList'] = clientList['clientList'];
        }
    }
    async configuring() { }
    async default() { }
    async writing() {
        for (const key in this.answers['serviceList']) {
            const element = this.answers['serviceList'][key];
            let serviceName = this.protoInfo.serviceList[element];
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
                            methods: this.protoInfo.methodsList[element]
                        }
                    )
                }
            }
        }

        this.fs.copyTpl(
            this.templatePath(`index.ts`),
            this.destinationPath(`./src/services/index.ts`),
            {
                serviceNames: this.answers['serviceList'].map(element => {
                    return {
                        camelCase: this.protoInfo.serviceList[element],
                        snakeCase: _.snakeCase(this.protoInfo.serviceList[element])
                    }
                })
            }
        )
    }
    async conflicts() { }
    async install() { }
    async end() { }
}