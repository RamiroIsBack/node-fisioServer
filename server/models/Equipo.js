var mongoose = require("mongoose");
var Persona = require("./Persona");

var EquipoSchema = mongoose.Schema({
  equipoTextoLargo: {
    type: String
  },

  equipo: {
    type: ["Persona"]
  }
});
var Equipo = mongoose.model("Equipo", EquipoSchema);
module.exports = { Equipo };
