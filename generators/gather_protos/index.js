var Generator = require('yeoman-generator');
const fs = require('fs');
const _ = require('lodash');

module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);
        this.option("protoList", { type: Array, required: false })
    }

    async initializing() {
        // list all proto names
        if (!this.options["protoList"]) {
            this.protos = fs.readdirSync(this.destinationPath("./proto"))
            this.protos = this.protos.filter(p => !fs.statSync(this.destinationPath(`./proto/${p}`)).isFile())
            this.log("the following proto list will be include to be scanning: \n", this.protos.join("\n"))
        }
    }
    async prompting() { }
    async configuring() {
        // scanning all protos
        
    }
    async default() { }
    async writing() { }
    async conflicts() { }
    async install() { }
    async end() { }
};
