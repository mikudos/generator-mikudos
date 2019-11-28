export default class {
    async add(request: any, a: number, b: number) {
        return a + b;
    }

    async subtract(request: any, a: number, b: number) {
        return this.add(request, a, -b);
    }

    async multiply(request: any, a: number, b: number) {
        return a * b;
    }

    async getUser(request: any) {
        return request.user;
    }
}
