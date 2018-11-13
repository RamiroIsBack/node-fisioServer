const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
var { connectWithDBThroughMongoose } = require("./db/mongoose");

var { Ping } = require("./models/Ping");

connectWithDBThroughMongoose()
  .then(message => console.log("connectingDB: ", message))
  .catch(e => console.log("error while connecting: ", e));

const publicPath = path.join(__dirname, "../public");

const { apolloServer } = require("./graphql/schema.js");

var app = express();

// Middleware: GraphQL
apolloServer.applyMiddleware({
  app
});

app.use(bodyParser.json());
app.get("/users/login", (req, res) => {
  res.send(publicPath);
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
app.get("/instalaciones", (req, res) => {
  Instalaciones.find()
    .then(insta => {
      res.send({ insta, working: "is working" });
    })

    .catch(err => {
      res.send(err);
    });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`The server has started on port: ${port}`);
  console.log(`http://localhost:${port}/graphql`);
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
