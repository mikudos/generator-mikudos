import ServiceClass from './role_service.class';
const service = new ServiceClass();

export async function FindRole(ctx: any) {
    await service['FindRole'](ctx);
}

export async function GetOneRole(ctx: any) {
    await service['GetOneRole'](ctx);
}

export async function CreateRole(ctx: any) {
    await service['CreateRole'](ctx);
}

export async function UpdateRoleById(ctx: any) {
    await service['UpdateRoleById'](ctx);
}

export async function DeleteRole(ctx: any) {
    await service['DeleteRole'](ctx);
}

export async function DeleteRoleById(ctx: any) {
    await service['DeleteRoleById'](ctx);
}

export async function GetRoleAccessesById(ctx: any) {
    await service['GetRoleAccessesById'](ctx);
}

export async function AddAccessToRoleByRid(ctx: any) {
    await service['AddAccessToRoleByRid'](ctx);
}

export async function DelAccessToRoleByRid(ctx: any) {
    await service['DelAccessToRoleByRid'](ctx);
}
