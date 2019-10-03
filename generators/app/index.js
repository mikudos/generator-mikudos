var Generator = require('yeoman-generator');
var inquirer = require('inquirer');

module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);

        // Next, add your custom code
        this.option('babel'); // This method adds support for a `--babel` flag

        this.option("name", { type: String, required: true });
        this.log("option", this.options.name);
    }
    method1() {
        this.log('method 1 just ran');
    }

    method2() {
        this.log('method 2 just ran');
    }

    async initializing() { }
    async prompting() {
        this.log('\n' +
            '+---------------------------------------------------+\n' +
            '| M I K U D O S | p r o j e c t | g e n e r a t o r |\n' +
            '+---------------------------------------------------+\n' +
            '\n');
        this.answers = await this.prompt([
            {
                type: "list",
                name: "lang",
                message: "Your project name",
                choices: [
                    {
                        name: "Node.js",
                        value: 1
                    },
                    {
                        name: "Golang",
                        value: 2
                    },
                    {
                        name: "Python3.7",
                        value: 3,
                        short: "python"
                    }
                ]
            },
            {
                type: "input",
                name: "name",
                message: "Your project name",
                default: this.appname // Default to current folder name
            },
            {
                type: "confirm",
                name: "cool",
                message: "Would you like to enable the Cool feature?"
            }
        ]);
    }
    async configuring() { }
    async default() { }
    async writing() {
        this.log("language type", this.answers.lang);
        this.log("app name", this.answers.name);
        this.log("cool feature", this.answers.cool);
    }
    async conflicts() { }
    async install() { }
    async end() { }
};
