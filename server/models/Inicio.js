var mongoose = require("mongoose");

var InicioSchema = mongoose.Schema({
  inicioTextoLargo: {
    type: String
  },
  inicioTextoCorto: {
    type: String
  },
  items: [
    {
      src: {
        type: String
      },
      caption: {
        type: String
      }
    }
  ]
});
var Inicio = mongoose.model("Inicio", InicioSchema);
module.exports = { Inicio };
