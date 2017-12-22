var socket = io();

$(".say").submit(e => {
  e.preventDefault();
  socket.emit("say", $("#m").val());
  $("#m").val("");
});

$(".play-link").click(e => {
  e.preventDefault();
  socket.emit("play", e.target.textContent);
});

socket.on("play", msg => log("play", msg));

socket.on("say", msg => log("say", msg));

function log(type, msg) {
  var date = new Date();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();

  if (minute < 10) {
    minute = "0" + minute;
  }

  if (second < 10) {
    second = "0" + second;
  }

  var text = `${hour}:${minute}:${second}: (${type}) '${msg}'`;
  $(".log").prepend($("<li>").text(text));
}
