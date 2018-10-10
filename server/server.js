const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const publicPath = path.join(__dirname, "../public");

var app = express();
const port = process.env.PORT || 3000;
//app.use(bodyParser.json());

// app.get("/", (req, res) => {
//   res.send(publicPath);
// });
app.use(express.static(publicPath));
app.listen(port, () => {
  console.log(`starting on port: ${port}`);
});

module.exports = { app };
