export default {
    before: {
        all: [
            async function(ctx: any, next: Function) {
                // TransactionManager.beginTransaction(hook, skipPath)
                await next();
            }
        ]
    },
    after: {
        all: [
            async function(ctx: any, next: Function) {
                // TransactionManager.commitTransaction
                await next();
            }
        ]
    }
};
