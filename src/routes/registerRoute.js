const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

const {
  registerUser,
  getRegisterUser,
  updateRegisterUser,
  deleteRegisterUser,
} = require("../controllers/registerController");
const registerValidator = require("../middlewares/registerValidation");

router.post("/", registerValidator, registerUser);
router.get("/me", auth, getRegisterUser);
router.put("/:id", registerValidator, updateRegisterUser);
router.delete("/me", [auth, admin], deleteRegisterUser);

module.exports = router;
