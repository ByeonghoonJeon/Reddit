require("./data/reddit-db");
const express = require("express");
const app = express();
require("./controllers/posts")(app);
const exphbs = require("express-handlebars");
const Post = require("./models/post");

// Set db

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// app.get("/", function (req, res) {
//   res.render("home");
// });

app.get("/", async (req, res) => {
  try {
    const posts = await Post.find({}).lean();
    return res.render("posts-index", { posts });
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/posts/new", function (req, res) {
  res.render("posts-new");
});

app.listen(3000, function () {
  console.log("Server is listening on the port 3000");
});
