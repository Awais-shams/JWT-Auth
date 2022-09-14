const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const loginValidator = require("../middlewares/loginValidator");
const registerValidator = require("../middlewares/registerValidation");

const {
  uploadSingleFile,
  uploadMultipleFiles,
} = require("../controllers/files");

const {
  loginUser,
  registerUser,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../controllers/userController");

const {
  addUniversity,
  addCourses,
  fetchData,
  updateCourse,
  textSearch,
  addLocation,
  getNearLoc,
} = require("../controllers/test");

router.post("/login", loginValidator, loginUser);
router.post("/register", registerValidator, registerUser);
router
  .route("/:id")
  .get(auth, getUserById)
  .put(auth, registerValidator, updateUserById)
  .delete([auth, admin], deleteUserById);

// * University and Courses Routes
router.post("/", addUniversity);
router.get("/", fetchData);
router.post("/add", addCourses);
router.put("/update/:id", updateCourse);
router.get("/textSearch/name", textSearch);

// * Geospatial location
router.post("/location", addLocation);
router.get("/location/near", getNearLoc);

// * Multer File
router.post("/single", uploadSingleFile);
router.post("/multiple", uploadMultipleFiles);

module.exports = router;
