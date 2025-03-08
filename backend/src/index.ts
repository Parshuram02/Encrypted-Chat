import WebSocket, { WebSocketServer } from "ws";
import * as uuid from "uuid";

const uuidv4 = uuid.v4;
const wss = new WebSocketServer({ port: 8080 });

interface User {
    socket: WebSocket;
    room: string;
    name: string;
    id: string;
}

let allSockets: User[] = [];

wss.on("connection", (socket: WebSocket) => {
    socket.on("message", (message: string) => {
        const parsedMessage = JSON.parse(message as unknown as string);

        if (parsedMessage.type === "join") {
            const newUser: User = {
                socket,
                room: parsedMessage.payload.roomId,
                name: parsedMessage.payload.name,
                id: uuidv4(),
            };

            allSockets.push(newUser);

            // 🔔 Notify all users in the room
            allSockets
                .filter((x) => x.room === newUser.room)
                .forEach((x) =>
                    x.socket.send(
                        JSON.stringify({
                            type: "user-joined",
                            message: `${newUser.name} has joined the chat`,
                            userId: newUser.id,
                            userName: newUser.name
                        })
                    )
                );
        }

        if (parsedMessage.type === "chat") {
            const currentUser = allSockets.find((x) => x.socket === socket);

            if (currentUser) {
                allSockets
                    .filter((x) => x.room === currentUser.room)
                    .forEach((x) =>
                        x.socket.send(
                            JSON.stringify({
                                type: "chat",
                                message: parsedMessage.payload.message,
                                senderName: currentUser.name,
                                senderId: currentUser.id,
                            })
                        )
                    );
            }
        }
    });

    socket.on("close", () => {
        const disconnectedUser = allSockets.find((x) => x.socket === socket);

        if (disconnectedUser) {
            allSockets = allSockets.filter((x) => x.socket !== socket);

            // 🔔 Notify others that the user left
            allSockets
                .filter((x) => x.room === disconnectedUser.room)
                .forEach((x) =>
                    x.socket.send(
                        JSON.stringify({
                            type: "user-left",
                            message: `${disconnectedUser.name} has left the chat`,
                            userId: disconnectedUser.id,
                            userName: disconnectedUser.name
                        })
                    )
                );
        }
    });
});
