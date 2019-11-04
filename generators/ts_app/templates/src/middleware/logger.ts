function logger(format: string = ':name [:type]'): Function {
    return async function(ctx: any, next: any) {
        const str = format
            .replace(':name', ctx.name)
            .replace(':type', ctx.type);

        console.log(str);

        await next();
    };
}
export = logger;
