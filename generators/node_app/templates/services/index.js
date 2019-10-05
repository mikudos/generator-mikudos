const method = require('./Method')

module.exports = function (app) {
    app.configure(method)
};