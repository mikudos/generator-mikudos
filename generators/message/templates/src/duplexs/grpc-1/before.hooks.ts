import socket from 'socket.io';

export default {
    all: [async (eventName: string, data: any, socket: socket.Socket) => data]
};
