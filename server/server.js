const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");
//const bodyParser = require("body-parser");

const publicPath = path.join(__dirname, "../public");

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
const port = process.env.PORT || 3000;
//app.use(bodyParser.json());

// app.get("/", (req, res) => {
//   res.send(publicPath);
// });
app.use(express.static(publicPath));
io.on("connection", socket => {
  console.log("new User conected");

  socket.emit("newMessage", {
    from: "server",
    createdAt: new Date(),
    text: "fuck you monster!!"
  });

  socket.on("createMessage", message => {
    message.createdAt = new Date();
    console.log("client created a message", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconected");
  });
});
server.listen(port, () => {
  console.log(`starting on port: ${port}`);
});

module.exports = { app };
