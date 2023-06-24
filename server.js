//
const express = require("express");
const path = require("path");

const app = express();
const server = require("http").createServer(app);//creation du serveur

const io = require("socket.io")(server);

app.use(express.static(path.join(__dirname+"/public")));//le dossier au quel l'execution du serveur sera faite

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

//le port sur le quel ce serveur est executé
server.listen(5000, () => {
    console.log('écouté au port :5000');
  });