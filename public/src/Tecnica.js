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

var seleccionarPersona = function() {
  var trabajadores = [
    { nombre: "javi", id: "javi" },
    { nombre: "Nadia", id: "nadia" }
  ];
  var radioPersona = document.getElementById("radioPersona");
  trabajadores.map((persona, index) => {
    var label = document.createElement("label");
    var radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "persona";
    radio.id = persona.id;
    radio.value = persona.nombre;
    radio.required = "required";
    label.appendChild(radio);
    label.appendChild(document.createTextNode(persona.id));

    radioPersona.appendChild(label);
  });
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
