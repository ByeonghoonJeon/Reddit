// test/index.js
const chai = require("chai");
const chaiHttp = require("chai-http");
const { describe, it } = require("mocha");
const { app, server } = require("../server");

const should = chai.should();

chai.use(chaiHttp);

describe("site", function () {
  after(function () {
    server.close();
  });

  // Describe what you are testing
  it("Should have home page", function (done) {
    // Describe what should happen
    // In this case we test that the home page loads
    const agent = chai.request.agent(app);
    agent.get("/").end(function (err, res) {
      if (err) {
        return done(err);
      }
      res.should.have.status(200);
      return done(); // Call done if the test completed successfully.
    });
  });
});
