// * Modules
require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");
const register = require("./src/routes/registerRoute");
const login = require("./src/routes/loginRoute");

// * Built-in and custom middlewares
app.use(express.json());
app.use(morgan("tiny"));
app.use(helmet());
// * Environment Configuration
const port = process.env.PORT || 3000;

// * Creating a web server
app.listen(port, () => console.log(`Listening on Port ${port}...`));

// * Mongoose/mongodb integration
mongoose
  .connect("mongodb://localhost/jwt-auth")
  .then(() => console.log("Mongodb connection successful"))
  .catch(() => console.log("Mongodb connection failed"));

// * RESTFul Api's
app.use("/api/register", register);

app.use("/api/login", login);
