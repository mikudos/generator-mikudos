const j = require('jscodeshift');

// Adding a method to all Identifiers
j.registerMethods({
    logNames: function () {
        return this.forEach(function (path) {
            console.log(path.node.name);
        });
    }
}, j.Identifier);

// Adding a method to all collections
j.registerMethods({
    findIdentifiers: function () {
        return this.find(j.Identifier);
    },
    insertLastInFunction(code) {
        let fe = this.find(j.FunctionExpression)
        let es = this.find(j.ExpressionStatement)
        fe.find(j.BlockStatement).forEach(node => {
            const { body } = node.value;
            const es = j(code).find(j.ExpressionStatement).get().value;
            body.push(es);
        });
        // es.forEach(function (path) {
        //     console.log(path.node);
        // });
        // console.log("FunctionExpression:", this.find(j.FunctionExpression));
        // console.log("ExpressionStatement:", this.find(j.ExpressionStatement));
        return this;
    }
});

module.exports = j;