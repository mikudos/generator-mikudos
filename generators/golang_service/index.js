var Generator = require('yeoman-generator');
var inquirer = require('inquirer');

module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);

        // Next, add your custom code
        this.option('babel'); // This method adds support for a `--babel` flag
    }

    async initializing() {
        return this.log("Generate Golang serivce method is currently not suported!")
    }
    async prompting() {
        // this.answers = await this.prompt([
        //     {
        //         type: "input",
        //         name: "methodName",
        //         message: "Your Golang service method name",
        //         default: this.appname // Default to current folder name
        //     },
        //     {
        //         type: "confirm",
        //         name: "cool",
        //         message: "Would you like to enable the Cool feature?"
        //     }
        // ]);
    }
    async configuring() { }
    async default() { }
    async writing() {
        // this.log("app name", this.answers.name);
        // this.log("cool feature", this.answers.cool);
    }
    async conflicts() { }
    async install() { }
    async end() { }
};
