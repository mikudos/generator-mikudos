var Generator = require('yeoman-generator');
var inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const mkdir = require('mkdirp');

module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);

        // Next, add your custom code
        this.option('babel'); // This method adds support for a `--babel` flag
    }
    method1() {
        this.log('method 1 just ran');
    }

    async initializing() {
        // gather all the protos, and select one for generate service
        this.protos = fs.readdirSync(this.destinationPath("./proto"))
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
                default: this.options["name"] || this.appname // Default to current folder name
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
        this.answers.projectName = this.answers["projectName"].replace(/[A-Z]/, word => `_${word.toLowerCase()}`).replace(/\s+/g, '_').toLowerCase();
        this.answers.serviceName = this.answers["serviceName"].replace(/[A-Z]/, word => `_${word.toLowerCase()}`).replace(/\s+/g, '_').toLowerCase();
        let repoUrl = await this.prompt([
            {
                type: 'input',
                name: 'repoUrl',
                message: 'What is your repository URL?',
                default: `github.com/${this.answers["projectName"]}/${this.answers["serviceName"]}`
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
        var configObj = {
            appName: this.answers.projectName,
            serviceName: this.answers.serviceName,
            repoUrl: this.answers.repoUrl,
            version: this.answers.version,
            protos: this.protos,
            proto: this.answers.proto
        }
        for (const key in dirs) {
            if (dirs.hasOwnProperty(key)) {
                const element = dirs[key];
                mkdir.sync(this.destinationPath(element));
                let files = fs.readdirSync(this.templatePath(element))
                this.log("element:", this.templatePath(element))
                this.log("files:", files)
            }
        }
        var rootFiles = ['.gitignore', '.dockerignore', 'Dockerfile', 'LICENSE', 'update_proto.sh']
        var rootTemplate = ['Makefile', 'README.md', '_main.go', '_go.mod']
        for (let index = 0; index < rootFiles.length; index++) {
            let fname = rootFiles[index];
            this.fs.copy(
                this.templatePath(fname),
                path.join("./", this.options["name"] ? this.answers.serviceName + "/" + fname : fname)
            )
        }
        for (let index = 0; index < rootTemplate.length; index++) {
            let fname = rootTemplate[index];
            let fName = fname.replace(/^_/, "")
            if (this.options["name"]) {
                fName = this.answers.serviceName + "/" + fName;
            }
            this.fs.copyTpl(
                this.templatePath(fname),
                path.join("./", fName),
                configObj
            )
        }
    }
    async conflicts() { }
    async install() { }
    async end() {
        // add exicute right to the bash file
        fs.chmodSync(path.join("./", 'update_proto.sh'), 755)
    }
};
