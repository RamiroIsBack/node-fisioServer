const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

const bcrypt = require("bcryptjs");

var UserSchema = new mongoose.Schema({
  nombre: {
    type: "string",
    required: true,
    trim: true,
    minlength: 1,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  email: {
    type: String
  },
  tokens: [
    {
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }
  ]
});

UserSchema.methods.toJSON = function() {
  //overwritting this method
  var user = this;
  var userObject = user.toObject();
  return _.pick(userObject, ["_id", "nombre"]);
};

UserSchema.methods.generateAuthToken = function() {
  //add a custom method using regular function to be able to use this
  var user = this;
  var access = "auth";
  var token = jwt
    .sign(
      { _id: user._id.toHexString(), access },
      process.env.JWT_SECRET || "abcd"
    )
    .toString();
  user.tokens = user.tokens.concat([{ access, token }]);
  return user.save().then(() => {
    return token;
  });
};
UserSchema.methods.removeToken = function(token) {
  var user = this;
  //pull operator from mongoose erase a object that have a property equal to the one we pass
  return user.update({
    $pull: {
      tokens: {
        token
      }
    }
  });
};

UserSchema.statics.findByToken = function(token) {
  //calling statics and using uppercase User cos it's model method and not instant method
  var User = this;
  var decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET || "abcd");
  } catch (e) {
    // return new Promise((resolve, reject) => {
    //   reject();
    // }); //we only want to send a reject se we simplify like this:
    return Promise.reject();
  }
  //use quotes when chaining with dots on the key values
  return User.findOne({
    _id: decoded._id,
    "tokens.token": token,
    "tokens.access": "auth"
  });
};
UserSchema.statics.findByCredentials = function({ nombre, password }) {
  var User = this;
  return User.findOne({ nombre }).then(user => {
    if (!user) {
      return Promise.reject();
    }
    return new Promise((resolve, reject) => {
      let dataBasePassword = user.password;
      if (password === dataBasePassword) {
        resolve(user);
      } else {
        reject("wrong password!");
      }
    });
  });
};

var User = mongoose.model("User", UserSchema);
module.exports = { User };
