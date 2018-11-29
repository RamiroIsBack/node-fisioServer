const express = require("express");
const bodyParser = require("body-parser");
var { connectWithDBThroughMongoose } = require("./db/mongoose");
var cors = require("cors");
var { authenticateMiddleware } = require("./middleware/authenticate");

var { Ping } = require("./models/Ping");
var { User } = require("./models/User");
var { Inicio } = require("./midels/Inicio");
var { Instalaciones } = require("./midels/Instalaciones");

connectWithDBThroughMongoose()
  .then(message => console.log("connectingDB: ", message))
  .catch(e => console.log("error while connecting: ", e));

var app = express();

app.use(bodyParser.json());
app.use(cors());
app.get("/users/me", authenticateMiddleware, (req, res) => {
  res.send(req.user);
});
app.post("/copy/inicio", (req, res) => {
  var newInicio = new Inicio({
    textoCortoHome: req.body.textoCortoInicio,
    textoLargoHome: req.body.textoLargoInicio,
    items: req.body.items
  });
});
app.post("/copy/instalaciones", (req, res) => {
  var newInstalaciones = new Instalaciones({
    textoCortoInstalaciones: req.body.textoCortoInstalaciones,
    textoLargoInstalaciones: req.body.textoLargoInstalaciones,
    items: req.body.items
  });
});
app.post("/users/login", (req, res) => {
  var { nombre, password } = req.body.params;
  User.findByCredentials({ nombre, password })
    .then(user => {
      user.generateAuthToken().then(token => {
        res.header("x-auth", token).send(user);
      });
    })
    .catch(e => {
      res.status(400).send(e);
    });
});
app.get("/ping", (req, res) => {
  Ping.find()
    .then(ping => {
      res.send({ ping, working: "is working" });
    })
    .catch(err => {
      res.send(err);
    });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`The server has started on port: ${port}`);
});
// Webpack runs as a middleware.  If any request comes in for the root route ('/')
// Webpack will respond with the output of the webpack process: an HTML file and

var webpackConfig = "";
if (port === 4000) {
  // devtool: "inline-source-map" for development
  webpackConfig = require("../webpack.dev.js");
} else {
  // a single bundle.js output of all of our client side Javascript for production
  webpackConfig = require("../webpack.prod.js");
}
const webpackMiddleware = require("webpack-dev-middleware");
const webpack = require("webpack");
app.use(webpackMiddleware(webpack(webpackConfig)));
module.exports = { app };
