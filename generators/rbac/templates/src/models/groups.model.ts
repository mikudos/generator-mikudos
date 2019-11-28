// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes } from 'sequelize';
import { Application } from 'mikudos-node-app';

export default function(app: Application) {
    const sequelizeClient: Sequelize = app.get('sequelizeClient');
    const groups = sequelizeClient.define(
        'groups',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            description: DataTypes.STRING,
            rids: {
                type: DataTypes.STRING
            },
            deletedAt: DataTypes.DATE
        },
        {
            hooks: {
                beforeCount(options: any) {
                    options.raw = true;
                }
            }
        }
    );

    // eslint-disable-next-line no-unused-vars
    (groups as any).associate = function(models: any) {
        // Define associations here
        // See http://docs.sequelizejs.com/en/latest/docs/associations/
    };
    groups.sync();

    return groups;
}
