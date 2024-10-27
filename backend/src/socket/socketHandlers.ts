import { Server, Socket } from 'socket.io';
import { PrismaClient } from '@prisma/client';
import * as socketEvents from './socketEvents';

const prisma = new PrismaClient();

const initializeSocketHandlers = (io: Server) => {
    io.on("connection", (socket: Socket) => {
        console.log("Client connected:", socket.id);

        socket.on(socketEvents.EDITOR_JOIN_PROJECT, async ({ project_id, username }) => {
            socket.join(project_id);

            // Insert user in the project_live_users table
            // await prisma.project_live_users.upsert({
            //     where: { project_id_username: { project_id, username } },
            //     update: {},
            //     create: { project_id, username }
            // });

            // Notify others in the project
            io.to(project_id).emit(socketEvents.EDITOR_LIVE_USER_JOINED, { username });
            console.log("User joined project:", project_id);

            // File Explorer: Insert Node
            socket.on(socketEvents.FILE_EXPLORER_INSERT_NODE, async ({ new_node_parent_id, name, is_folder }) => {
                // const newNode = await prisma.file_tree.create({
                //     data: {
                //         project_id,
                //         parent_id: new_node_parent_id,
                //         name,
                //         is_folder,
                //         file_tree_id: is_folder ? undefined : generateFileTreeId() // generateFileTreeId() should be defined
                //     }
                // });

                // io.to(project_id).emit(socketEvents.FILE_EXPLORER_INSERT_NODE, newNode);
            });

            // Handle code changes
            socket.on(socketEvents.CODE_EDITOR_SEND_CHANGE, (data) => {
                socket.broadcast.to(project_id).emit(socketEvents.CODE_EDITOR_RECEIVE_CHANGE, data);
            });

            // User leaves project
            // socket.on("disconnect", async () => {
            //     await prisma.project_live_users.delete({
            //         where: { project_id_username: { project_id, username } }
            //     });

            //     socket.broadcast.to(project_id).emit(socketEvents.USER_REMOVE_ACTIVE_LIVE_USER, { username });
            //     console.log("Client disconnected:", socket.id);
            // });
        });
    });
};

export default initializeSocketHandlers;