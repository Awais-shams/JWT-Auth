const bcrypt = require("bcrypt");

const User = require("../models/user");

async function loginUser(req, res, next) {
  const user = await User.findOne({ email: req.body.email });
  console.log(user);
  try {
    const compare = await bcrypt.compare(req.body.password, user.password);
    console.log(compare);
    if (compare) {
      const token = await user.generateAuthToken();
      console.log(token);
      res.header("x-auth-token", token).send({
        token: token,
      });
    }
  } catch (err) {
    res.status(404).send(err);
  }
}
async function registerUser(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(404).send("User Already Registered");
    } else {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        isAdmin: req.body.isAdmin,
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      await user.save();
      const token = await user.generateAuthToken();
      res.header("x-auth-token", token).send(user);
    }
  } catch (err) {
    res.status(404).send(err);
  }
}

async function getUserById(req, res, next) {
  try {
    const getRegister = await User.findById(req.user._id);
    res.send(getRegister);
    next();
  } catch (err) {
    res.status(404).send(err);
  }
}

async function updateUserById(req, res, next) {
  try {
    const exist = await User.findById(req.params.id);
    if (exist) {
      const updateRegister = await User.findByIdAndUpdate(req.params.id, {
        $set: {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        },
      });

      await updateRegister.save();
      res.send(updateRegister);
      next();
    } else {
      res.send("Id does not exist");
    }
  } catch (err) {
    res.status(404).send(err);
  }
}

async function deleteUserById(req, res, next) {
  try {
    const exist = await User.findById(req.user._id);
    console.log(exist);
    if (exist) {
      const deleteRegister = await User.findByIdAndDelete(req.user._id);

      await deleteRegister.save();
      res.send(deleteRegister);
      next();
    } else {
      res.send("Id does not exist");
    }
  } catch (err) {
    res.status(404).send(err);
  }
}

module.exports = {
  loginUser,
  registerUser,
  getUserById,
  updateUserById,
  deleteUserById,
};
