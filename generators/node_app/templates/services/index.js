const sayHello = require('./sayHello')

module.exports = function (app) {
    app.configure(sayHello)
};