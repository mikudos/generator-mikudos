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

    method2() {
        this.log('method 2 just ran');
    }

    async initializing() { }
    async prompting() {
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
        await this.composeWith(`${genName}protos`, { name: this.answers.projectName + "_protos", folder: this.answers.projectName + "/" + this.answers.projectName + "_protos" });
    }
    async configuring() { }
    async default() { }
    async writing() {

    }
    async conflicts() { }
    async install() { }
    async end() {
    }
};
