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

const { addUniversity, addCourses, fetchData } = require("../controllers/test");

router.post("/login", loginValidator, loginUser);
router.post("/register", registerValidator, registerUser);
router
  .route("/:id")
  .get(auth, getUserById)
  .put(auth, registerValidator, updateUserById)
  .delete([auth, admin], deleteUserById);

// * University and Courses Routes
router.post("/", addUniversity);
router.post("/add", addCourses);
router.get("/", fetchData);

module.exports = router;
