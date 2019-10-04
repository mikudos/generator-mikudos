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
        this.option("projectName", { type: String, required: false })
        this.option("folder", { type: String, required: false })
        this.option("name", { type: String, required: false })
        this.option("withSchedule", { type: Boolean })
        this.option("withEvAgg", { type: Boolean })
        this.option("withMessage", { type: Boolean })
    }
    method1() {
        this.log(this.options, this.destinationPath(this.options["name"] + "/proto/" + "users"));
    }

    async _srvProto(srvName) {
        mkdir.sync(this.destinationPath(`${this.options["name"]}/proto/${srvName}`));
        this.fs.copyTpl(
            this.templatePath(`_${srvName}.proto`),
            path.join(`${this.options["name"]}/proto/${srvName}/${srvName}.proto`),
            this.configObj
        )
    }

    async initializing() {
    }
    async prompting() {
        if (!this.options["name"]) {
            let conf = await this.prompt([
                {
                    type: "input",
                    name: "name",
                    message: "Add proto for micro_service with name:",
                    default: this.appname // Default to current folder name
                }
            ])
        }
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
                this.configObj = {
                    appName: this.answers.projectName,
                    proto: proto,
                    protoCapitalized: proto.replace(/( |^)[a-z]/g, (L) => L.toUpperCase()),
                    protoCapitalizedSingle: proto.replace(/( |$)s/, "").replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
                }
                mkdir.sync(this.destinationPath(`${this.options["name"]}/proto/${proto}`));
                this.fs.copyTpl(
                    this.templatePath("_proto.proto"),
                    path.join(`${this.options["name"]}/proto/${proto}/${proto}.proto`),
                    this.configObj
                )
            }
        }
        if (this.options["withSchedule"]) {
            await this._srvProto("schedule")
        }
        if (this.options["withEvAgg"]) {
            await this._srvProto("event_aggregate")
        }
        if (this.options["withMessage"]) {
            await this._srvProto("messages")
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
