import { Server as HttpServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import config from '../config';

const configureSocketIO = (httpServer: HttpServer) => {
    const io = new SocketIOServer(httpServer, {
        cors: {
            origin: config.FRONTEND_URL,
            allowedHeaders: ["Content-Type", "x-fingerprint-id"],
            credentials: true,
        }
    });
    return io;
};

export default configureSocketIO;
