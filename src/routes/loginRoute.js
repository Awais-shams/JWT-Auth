const login = require("../controllers/loginController");
const loginValidator = require("../middlewares/loginValidator");
const express = require("express");
const router = express.Router();

router.post("/",loginValidator, login);

module.exports = router;
