var mongoose = require("mongoose");

var ServiciosSchema = mongoose.Schema({
  servicios: [
    {
      nombre: {
        type: String
      },
      precio: {
        type: Number
      },
      duracion: {
        type: Number
      },
      bono: {
        modalidad: {
          type: String
        },
        numero: {
          type: Number
        },
        precio: {
          type: Number
        }
      },
      urlPic: {
        type: String
      },
      textoLargo: {
        type: String
      },
      tecnicas: ["Tecnica"]
    }
  ]
});
var Servicios = mongoose.model("Servicios", ServiciosSchema);
module.exports = { Servicios };
