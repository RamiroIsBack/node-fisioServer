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
      bonos: {
        bono: {
          modalidad: {
            type: String
          },
          dias: {
            type: String
          },
          precio: {
            type: Number
          }
        },
        bonoSecundario: {
          modalidad: {
            type: String
          },
          dias: {
            type: String
          },
          precio: {
            type: Number
          }
        }
      },
      urlPic: {
        type: String
      },
      urlIcono: {
        type: String
      },
      servicioTextoLargo: {
        type: String
      },
      tecnicas: [
        {
          tecnicaNombre: {
            type: String
          }
        }
      ]
    }
  ]
});
var Servicios = mongoose.model("Servicios", ServiciosSchema);
module.exports = { Servicios };
