var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

var jambotConnected = false;
var jambotSocket = null;

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.use(express.static("public"));

io.on("connection", function(socket) {
  socket.on("client", function() {
    socket.emit("jambotConnected", jambotConnected);
  });
  socket.on("jambot", function() {
    jambotConnected = true;
    jambotSocket = socket;
    socket.broadcast.emit("jambotConnected", jambotConnected);
  });
  socket.on("play", function(msg) {
    io.emit("play", msg);
  });
  socket.on("say", function(msg) {
    io.emit("say", msg);
  });
  socket.on("disconnect", function() {
    if (socket === jambotSocket) {
      jambotConnected = false;
      jambotSocket = null;
      socket.broadcast.emit("jambotConnected", jambotConnected);
    }
  });
});

http.listen(7006);
