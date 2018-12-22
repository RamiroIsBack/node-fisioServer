var mongoose = require("mongoose");

var formacionSchema = mongoose.Schema({
  estudios: {
    type: "String"
  },
  centroFormativo: {
    type: "String"
  },
  centroUrlPic: {
    type: "String"
  },
  centroUrl: {
    type: "String"
  },
  fecha: {
    type: "String"
  }
});

var Formacion = mongoose.model("Formacion", formacionSchema);
module.exports = { Formacion };
