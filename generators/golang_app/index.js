var Generator = require('../../copy_generator');
var inquirer = require('inquirer');
const fs = require('fs');
const cp = require('child_process');
const path = require('path');
const _ = require('lodash');

module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);

        // Next, add your custom code
        this.option('babel'); // This method adds support for a `--babel` flag
    }

    async initializing() {
        // gather all the protos, and select one for generate service
        this.protos = fs.readdirSync(this.destinationPath("./proto"))
        this.protos = this.protos.filter(p => !fs.statSync(this.destinationPath(`./proto/${p}`)).isFile())
    }
    async prompting() {
        this.answers = await this.prompt([
            {
                type: "input",
                name: "projectName",
                message: "(Go)Your Project name",
                default: this.options["projectName"] || path.basename(path.resolve("../")) // Default to parent folder name
            },
            {
                type: "input",
                name: "serviceName",
                message: "(Go)Your micro Golang service name",
                default: (this.options["name"] ? (this.options["name"] + "_service") : null) || this.appname // Default to current folder name
            },
            {
                type: "list",
                name: "proto",
                message: "Select for your service definition a proto file",
                choices: this.protos.map(proto => { return { name: `${proto}.proto`, value: proto } })
            },
            {
                type: "input",
                name: "version",
                message: "(Go)Your micro Golang service version",
                default: "0.0.1"
            },
            {
                type: "confirm",
                name: "cool",
                message: "Would you like to enable the Cool feature?"
            }
        ]);
        this.answers.projectName = _.snakeCase(this.answers["projectName"]);
        this.answers.serviceName = _.snakeCase(this.answers["serviceName"]);
        let repoUrl = await this.prompt([
            {
                type: 'input',
                name: 'repoUrl',
                message: 'What is your repository URL?',
                default: `github.com/${this.answers["projectName"]}/${this.answers["serviceName"]}.git`
            }
        ])
        this.answers.repoUrl = repoUrl["repoUrl"].replace(/^https:\/\//, '').toLowerCase();
    }
    async configuring() { }
    async default() { }
    async writing() {
        this.log("app serviceName", this.answers.serviceName);
        this.log("app repoUrl", this.answers.repoUrl);
        this.log("cool feature", this.answers.cool);
        let dirs = {}
        dirs.configsDir = 'config';
        dirs.brokerDir = 'broker';
        dirs.clientsDir = 'clients';
        dirs.deploymentDir = 'deployment';
        dirs.servicesDir = 'handler';
        dirs.dbDir = 'db';
        dirs.modelsDir = 'models';

        var rootFiles = ['.gitignore', '.dockerignore', 'Dockerfile', 'LICENSE']
        var rootTemplate = ['Makefile', 'README.md', '_main.go', '_go.mod', 'update_proto.sh']
        var configObj = {
            appName: this.answers.projectName,
            serviceName: this.answers.serviceName,
            repoUrl: this.answers.repoUrl,
            version: this.answers.version,
            protos: this.protos,
            proto: this.answers.proto
        }
        await this._copyEveryFile("./", dirs, configObj)
        await this._copyRootFile(rootFiles, rootTemplate, configObj)
    }
    async conflicts() { }
    async install() { }
    async end() {
        // add exicute right to the bash file
        cp.exec(`chmod 755 ${path.join("./", this.options["name"] ? this.answers.serviceName + "/" + 'update_proto.sh' : 'update_proto.sh')}`)
    }
};
