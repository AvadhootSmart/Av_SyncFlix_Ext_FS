const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: "http://localhost:5173",
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

    socket.on("disconnect", (socket) => {
        console.log(`${socket.id} disconnected`);
    });
});

server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
