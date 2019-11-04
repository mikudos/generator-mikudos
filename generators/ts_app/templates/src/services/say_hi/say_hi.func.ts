export default async function SayHi(ctx: any) {
    let app = ctx.app;
    ctx.response.res = { message: 'Hello '.concat(ctx.req.name) };
}
