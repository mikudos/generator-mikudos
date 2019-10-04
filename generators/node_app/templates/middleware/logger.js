function logger(format) {
    format = format || ':name [:type]'

    return async function (ctx, next) {
        const str = format
            .replace(':name', ctx.name)
            .replace(':type', ctx.type)

        console.log(str)

        await next()
    }
}
module.exports = logger;