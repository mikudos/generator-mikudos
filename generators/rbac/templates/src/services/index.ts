import { Application } from 'mikudos-node-app';

import GrpcService from './grpc_service';
import RoleService from './role_service';
import GroupService from './group_service';
import RbacService from './rbac_service';

export default function(app: Application): void {
    app.configure(GrpcService);
    app.configure(RoleService);
    app.configure(GroupService);
    app.configure(RbacService);
}
