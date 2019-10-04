const logger = require('./logger');

module.exports = function (app) {
    app.use(logger())
};