export default {
    before: [
        async function(ctx: any, next: Function) {
            // TransactionManager.beginTransaction(hook, skipPath)
            await next();
        }
    ],
    after: [
        async function(ctx: any, next: Function) {
            // TransactionManager.commitTransaction
            await next();
        }
    ]
};
