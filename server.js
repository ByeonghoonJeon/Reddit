const express = require("express");
const app = express();
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.get("/", function (req, res) {
  res.render("home", { msg: "Hello World!" });
});

app.listen(3000, function () {
  console.log("Server is listening on the port 3000");
});
