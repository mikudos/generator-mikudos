var Generator = require('yeoman-generator');
var inquirer = require('inquirer');
const _ = require('lodash');

const SpecialParams = ["protos", "deployment", "schedule", "message"]
const ParamEnum = ["app", "service"]

module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);

        // Next, add your custom code
        this.option('babel'); // This method adds support for a `--babel` flag

        this.argument("name", { type: String, required: false })
        let all = _.concat(SpecialParams, ParamEnum)
        if (all.indexOf(this.options.name) == -1) {
            this.log(`params Error, only surport value in ${all} as params`)
        }
        this.options.name = this.options.name || "app"
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
                        name: "Golang",
                        value: 2
                    },
                    {
                        name: "Python3.7",
                        value: 3,
                        short: "python"
                    }
                ]
            }
        ]);
        switch (this.answers["lang"]) {
            case 1:
                genName += "node"
                break;
            case 2:
                genName += "golang"
                break;
            case 3:
                genName += "python"
                break;
        }
        return genName;
    }

    async initializing() { }
    async prompting() {
        let genName = "mikudos:"
        if (SpecialParams.includes(this.options.name)) {
            this.composeWith(`${genName}${this.options.name}`, { preprocessor: 'sass' });
        } else {
            genName = await this._genNormal(genName)
            this.composeWith(`${genName}_${this.options.name}`, { preprocessor: 'sass' });
        }
    }
    async configuring() { }
    async default() { }
    async writing() {
        if (SpecialParams.includes(this.options.name)) return
        this.log("language type", this.answers.lang);
    }
    async conflicts() { }
    async install() { }
    async end() { }
};
