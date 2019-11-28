import ServiceClass from './grpc_service.class';
const service = new ServiceClass();

export async function UpdateGrpcMethods(ctx: any) {
    await service['UpdateGrpcMethods'](ctx);
}

export async function ListGrpcServer(ctx: any) {
    await service['ListGrpcServer'](ctx);
}

export async function ListServicesWithFullPath(ctx: any) {
    await service['ListServicesWithFullPath'](ctx);
}

export async function ListMethodsWithFullPath(ctx: any) {
    await service['ListMethodsWithFullPath'](ctx);
}

export async function GetServiceListOnServer(ctx: any) {
    await service['GetServiceListOnServer'](ctx);
}

export async function getMethodsListInService(ctx: any) {
    await service['getMethodsListInService'](ctx);
}
