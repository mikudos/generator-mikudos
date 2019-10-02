var Generator = require('yeoman-generator');
var inquirer = require('inquirer');
const _ = require('lodash');

module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);
    }
    method1() {
        this.log('method 1 just ran');
    }

    method2() {
        this.log('method 2 just ran');
    }

    async initializing() { }
    async prompting() {
        let protos = [], proto;
        do {
            proto = await this.prompt([
                {
                    type: "input",
                    name: "protoName",
                    message: "Add proto for micro_service with name:",
                    default: "users" // Default to current folder name
                }
            ]);
            if (proto["protoName"]) protos = _.uniq(_.concat(protos, proto["protoName"]))
        } while (proto["protoName"]);
        this.answers = await this.prompt([
            {
                type: "confirm",
                name: "confirm",
                message: `Do you want to generate all proto file for micro_service within ${JSON.stringify(protos)}`
            }
        ])
        if (this.answers.confirm) {
            this.answers.protos = protos
            this.log("confirm:", JSON.stringify(protos))
        }
    }
    async configuring() { }
    async default() { }
    async writing() {
        this.log("confirm:", JSON.stringify(this.answers.protos))
    }
    async conflicts() { }
    async install() { }
    async end() { }
};
