const express = require("express");
const bodyParser = require("body-parser");
var { connectWithDBThroughMongoose } = require("./db/mongoose");
var cors = require("cors");
var { authenticateMiddleware } = require("./middleware/authenticate");
const { ObjectID } = require("mongodb");

var { Ping } = require("./models/Ping");
var { User } = require("./models/User");
var { Inicio } = require("./models/Inicio");
var { Instalaciones } = require("./models/Instalaciones");

connectWithDBThroughMongoose()
  .then(message => console.log("connectingDB: ", message))
  .catch(e => console.log("error while connecting: ", e));

var app = express();

app.use(bodyParser.json());
app.use(cors());
app.get("/users/me", authenticateMiddleware, (req, res) => {
  res.send(req.user);
});

////////////////////inicio//////////////////////////

app.post("/copy/inicio", (req, res) => {
  var newInicio = new Inicio({
    inicioTextoCorto: req.body.params.inicioTextoCorto,
    inicioTextoLargo: req.body.params.inicioTextoLargo,
    items: req.body.params.items
  });
  newInicio.save().then(doc => {
    res.send(doc);
  });
});
app.get("/copy/inicio", (req, res) => {
  Inicio.find()
    .then(inicioCopy => {
      res.send({ inicioCopy });
    })
    .catch(err => {
      res.send(err);
    });
});
app.patch("/copy/inicio", authenticateMiddleware, (req, res) => {
  var body = req.body;
  var { id } = body;
  if (!body.inicioTextoCorto && !body.inicioTextoLargo && !body.items) {
    return res.status(400).send({ err: "give me something!" });
  }
  if (!ObjectID.isValid(id)) {
    return res.status(404).send({ err: "id not valid dude" });
  }
  body.updatedAt = new Date().toString();
  Inicio.findOneAndUpdate({ _id: id }, { $set: body }, { new: true })
    .then(inicioObject => {
      if (!inicioObject) {
        return res.status(404).send();
      }
      res.send(inicioObject);
    })
    .catch(e => res.status(400).send(e));
});

//////////////////instalaciones///////////////////////////

app.post("/copy/instalaciones", (req, res) => {
  var newInstalaciones = new Instalaciones({
    instalacionesTextoCorto: req.body.instalacionesTextoCorto,
    instalacionesTextoLargo: req.body.instalacionesTextoLargo,
    items: req.body.items
  });
});

//////////////////user/////////////////////////////////////

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

/////////////////ping to keep the server awake https://uptimerobot.com/dashboard#mainDashboard /////////////
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

// TODO::: configure webpack without webpack-dev-middleware

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
