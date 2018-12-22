var mongoose = require("mongoose");

var tecnicaSchema = mongoose.Schema({
  nombre: {
    type: "String"
  },
  servicio: {
    type: "String"
  }
});
var Tecnica = mongoose.model("Tecnica", tecnicaSchema);
module.exports = { Tecnica };
