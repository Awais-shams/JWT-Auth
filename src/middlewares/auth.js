const jwt = require("jsonwebtoken");
require("dotenv").config();

async function auth(req, res, next) {
  try {
    const token = req.header("x-auth-token");
    if (token) {
      const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
      //   console.log(decoded);
      //   console.log(req);
      req.user = decoded;
      next();
    } else {
      return res.status(401).send("Access Denied, No token provided");
    }
  } catch (err) {
    return res.status(400).send("Invalid Token");
  }
}

module.exports = auth;
