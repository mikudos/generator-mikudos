var Generator = require('yeoman-generator');
var inquirer = require('inquirer');

module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);
    }
    method1() {
        this.log('method 1 just ran');
    }

    method2() {
        this.log('method 2 just ran');
    }

    async initializing() { }
    async prompting() {
        this.answers = await this.prompt([]);
    }
    async configuring() { }
    async default() { }
    async writing() {

    }
    async conflicts() { }
    async install() { }
    async end() { }
};
