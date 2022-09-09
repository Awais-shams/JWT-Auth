const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const loginValidator = require("../middlewares/loginValidator");
const registerValidator = require("../middlewares/registerValidation");

const {
  loginUser,
  registerUser,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../controllers/userController");

router.post("/login", loginValidator, loginUser);
router.post("/register", registerValidator, registerUser);
router
  .route("/:id")
  .get(auth, getUserById)
  .put(auth, registerValidator, updateUserById)
  .delete([auth, admin], deleteUserById);

module.exports = router;
