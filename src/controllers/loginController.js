const bcrypt = require("bcrypt");
const loginUser = require("../models/registerModel");

async function login(req, res, next) {
  try {
    const verifyEmail = await loginUser.findOne({ email: req.body.email });
    if (verifyEmail) {
      const verifyPassword = await bcrypt.compare(
        req.body.password,
        verifyEmail.password
      );
      if (verifyPassword) {
        const token = await verifyEmail.generateAuthToken();
        res.header("x-auth-token", token).send(true);
      } else {
        res.status(404).send("Invalid Password");
      }
    } else {
      res.status(404).send("Invalid Email");
    }
  } catch (err) {
    res.send(err);
  }
}

module.exports = login;
