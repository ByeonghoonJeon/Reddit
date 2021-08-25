// test/posts.js
const User = require("../models/user");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { describe, it, after } = require("mocha");
const { app, server } = require("../server");

// Import the Post model from our models folder so we
// we can use it in our tests.
const Post = require("../models/post");

const should = chai.should();

chai.use(chaiHttp);

// Post that we'll use for testing purposes
const newPost = {
  title: "post title",
  url: "https://www.google.com",
  summary: "post summary",
};
// User that we'll use for testing purposes
const user = {
  username: "poststest",
  password: "testposts",
};
const agent = chai.request.agent(app);

before(function (done) {
  agent
    .post("/sign-up")
    .set("content-type", "application/x-www-form-urlencoded")
    .send(user)
    .then(function (res) {
      done();
    })
    .catch(function (err) {
      done(err);
    });
});

describe("Posts", function () {
  after(function (done) {
    Post.findOneAndDelete(newPost)
      .then(function () {
        agent.close();

        User.findOneAndDelete({
          username: user.username,
        })
          .then(function () {
            done();
          })
          .catch(function (err) {
            done(err);
          });
      })
      .catch(function (err) {
        done(err);
      });
  });
});
