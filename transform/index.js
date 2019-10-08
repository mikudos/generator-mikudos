const jscodeshift = require('jscodeshift');

// Adding a method to all Identifiers
jscodeshift.registerMethods({
    logNames: function () {
        return this.forEach(function (path) {
            console.log(path.node.name);
        });
    }
}, jscodeshift.Identifier);

// Adding a method to all collections
jscodeshift.registerMethods({
    findIdentifiers: function () {
        return this.find(jscodeshift.Identifier);
    }
});

module.exports = jscodeshift;