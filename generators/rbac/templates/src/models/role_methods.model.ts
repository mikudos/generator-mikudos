// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes } from 'sequelize';
import { Application } from 'mikudos-node-app';

export default function(app: Application) {
    const sequelizeClient: Sequelize = app.get('sequelizeClient');
    const role_methods = sequelizeClient.define(
        'role_methods',
        {
            roleId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            value: {
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
    (role_methods as any).associate = function(models: any) {
        // Define associations here
        // See http://docs.sequelizejs.com/en/latest/docs/associations/
        (role_methods as any).belongsTo(models.roles);
    };
    role_methods.sync();

    return role_methods;
}
