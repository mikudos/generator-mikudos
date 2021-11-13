const Generator = require('../../lib');

module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);
    }

    async initializing() {
        return this.log("Generate Deployment is currently not suported!")
    }
    async prompting() {
        // this.answers = await this.prompt([]);
    }
    async configuring() { }
    async default() { }
    async writing() {

    }
    async conflicts() { }
    async install() { }
    async end() { }
};
