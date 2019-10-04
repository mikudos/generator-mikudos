const { Method } = require('./method.class')
const hooks = require('./method.hooks')

const MethodName = "FindUserList"

module.exports = function (app) {
    app.use(MethodName, ...hooks.before, new Method().enter, ...hooks.after)
};