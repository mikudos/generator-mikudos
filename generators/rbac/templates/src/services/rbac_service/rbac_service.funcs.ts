import ServiceClass from './rbac_service.class';
const service = new ServiceClass();


export async function VerifyAccessRightWithRids(ctx: any) {
    await service['VerifyAccessRightWithRids'](ctx);
}

export async function VerifyAccessRightWithGids(ctx: any) {
    await service['VerifyAccessRightWithGids'](ctx);
}

