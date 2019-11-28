import ServiceClass from './group_service.class';
const service = new ServiceClass();

export async function FindGroup(ctx: any) {
    await service['FindGroup'](ctx);
}

export async function GetOneGroup(ctx: any) {
    await service['GetOneGroup'](ctx);
}

export async function CreateGroup(ctx: any) {
    await service['CreateGroup'](ctx);
}

export async function UpdateGroupById(ctx: any) {
    await service['UpdateGroupById'](ctx);
}

export async function DeleteGroup(ctx: any) {
    await service['DeleteGroup'](ctx);
}

export async function DeleteGroupById(ctx: any) {
    await service['DeleteGroupById'](ctx);
}

export async function GetGroupAccessesById(ctx: any) {
    await service['GetGroupAccessesById'](ctx);
}

export async function AddRoleIdsToGroupByGid(ctx: any) {
    await service['AddRoleIdsToGroupByGid'](ctx);
}

export async function DelRoleIdsToGroupByGid(ctx: any) {
    await service['DelRoleIdsToGroupByGid'](ctx);
}
