var Generator = require('yeoman-generator');
var inquirer = require('inquirer');
const yosay = require('yosay');
const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const mkdir = require('mkdirp');
const cp = require('child_process');

const SpecialParams = ["project", "protos", "deployment", "schedule", "message"]
const ParamEnum = ["app", "service"]
const genName = "mikudos:"

module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);

        // Next, add your custom code
        this.option('babel'); // This method adds support for a `--babel` flag

        this.argument("name", { type: String, required: false })
        let all = _.concat(SpecialParams, ParamEnum)
        this.log(`params surport value in ${all} as params`)
        this.options.name = this.options.name || "app"
        if (all.indexOf(this.options.name) == -1) {
            this.log(`params Error, only surport value in ${all} as params`)
        }
    }
    method1() {
        this.log('method 1 just ran');
    }

    async _genNormal(genName) {
        this.answers = await this.prompt([
            {
                type: "list",
                name: "lang",
                message: "Select your programming language",
                choices: [
                    {
                        name: "Node.js",
                        value: 1
                    },
                    {
                        name: "Node.js with Typescript",
                        value: 2
                    },
                    {
                        name: "Golang",
                        value: 3
                    },
                    {
                        name: "Python3.7",
                        value: 4,
                        short: "python"
                    },
                    {
                        name: "Ruby",
                        value: 5
                    },
                    {
                        name: "Java",
                        value: 6
                    },
                    {
                        name: "c++",
                        value: 7
                    },
                    {
                        name: "c#",
                        value: 8
                    }
                ]
            }
        ]);
        switch (this.answers["lang"]) {
            case 1:
                genName += "node"
                break;
            case 2:
                genName += "ts"
                break;
            case 3:
                genName += "golang"
                break;
            case 4:
                genName += "python"
                break;
            case 5:
                genName += "ruby"
                break;
            case 6:
                genName += "java"
                break;
            case 7:
                genName += "cpp"
                break;
            case 8:
                genName += "cs"
                break;
        }
        return genName;
    }

    async _createProjectProtos() {
        this.answers = await this.prompt([
            {
                type: "input",
                name: "projectName",
                message: "Your Project name",
                default: this.appname // Default to current folder name
            }
        ]);
        this.answers.projectName = this.answers["projectName"].replace(/[A-Z]/, word => `_${word.toLowerCase()}`).replace(/\s+/g, '_').toLowerCase();
        mkdir.sync(this.destinationPath(this.answers.projectName + "_protos"));
        let genName = "mikudos:";
        await this.composeWith(`${genName}protos`, { name: this.answers.projectName + "_protos", folder: this.answers.projectName + "/" + this.answers.projectName + "_protos", withSchedule: this.confirm["schedule"], withEvAgg: this.confirm["eventAggregate"], withMessage: this.confirm["message"] });
    }

    async _configureProtos() {
        // get all the protos project list
        let directories = fs.readdirSync(this.destinationPath(this.answers.projectName + "_protos/proto"))
        // create subproject folder
        for (const proto of directories) {
            if (fs.statSync(this.destinationPath(this.answers.projectName + "_protos/proto/" + proto)).isFile()) continue;
            mkdir.sync(this.destinationPath(`${this.answers.projectName}_${proto}_service/proto`));
        }
    }

    async _syncProtoFiles() {
        // get all the protos project list
        let directories = fs.readdirSync(this.destinationPath(this.answers.projectName + "_protos/proto"))
        if (this.confirm['schedule']) {
            directories.push('schedule')
        }
        // copy proto files
        let command = ""
        for (const proto of directories) {
            command += `cp -r ${this.destinationPath(this.answers.projectName + "_protos")}/proto/* ${this.destinationPath(`${this.answers.projectName}_${proto}_service`)}/proto | `
        }
        command = command.replace(/ \| $/, "")
        cp.exec(command)
    }

    async initializing() {
        this.log(yosay('Welcome to the MIKUDOS Project Generator!'));
        if (this.options.name == 'project') {
            this.confirm = await this.prompt([
                {
                    type: "confirm",
                    name: "schedule",
                    message: `Do you want to generate a schedule service within your project?`
                },
                {
                    type: "confirm",
                    name: "eventAggregate",
                    message: `Do you want to generate a event aggregate service within your project?`
                },
                {
                    type: "confirm",
                    name: "message",
                    message: `Do you want to generate a message service with socketIO connection within your project?`
                }
            ])
        }
    }
    async prompting() {
        if (this.options.name == 'project') {
            await this._createProjectProtos()
        } else if (SpecialParams.includes(this.options.name)) {
            this.composeWith(`${genName}${this.options.name}`, { projectName: this.appname, name: `${this.appname}_${this.options.name}`, folder: `${this.appname}/${this.appname}_${this.options.name}` });
        } else {
            genName = await this._genNormal(genName)
            this.composeWith(`${genName}_${this.options.name}`, { projectName: this.appname, name: `${this.appname}_${this.options.name}`, folder: `${this.appname}/${this.appname}_${this.options.name}` });
        }

    }
    async configuring() {

    }
    async default() { }
    async writing() {
        if (SpecialParams.includes(this.options.name)) return
        this.log("language type", this.answers.lang);
    }
    async conflicts() { }
    async install() {
        if (this.options.name == "project") {
            await this._syncProtoFiles() // copy all proto files to all services
        }
    }
    async end() {
        if (this.options.name == "project") {
            await this._configureProtos()
            if (this.confirm['schedule']) {
                this.composeWith(`${genName}schedule`, { projectName: this.appname, name: this.appname + "_schedule", folder: `${this.appname}/${this.appname}_schedule` });
            }
            if (this.confirm['eventAggregate']) {
                this.composeWith(`${genName}eventAggregate`, { projectName: this.appname, name: this.appname + "_event_aggregate", folder: `${this.appname}/${this.appname}_event_aggregate` });
            }
            if (this.confirm['message']) {
                this.composeWith(`${genName}message`, { projectName: this.appname, name: this.appname + "_message", folder: `${this.appname}/${this.appname}_message` });
            }
        }
    }
};
