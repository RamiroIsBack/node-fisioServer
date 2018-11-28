const express = require("express");
const bodyParser = require("body-parser");
var { connectWithDBThroughMongoose } = require("./db/mongoose");
var cors = require("cors");
var { authenticateMiddleware } = require("./middleware/authenticate");

var { Ping } = require("./models/Ping");
var { User } = require("./models/User");

connectWithDBThroughMongoose()
  .then(message => console.log("connectingDB: ", message))
  .catch(e => console.log("error while connecting: ", e));

var app = express();

app.use(bodyParser.json());
app.use(cors());
app.get("/users/me", authenticateMiddleware, (req, res) => {
  console.log(req);
  res.send(req.user);
});
app.get("/users/login", (req, res) => {
  res.send(req.headers);
});
app.post("/users/login", (req, res) => {
  var { email, password } = req.body;
  User.findByCredentials({ email, password })
    .then(user => {
      user.generateAuthToken().then(token => {
        res.header("x-auth", token).send(user);
      });
    })
    .catch(e => {
      res.status(400).send(e);
    });
});
app.get("/user", (req, res) => {
  User.find()
    .then(users => {
      res.send({ users });
    })

    .catch(err => {
      res.send(err);
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
