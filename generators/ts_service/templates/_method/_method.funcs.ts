import ServiceClass from './_method.class';
const service = new ServiceClass();

export async function SayHello(ctx: any) {
    await service['SayHello'](ctx);
}
