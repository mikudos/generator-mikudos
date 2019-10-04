
module.exports = {
    before: [
        async function (ctx, next) {
            // TransactionManager.beginTransaction(hook, skipPath)
            await next()
        }
    ],
    after: [
        async function (ctx, next) {
            // TransactionManager.commitTransaction
            await next()
        }
    ]
}