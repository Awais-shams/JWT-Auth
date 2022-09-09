const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userSchema = new mongoose.Schema(
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
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      isAdmin: this.isAdmin,
    },
    process.env.PRIVATE_KEY
  );
  return token;
};

const User = mongoose.model("user", userSchema);

module.exports = User;
