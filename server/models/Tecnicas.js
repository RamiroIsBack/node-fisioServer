var mongoose = require("mongoose");

var tecnicasSchema = mongoose.Schema({
  tecnicas: [
    {
      nombre: {
        type: String
      },
      servicioNombre: {
        type: String
      },
      texto: {
        type: String
      },
      urlPic: {
        type: String
      }
    }
  ]
});
var Tecnicas = mongoose.model("Tecnicas", tecnicasSchema);
module.exports = { Tecnicas };
