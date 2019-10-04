var Generator = require('yeoman-generator');
var inquirer = require('inquirer');
const _ = require('lodash');
const path = require('path');
const mkdir = require('mkdirp');

module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);

        this.option("folder", { type: String, required: false })
        this.option("name", { type: String, required: false })
    }
    method1() {
        this.log(this.options, this.destinationPath(this.options["name"] + "/proto/" + "users"));
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
            for (const proto of this.answers.protos) {
                var configObj = {
                    appName: this.answers.projectName,
                    proto: proto,
                    protoCapitalized: proto.replace(/( |^)[a-z]/g, (L) => L.toUpperCase()),
                    protoCapitalizedSingle: proto.replace(/( |$)s/, "").replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
                }
                mkdir.sync(this.destinationPath(`${this.options["name"]}/proto/${proto}`));
                this.fs.copyTpl(
                    this.templatePath("_proto.proto"),
                    path.join(`${this.options["name"]}/proto/${proto}/${proto}.proto`),
                    configObj
                )
            }
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
