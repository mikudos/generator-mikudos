export async function hook1(ctx: any, next: Function) {
    // TransactionManager.commitTransaction
    console.log('example service hook');
    await next();
}

export async function hook2(ctx: any, next: Function) {
    // TransactionManager.beginTransaction(hook, skipPath)
    console.log('example method hook');
    await next();
}
