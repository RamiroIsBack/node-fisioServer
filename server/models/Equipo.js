var mongoose = require("mongoose");

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
