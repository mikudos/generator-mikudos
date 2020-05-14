const Generator = require('../../lib');
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
        await this.gatherProtofiles();
    }
    async prompting() {
        this.answers = await this.prompt([
            {
                type: "input",
                name: "projectName",
                message: `(${this.options["name"] || this.appname})Your Nodejs project name`,
                default: this.options["projectName"] || path.basename(path.resolve("../")) // Default to current folder name
            },
            {
                type: "input",
                name: "serviceName",
                message: `(${this.options["name"] || this.appname})Your Nodejs micro service name`,
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
                message: `(${this.options["name"] || this.appname})Your service version`,
                default: "0.0.1"
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
        let dirs = {}
        dirs.configsDir = 'config';
        dirs.deploymentDir = 'deployment';
        dirs.srcDir = 'src';
        dirs.testDir = 'test';
        var rootFiles = ['.dockerignore', 'Dockerfile', 'LICENSE']
        var rootTemplate = ['Makefile', 'README.md', '_.gitignore', 'package.json', 'tsconfig.json', 'update_proto.sh']
        var configObj = {
            appName: this.answers.projectName,
            serviceName: this.answers.serviceName,
            repoUrl: this.answers.repoUrl,
            version: this.answers.version,
            serviceProtos: this.protos,
            proto: this.answers.proto
        }
        await this._copyEveryFile("./", dirs, configObj)
        await this._copyRootFile(rootFiles, rootTemplate, configObj)
    }
    async conflicts() { }
    async install() { }
    async end() {
        await this.addExecuteRight('update_proto');
        // generate methods files
        this.composeWith(`mikudos:ts_service`, { client: true, clientFolder: 'grpc_clients', proto: this.answers.proto });
    }
};
