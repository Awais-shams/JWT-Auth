const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registerSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    isAdmin: Boolean,
  },
  { versionKey: false }
);

// * Adding JWT method to schema
registerSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      isAdmin: this.isAdmin,
    },
    process.env.PRIVATE_KEY
  );
  return token;
};

const Register = mongoose.model("register", registerSchema);

console.log(Register);

module.exports = Register;
