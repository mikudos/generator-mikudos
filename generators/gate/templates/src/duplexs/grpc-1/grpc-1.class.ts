import { EventEmitter } from 'events';

/**
 * all duplex call method must fill ... method
 */
export default class DuplexHandleClass {
    test(eventName: string, data: any, socketEvent: EventEmitter) {
        setInterval(() => {
            socketEvent.emit(eventName, data);
        }, 1000);
        // client send
        socketEvent.on(`${eventName} send`, send => {
            // send to the call
        });
        // client cancel
        socketEvent.once(`${eventName} cancel`, cancel => {
            // cancel
            // return something to client
            socketEvent.emit(`${eventName} cancel`, {
                result: { success: true }
            });
        });
        // server end
        socketEvent.emit(eventName, { method: eventName, end: true });
        socketEvent.removeAllListeners(`${eventName}`);
        // call canceled from server
        if (true) {
            socketEvent.emit(eventName, { method: eventName, cancel: true });
            socketEvent.removeAllListeners(`${eventName}`);
        }
    }
}
