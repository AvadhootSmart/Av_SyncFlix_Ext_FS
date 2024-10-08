const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const extensionOrigin = "chrome-extension://oplbcjoniaokaillcpfchabaeejdgppj";
const allowedOrigins = [extensionOrigin, "http://localhost:5173"];
const io = socketIO(server, {
    cors: {
        origin: allowedOrigins,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        credentials: true,
    },
});

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        credentials: true,
    }),
);

io.on("connection", (socket) => {
    console.log(`${socket.id} connected`);

    socket.on("set-username", (username) => {
        socket.username = username;
        console.log(`Username set to  : ${username} for socketID -> ${socket.id}`);
    });

    socket.on("create-room", (room) => {
        socket.join(room);
        console.log(
            `Room - ${room} created by ${socket.username ? socket.username : socket.id}`,
        );

        io.in(room)
            .allSockets()
            .then((sockets) => {
                const members = Array.from(sockets).map((socketId) => {
                    const memberSocket = io.sockets.sockets.get(socketId);
                    return memberSocket.username ? memberSocket.username : socketId;
                });
                console.log(`Members in room ${room}:`, members);
                io.to(room).emit("room-members", members);
            });

        io.emit("room-created", { room: room, id: socket.id });
    });

    socket.on("join-room", (room) => {
        socket.join(room);
        console.log(
            `User ${socket.username ? socket.username : socket.id} joined room - ${room}`,
        );
        io.emit("room-joined", { room: room, id: socket.id });

        socket
            .to(room)
            .emit(
                "user-joined",
                `${socket.username ? socket.username : socket.id} has joined the room`,
            );

        io.in(room)
            .allSockets()
            .then((sockets) => {
                const members = Array.from(sockets).map((socketId) => {
                    const memberSocket = io.sockets.sockets.get(socketId);
                    return memberSocket.username ? memberSocket.username : socketId;
                });
                console.log(`Members in room ${room}:`, members);
                io.to(room).emit("room-members", members);
            });
    });

    socket.on("disconnect", (socket) => {
        console.log(`${socket.id} disconnected`);
    });
});

server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
