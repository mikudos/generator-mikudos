const Generator = require('yeoman-generator');
const fs = require('fs');
const inquirer = require('inquirer');
const path = require('path');
const mkdir = require('mkdirp');
const transform = require('../../transform');
const proto = require('../../transform/proto');

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

    async _copyFileInFolder(tplPath, desPath) {
        let tplDir = this.templatePath(tplPath)
        mkdir.sync(this.destinationPath(desPath));
        let files = fs.readdirSync(tplDir)
        let configObj = { className: this.answers.className, methodName: this.answers.name }
        for (const fname of files) {
            this.fs.copyTpl(
                this.templatePath(tplDir + "/", fname),
                this.destinationPath(desPath, fname),
                configObj
            )
        }
    }

    async _decodeProtoFile(servicejs) {
        let code = this.fs.read(servicejs).toString()
        const ast = await transform(code);
        const mainExpression = ast.find(transform.FunctionExpression).closest(transform.ExpressionStatement);
        const serviceRequire = `const ${this.answers.className} = require('./${this.answers.name}');`;
        // Add require('./service')
        mainExpression.insertBefore(serviceRequire);
        // Add app.configure(service) to service/index.js
        mainExpression.insertLastInFunction(`app.configure(${this.answers.className});`);
        return ast.toSource({ quote: 'single' });
    }

    async initializing() {
        // gather all the protos, and select one for generate service
        this.protos = fs.readdirSync(this.destinationPath("./proto"))
        this.protos = this.protos.filter(p => !fs.statSync(this.destinationPath(`./proto/${p}`)).isFile())
        // proto
    }
    async prompting() {
        this.answers = await this.prompt([
            {
                type: "input",
                name: "name",
                message: "Your GRPC method service name",
                default: this.appname // Default to current folder name
            },
            {
                type: "confirm",
                name: "cool",
                message: "Would you like to enable the Cool feature?"
            }
        ]);
        this.answers.className = this.answers["name"].replace(/^[a-z]/, word => `${word.toUpperCase()}`);
    }
    async configuring() {
        const servicejs = this.destinationPath('./services', 'index.js');
        let transformed = await this._decodeProtoFile(servicejs)
        this.conflicter.force = true;
        this.fs.write(servicejs, transformed);
        this.log("service injected success!");
    }
    async default() { }
    async writing() {
        await this._copyFileInFolder("./service", `./services/${this.answers.name}`)
        this.log("app name", this.answers.name);
        this.log("cool feature", this.answers.cool);
    }
    async conflicts() { }
    async install() { }
    async end() { }
};
