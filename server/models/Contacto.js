var mongoose = require("mongoose");

var ContactoSchema = mongoose.Schema({
  contactoTextoLargo: {
    type: String
  },
  contactoTextoCorto: {
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
var Contacto = mongoose.model("Contacto", ContactoSchema);
module.exports = { Contacto };
