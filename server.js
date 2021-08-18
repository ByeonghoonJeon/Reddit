const express = require("express");
const app = express();
const exphbs = require("express-handlebars");

require("./data/reddit-db");
require("./controllers/posts")(app);
// Set db

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/posts/new", function (req, res) {
  res.render("posts-new");
});

app.listen(3000, function () {
  console.log("Server is listening on the port 3000");
});
