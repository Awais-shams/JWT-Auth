const Register = require("../models/registerModel");

async function registerUser(req, res, next) {
  try {
    const register = await new Register({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    await register.save();
    res.send(register);
    next();
  } catch (err) {
    console.log(err);
  }
}

async function getRegisterUser(req, res, next) {
  try {
    const register = await Register.find();
    res.send(register);
    next();
  } catch (err) {
    console.log(err);
  }
}

// async function updateRegisterUser(req, res, next) {
//   try {
//     const register = await new Register({
//       name: req.body.name,
//       email: req.body.email,
//       password: req.body.password,
//     });

//     await register.save();
//     res.send(register);
//     next();
//   } catch (err) {
//     console.log(err);
//   }
// }

// async function deleteRegisterUser(req, res, next) {
//   try {
//     const register = await new Register({
//       name: req.body.name,
//       email: req.body.email,
//       password: req.body.password,
//     });

//     await register.save();
//     res.send(register);
//     next();
//   } catch (err) {
//     console.log(err);
//   }
// }

module.exports = { registerUser, getRegisterUser };
