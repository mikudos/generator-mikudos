var Generator = require('yeoman-generator');
var inquirer = require('inquirer');
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

    method2() {
        this.log('method 2 just ran');
    }

    async initializing() { }
    async prompting() {
        this.answers = await this.prompt([
            {
                type: "input",
                name: "projectName",
                message: "Your Golang project name",
                default: this.appname // Default to current folder name
            },
            {
                type: "input",
                name: "serviceName",
                message: "Your Golang micro service name",
                default: this.appname // Default to current folder name
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
        dirs.configsDir = this.destinationPath('configs');
        dirs.brokerDir = this.destinationPath('broker');
        dirs.clientsDir = this.destinationPath('clients');
        dirs.deploymentDir = this.destinationPath('deployment');
        dirs.servicesDir = this.destinationPath('handler');
        dirs.dbDir = this.destinationPath('db');
        dirs.modelsDir = this.destinationPath('models');
        for (const key in dirs) {
            if (dirs.hasOwnProperty(key)) {
                const element = dirs[key];
                mkdir.sync(element);
            }
        }
    }
    async conflicts() { }
    async install() { }
    async end() { }
};
