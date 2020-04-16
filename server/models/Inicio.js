var mongoose = require("mongoose");

var InicioSchema = mongoose.Schema({
  anuncio: {
    type: Boolean,
  },
  anuncioTexto: {
    type: String,
  },
  inicioTextoLargo: {
    type: String,
  },
  inicioTextoCorto: {
    type: String,
  },
  items: [
    {
      src: {
        type: String,
      },

      nombre: {
        type: String,
      },
    },
  ],
});
var Inicio = mongoose.model("Inicio", InicioSchema);
module.exports = { Inicio };
