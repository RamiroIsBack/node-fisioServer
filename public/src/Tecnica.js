var socket = io();
socket.on("connect", function() {
  console.log("connected to server");
});
socket.on("disconnect", function() {
  console.log("disconected from server");
});
socket.on("newMessage", function(message) {
  console.log("newMessage", message);
});

var seleccionarTipo = function() {
  console.log("seleccionarTipo presssed bitch");
};
var seleccionarServicio = function() {
  console.log("seleccionarServicio presssed bitch");
};
var subirTecnica = event => {
  event.preventDefault();
  var nombre = document.getElementById("nombre").value;
  socket.emit(
    "createMessage",
    {
      from: nombre,
      text: `I'm gonna drink your blood! you bitch!`
    },
    function(dataFromServer) {
      console.log("got it", dataFromServer);
    }
  );
};
