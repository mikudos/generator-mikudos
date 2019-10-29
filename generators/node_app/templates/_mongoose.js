const mongoose = require('mongoose');

module.exports = function (app) {
    mongoose.connect(app.config.get('mongodb'), { useUnifiedTopology: true, useNewUrlParser: true });
    mongoose.Promise = global.Promise;
    app.mongooseClient = mongoose;
    app.context.models = {};
}