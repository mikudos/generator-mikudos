var Generator = require('../../copy_generator');
var inquirer = require('inquirer');
const { ProtoInfo } = require('../../transform/proto');
const fs = require('fs');
const cp = require('child_process');
const path = require('path');

module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);

        // Next, add your custom code
        this.option('babel'); // This method adds support for a `--babel` flag
    }

    async initializing() {
        // gather all the protos, and select one for generate service
        this.proto = this.options['proto'];
        this.protoInfo = await new ProtoInfo(`./proto/${this.proto}/${this.proto}.proto`).init();
        console.log(this.protoInfo);
    }
}