require("dotenv").config();
require("./data/reddit-db");

const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
app.use(express.static("public"));
app.use(cookieParser()); // Add this after you initialize express.
const checkAuth = require("./middleware/checkAuth");
app.use(checkAuth);

const exphbs = require("express-handlebars");
const Post = require("./models/post");

// Set db
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get("/posts/new", function (req, res) {
  res.render("posts-new");
});
require("./controllers/posts")(app);
require("./controllers/comments.js")(app);
require("./controllers/auth.js")(app);
require("./controllers/replies.js")(app);

const server = app.listen(3000, function () {
  console.log("Server is listening on the port 3000");
});

module.exports = { server, app };
