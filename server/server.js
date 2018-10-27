const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");
const bodyParser = require("body-parser");
const { generateMessage } = require("./utils/message");
const publicPath = path.join(__dirname, "../public");

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

app.get("/users/login", (req, res) => {
  res.send(publicPath);
});
app.use(express.static(publicPath));
io.on("connection", socket => {
  console.log("new User conected");

  socket.emit(
    "newMessage",
    generateMessage(
      "server",
      "wellcome to the server , you can now chat with eachother"
    )
  );
  socket.broadcast.emit(
    "newMessage",
    generateMessage("admin", "new guy joined!")
  );

  socket.on("createMessage", ({ from, text }, callback) => {
    io.emit("newMessage", generateMessage(from, text));
    callback("if you may...");
  });

  socket.on("disconnect", () => {
    console.log("User disconected");
  });
});
server.listen(port, () => {
  console.log(`starting on port: ${port}`);
});

module.exports = { app };
