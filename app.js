// * Modules
require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");
const user = require("./src/routes/userRoute");

// * Built-in and custom middlewares
app.use(express.json());
app.use(morgan("tiny"));
app.use(helmet());
// * Environment Configuration
const port = process.env.PORT || 3000;

// * Mongoose/mongodb integration
mongoose
  .connect("mongodb://localhost/jwt-auth")
  .then(() => console.log("Mongodb connection successful"))
  .catch(() => console.log("Mongodb connection failed"));

// * RESTFul Api's
app.get("/", (req, res) => {
  res.set("Content-Type", "text/html");
  res.send(Buffer.from("<h2>Test String</h2>"));
});
app.use("/api/user", user);

// * Creating a web server
app.listen(port, () => console.log(`Listening on Port ${port}...`));
