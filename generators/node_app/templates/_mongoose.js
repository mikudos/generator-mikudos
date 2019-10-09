const mongoose = require('mongoose');

module.exports = function (app) {
    mongoose.connect(app.config.get('mongodb'), { useNewUrlParser: true });
    mongoose.Promise = global.Promise;
    app.mongooseClient = mongoose;
    app.context.models = {};
}