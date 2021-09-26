const express = require("express");
const app = express();
const http = require("http");
const httpServer = http.createServer(app);
const { Server } = require('socket.io');
const wsServer = new Server(httpServer);

// express.static() : 정적 파일 제공
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (_, res) => {
    res.sendFile(__dirname + "/index.html");
});

wsServer.on("connect", (socket) => {
    console.log("A user is connected!!!");
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chat message', msg => {
        console.log('message: ' + msg);
        wsServer.emit('chat message', msg);
    });
});

httpServer.listen(3000, () => {
    console.log('The server is running on the PORT 3000');
});