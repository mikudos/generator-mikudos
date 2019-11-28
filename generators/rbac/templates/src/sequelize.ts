import { Sequelize } from 'sequelize';
// const { Sequelize } = require('sequelize');
import { Application } from 'mikudos-node-app';

export default function(app: Application) {
    const sequelize = new Sequelize(app.config.get('mysql'), {
        dialect: 'mysql',
        logging: false,
        define: {
            freezeTableName: true
        }
    });

    app.set('sequelizeClient', sequelize);
    app.context.models = {};
}
