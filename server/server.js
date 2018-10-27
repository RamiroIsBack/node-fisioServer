const path = require("path");
//const http = require("http");
const express = require("express");
//const socketIO = require("socket.io");
const bodyParser = require("body-parser");
const mongosse = require("mongoose");
//const { generateMessage } = require("./utils/message");
const publicPath = path.join(__dirname, "../public");

// Imports: GraphQL
const { SERVER } = require("./graphql/schema.js");

var app = express();

// Middleware: GraphQL
SERVER.applyMiddleware({
  app
});

app.use(bodyParser.json());
app.get("/users/login", (req, res) => {
  res.send(publicPath);
});
// app.use(express.static(publicPath));
const port = process.env.PORT || 4000;

// Express: Listener
app.listen(port, () => {
  console.log(`The server has started on port: ${port}`);
  console.log(`http://localhost:${port}/graphql`);
});
// Webpack runs as a middleware.  If any request comes in for the root route ('/')
// Webpack will respond with the output of the webpack process: an HTML file and
// a single bundle.js output of all of our client side Javascript
const webpackMiddleware = require("webpack-dev-middleware");
const webpack = require("webpack");
const webpackConfig = require("../webpack.config.js");
app.use(webpackMiddleware(webpack(webpackConfig)));
module.exports = { app };

// // var server = http.createServer(app);
// // var io = socketIO(server);

// // io.on("connection", socket => {
// //   console.log("new User conected");

// //   socket.emit(
// //     "newMessage",
// //     generateMessage(
// //       "server",
// //       "wellcome to the server , you can now chat with eachother"
// //     )
// //   );
// //   socket.broadcast.emit(
// //     "newMessage",
// //     generateMessage("admin", "new guy joined!")
// //   );

// //   socket.on("createMessage", ({ from, text }, callback) => {
// //     io.emit("newMessage", generateMessage(from, text));
// //     callback("if you may...");
// //   });

// //   socket.on("disconnect", () => {
// //     console.log("User disconected");
// //   });
// // });
// server.listen(port, () => {
//   console.log(`starting on port: ${port}`);
// });
