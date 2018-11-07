var mongoose = require("mongoose");
const Schema = mongoose.Schema;
var Instalaciones = mongoose.model("instalaciones", {
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
      alt: {
        type: String
      }
    }
  ]
});

module.exports = { Instalaciones };
