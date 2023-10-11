const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require("cors");
app.use(cors());

const server = new http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log("user Connected successfully", socket.id);
    socket.on("hello", (response) => {
        console.log(response)
        socket.broadcast.emit("recieve-message", { message: response.message })
    })
})

server.listen(5000, () => {
    console.log("Server is running");
})