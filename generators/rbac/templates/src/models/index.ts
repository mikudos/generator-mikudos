import groups from './groups.model';
import methods from './methods.model';
import roleMethods from './role_methods.model';
import roles from './roles.model';
import { Application } from 'mikudos-node-app';

export = function(app: Application): void {
    app.context.models.methods = methods(app);
    app.context.models.roles = roles(app);
    app.context.models.groups = groups(app);
    app.context.models.roleMethods = roleMethods(app);
    app.context.models.roles.associate(app.context.models);
    app.context.models.roleMethods.associate(app.context.models);
};
