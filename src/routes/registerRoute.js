const express = require("express");
const router = express.Router();
const {
  registerUser,
  getRegisterUser,
} = require("../controllers/registerController");
const registerValidator = require("../middlewares/registerValidation");

router.post("/", registerValidator, registerUser);
router.get("/", getRegisterUser);

module.exports = router;
