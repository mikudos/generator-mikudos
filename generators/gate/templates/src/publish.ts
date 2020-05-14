import { Application } from 'mikudos-socketio-app';

async function publishFilter(
    app: Application,
    io: SocketIO.Namespace
): Promise<string[]> {
    // this.io.to('authenticated').emit('rpc-call event', response);
    console.log('sockets', io.sockets.sockets);
    console.log(
        'authenticated sockets',
        io.in('authenticated').sockets.sockets
    );
    let res = await new Promise((resolve, reject) => {
        io.in('authenticated').clients((error: any, clients: any) => {
            if (error) reject(error);
            console.log(clients); // => [Anw2LatarvGVVXEIAAAD]
            resolve((clients as any[]).filter(client => client));
        });
    });
    return res as string[];
}

export default function(app: Application) {
    app.publishFilter = publishFilter;
}
