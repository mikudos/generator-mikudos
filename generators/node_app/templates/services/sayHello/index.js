const { SayHello } = require('./sayHello.class')
const hooks = require('./sayHello.hooks')

module.exports = function (app) {
    app.use('sayHello', ...hooks.before, new SayHello().enter, ...hooks.after)
};