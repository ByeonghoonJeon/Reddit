const Post = require("../models/post");

module.exports = (app) => {
  // CREATE
  app.post("/posts/new", (req, res) => {
    if (req.user) {
      const post = new Post(req.body);

      post.save(() => res.redirect("/"));
    } else {
      return res.status(401); // UNAUTHORIZED
    }
  });

  app.get("/", async (req, res) => {
    const currentUser = req.user;
    try {
      const posts = await Post.find({}).lean();
      return res.render("posts-index", { posts, currentUser });
    } catch (err) {
      console.log(err.message);
    }
  });
  // LOOK UP THE POST
  app.get("/posts/:id", (req, res) => {
    // LOOK UP THE POST
    Post.findById(req.params.id)
      .lean()
      .populate("comments")
      .then((post) => res.render("posts-show", { post }))
      .catch((err) => {
        console.log(err.message);
      });
  });

  // SUBREDDIT
  app.get("/n/:subreddit", (req, res) => {
    Post.find({ subreddit: req.params.subreddit })
      .lean()
      .then((posts) => res.render("posts-index", { posts }))
      .catch((err) => {
        console.log(err);
      });
  });
};
