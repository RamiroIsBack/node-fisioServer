var mongoose = require("mongoose");

var InicioSchema = mongoose.Schema({
  textoLargo: {
    type: String
  },
  textoCorto: {
    type: String
  },
  items: [
    {
      src: {
        type: String
      },
      caption: {
        type
      }
    }
  ]
});
var Instalaciones = mongoose.model("Inicio", InicioSchema);
module.exports = { Inicio };
