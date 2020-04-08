import mongoose from 'mongoose';
import { Application } from 'mikudos-node-app';

export = function (app: Application) {
    mongoose.connect(app.get('mongodb'), {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });
    mongoose.Promise = global.Promise;
    app.set('mongooseClient', mongoose);
    app.context.models = {};
};
