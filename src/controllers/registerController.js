const Register = require("../models/registerModel");
const bcrypt = require("bcrypt");

async function registerUser(req, res, next) {
  try {
    const user = await Register.findOne({ email: req.body.email });
    if (user) {
      res.status(404).send("User Already Registered");
    } else {
      const register = await new Register({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        isAdmin: req.body.isAdmin,
      });
      const salt = await bcrypt.genSalt(10);
      register.password = await bcrypt.hash(register.password, salt);
      await register.save();
      const token = await register.generateAuthToken();
      res.header("x-auth-token", token).send(register);
    }
  } catch (err) {
    res.status(404).send(err);
  }
}

async function getRegisterUser(req, res, next) {
  try {
    const getRegister = await Register.findById(req.user._id);
    res.send(getRegister);
    next();
  } catch (err) {
    res.status(404).send(err);
  }
}

async function updateRegisterUser(req, res, next) {
  try {
    const exist = await Register.findById(req.params.id);
    if (exist) {
      const updateRegister = await Register.findByIdAndUpdate(req.params.id, {
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

async function deleteRegisterUser(req, res, next) {
  try {
    const exist = await Register.findById(req.user._id);
    console.log(exist);
    if (exist) {
      const deleteRegister = await Register.findByIdAndDelete(req.user._id);

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
  registerUser,
  getRegisterUser,
  updateRegisterUser,
  deleteRegisterUser,
};
