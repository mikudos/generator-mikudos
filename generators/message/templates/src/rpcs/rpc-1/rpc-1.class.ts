export default class {
    async add(request: any, [a, b]: number[]) {
        return a + b;
    }

    async subtract(request: any, [a, b]: number[]) {
        return this.add(request, [a, -b]);
    }

    async multiply(request: any, [a, b]: number[]) {
        return a * b;
    }

    async getUser(request: any) {
        return request.user;
    }
}
