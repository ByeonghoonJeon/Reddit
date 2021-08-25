const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  console.log("Checking authentication");

  const token = req.cookies.nToken;
  if (
    typeof req.cookies.nToken === "undefined" ||
    req.cookies.nToken === null
  ) {
    req.user = null;
  } else {
    const decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }

  next();
};

module.exports = checkAuth;
