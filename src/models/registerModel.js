const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const Register = mongoose.model("register", registerSchema);

console.log(Register);

module.exports = Register;
