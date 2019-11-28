import socket from 'socket.io';

export default [
    async (
        namespace: string,
        method: string,
        data: any,
        socket: socket.Socket
    ) => {}
];
