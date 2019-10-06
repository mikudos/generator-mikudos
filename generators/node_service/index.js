const Generator = require('yeoman-generator');
const inquirer = require('inquirer');
const transform = require('./transform');

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

    _transformCode(code) {
        const { kebabName, subfolder } = this.props;
        const ast = transform(code);
        const mainExpression = ast.find(j.FunctionExpression).closest(j.ExpressionStatement);
        const folder = subfolder.concat(kebabName).join('/');
        const camelName = _.camelCase(folder);
        const serviceRequire = `const ${camelName} = require('./${folder}/${kebabName}.service.js');`;
        const serviceCode = `app.configure(${camelName});`;

        if (mainExpression.length !== 1) {
            this.log
                .writeln()
                .conflict(`${this.libDirectory}/services/index.js seems to have more than one function declaration and we can not register the new service. Did you modify it?`)
                .info('You will need to add the next lines manually to the file')
                .info(serviceRequire)
                .info(serviceCode)
                .writeln();
        } else {
            // Add require('./service')
            mainExpression.insertBefore(serviceRequire);
            // Add app.configure(service) to service/index.js
            mainExpression.insertLastInFunction(serviceCode);
        }

        return ast.toSource();
    }

    async initializing() {
        // gather all the protos, and select one for generate service
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
    }
    async configuring() { }
    async default() { }
    async writing() {
        this.log("app name", this.answers.name);
        this.log("cool feature", this.answers.cool);
    }
    async conflicts() { }
    async install() { }
    async end() { }
};
