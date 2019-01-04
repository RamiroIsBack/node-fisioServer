var mongoose = require("mongoose");

var ContactoSchema = mongoose.Schema({
  cookiesTextoLargo: {
    type: "String"
  },
  cookiesTextoCorto: {
    type: "String"
  },
  direccion: {
    urlLink: {
      type: "String"
    },
    nombre: {
      type: "String"
    },
    info: {
      type: "String"
    },
    detalles: {
      type: "String"
    }
  },
  telCopy: {
    urlLink: {
      type: "String"
    },
    urlPic: {
      type: "String"
    }
  },
  emailCopy: {
    urlLink: {
      type: "String"
    },
    urlPic: {
      type: "String"
    }
  },
  horario: {
    nombre: {
      type: "String"
    },
    info: {
      type: "String"
    }
  }
});
var Contacto = mongoose.model("Contacto", ContactoSchema);
module.exports = { Contacto };
