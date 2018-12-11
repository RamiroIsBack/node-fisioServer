var mongoose = require("mongoose");

var InstalacionesSchema = mongoose.Schema({
  instalacionesTextoLargo: {
    type: String
  },
  instalacionesTextoCorto: {
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
var Instalaciones = mongoose.model("Instalaciones", InstalacionesSchema);
module.exports = { Instalaciones };
