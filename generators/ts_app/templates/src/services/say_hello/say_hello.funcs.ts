import ServiceClass from './say_hello.class';
const service = new ServiceClass();

export async function SayHello(ctx: any) {
    await service['SayHello'](ctx);
}
