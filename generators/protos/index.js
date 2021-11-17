const Generator = require('../../lib');
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
    _method1() {
        this.log(this.options, this.destinationPath(this.options["name"] + "/proto/" + "users"));
    }

    async _srvProto(srvName, protoName = "proto") {
        let serviceProtoPath = this.options["name"] ? `${this.options["name"]}/proto/${srvName}` : `proto/${srvName}`;
        mkdir.sync(this.destinationPath(serviceProtoPath));
        this.fs.copyTpl(
            this.templatePath(`_${protoName}.proto`),
            path.join(`${serviceProtoPath}/${srvName}.proto`),
            this.configObj
        )
    }

    async initializing() {
    }
    async prompting() {
        let protos = [], proto;
        if (!this.options["name"]) {
            let conf = await this.prompt([
                {
                    type: "input",
                    name: "name",
                    message: "Your protos project name:",
                    default: this.appname // Default to current folder name
                },
                {
                    type: "checkbox",
                    name: "services",
                    message: "Please select available service protos",
                    choices: ['schedule', 'event_aggregate', 'messages']
                }
            ])
            protos = _.uniq(_.concat(protos, conf["services"]));
        }
        do {
            proto = await this.prompt([
                {
                    type: "input",
                    name: "protoName",
                    message: "Add proto for micro_service with name:",
                    default: "" // Default to current folder name
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
            for (const proto of this.answers.protos) {
                this.configObj = {
                    appName: this.answers.projectName,
                    proto: _.snakeCase(proto),
                    protoCamel: _.camelCase(proto),
                    protoCamelCapitalize: _.camelCase(proto).replace(/^[a-z]/g, (L) => L.toUpperCase()),
                }
                await this._srvProto(proto)
            }
        }
        if (this.options["withSchedule"]) {
            await this._srvProto("schedule", "schedule")
        }
        if (this.options["withEvAgg"]) {
            await this._srvProto("event_aggregate", "event_aggregate")
        }
        if (this.options["withMessage"]) {
            await this._srvProto("messages", "messages")
        }
    }
    async configuring() { }
    async default() { }
    async writing() {
        this.log("confirm:", JSON.stringify(this.answers.protos))
        await this._copyEveryFile("./", { proto: 'proto' }, this.configObj)
    }
    async conflicts() { }
    async install() { }
    async end() {
    }
};
