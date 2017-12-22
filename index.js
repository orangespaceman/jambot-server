var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.use(express.static("public"));

io.on("connection", function(socket) {
  socket.on("play", function(msg) {
    io.emit("play", msg);
  });
  socket.on("say", function(msg) {
    io.emit("say", msg);
  });
});

http.listen(7006);
