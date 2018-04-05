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

socket.emit("client");

socket.on("play", msg => log("play", msg));

socket.on("say", msg => log("say", msg));

socket.on("jambotConnected", jambotConnected => {
  updateState(jambotConnected);
  if (jambotConnected) {
    log("JamBot connected", "Hooray!");
  } else {
    log("JamBot disconnected", "Boo!");
  }
});

function updateState(jambotConnected) {
  var $value = $(".jambot-state-value");
  $value.fadeOut(function(){
    $value.text(jambotConnected ? 'online' : 'offline').fadeIn();
  });
}

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
