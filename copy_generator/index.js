const Generator = require('yeoman-generator');
const fs = require('fs');
const path = require('path');
const mkdir = require('mkdirp');

module.exports = class extends Generator {
    async _copyEveryFile(parentPath, dirs, configObj) {
        for (const key in dirs) {
            if (dirs.hasOwnProperty(key)) {
                let element = dirs[key];
                let eleWithName;
                if (this.options["name"]) eleWithName = this.answers.serviceName + "/" + element;
                mkdir.sync(this.destinationPath(eleWithName || element));
                let files = fs.readdirSync(this.templatePath(element))
                let childDirs = [];
                for (let index = 0; index < files.length; index++) {
                    const f = files[index];
                    let fPath = this.templatePath(`${element}/${f}`)
                    if (fs.statSync(fPath).isFile()) {
                        let fName = f.replace(/^_/, "")
                        this.fs.copyTpl(
                            this.templatePath(`${element}/${f}`),
                            path.join("./", `${eleWithName || element}/${fName}`),
                            configObj
                        )
                    } else {
                        childDirs.push(`${element}/${f}`)
                    }
                }
                await this._copyEveryFile("./", childDirs, configObj)
            }
        }
    }

    async _copyRootFile(rootFiles, rootTemplate, configObj) {
        for (let index = 0; index < rootFiles.length; index++) {
            let fname = rootFiles[index];
            this.fs.copy(
                this.templatePath(fname),
                path.join("./", this.options["name"] ? this.answers.serviceName + "/" + fname : fname)
            )
        }
        for (let index = 0; index < rootTemplate.length; index++) {
            let fname = rootTemplate[index];
            let fName = fname.replace(/^_/, "")
            if (this.options["name"]) {
                fName = this.answers.serviceName + "/" + fName;
            }
            this.fs.copyTpl(
                this.templatePath(fname),
                path.join("./", fName),
                configObj
            )
        }
    }
}