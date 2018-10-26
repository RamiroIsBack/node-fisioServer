var socket = io();
socket.on("connect", function() {
  console.log("connected to server");

  socket.emit("createMessage", {
    from: "dracul",
    text: `I'm gonna drink your blood! you bitch!`
  });
});
socket.on("disconnect", function() {
  console.log("disconected from server");
});
socket.on("newMessage", function(message) {
  console.log("newMessage", message);
});
