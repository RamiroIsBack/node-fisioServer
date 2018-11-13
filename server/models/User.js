var mongoose = require("mongoose");

var UserSchema = mongoose.Schema({
  nombre: {
    type: String
  },
  password: {
    type: String
  }
});
var User = mongoose.model("user", UserSchema);

module.exports = { User };
