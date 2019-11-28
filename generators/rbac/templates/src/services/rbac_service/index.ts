import { Application } from 'mikudos-node-app';

import * as Funcs from './rbac_service.funcs';
import hooks from './rbac_service.hooks';

export default function(app: Application) {
        app.use(
            'RbacService',
            'VerifyAccessRightWithRids',
            ...hooks.before,
            Funcs['VerifyAccessRightWithRids'],
            ...hooks.after
        );
        app.use(
            'RbacService',
            'VerifyAccessRightWithGids',
            ...hooks.before,
            Funcs['VerifyAccessRightWithGids'],
            ...hooks.after
        );
}
