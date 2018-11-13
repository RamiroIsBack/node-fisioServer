var mongoose = require("mongoose");

var PingSchema = mongoose.Schema({
  nombre: {
    type: String
  },
  utility: {
    type: String
  }
});
var Ping = mongoose.model("Ping", PingSchema);
module.exports = { Ping };
