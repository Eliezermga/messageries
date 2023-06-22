const express = require("express");
const path = require("path");

const app = express();
const server = require("http").createServer(app);//creation du serveur

const io = require("socket.io")(server);

app.use(express.static(path.join(__dirname+"/public")));

io.on("connection",function(socket){
    socket.on("newuser",function(username){
        socket.broadcast.emit("update", username +" a rejoint la conversation");
    });
    socket.on("exituser",function(username){
        socket.broadcast.emit("update", username +" a quitté la conversation");
    });
    socket.on("chat",function(message){
        socket.broadcast.emit("chat", message);
    });
});

server.listen(5000, () => {
    console.log('écouté au port :5000');
  });