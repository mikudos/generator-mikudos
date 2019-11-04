import logger from './logger';
import { Application } from 'mikudos-node-app';

export = function(app: Application) {
    app.use(logger());
};
