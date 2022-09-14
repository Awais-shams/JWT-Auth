// * Modules
require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");
const multer = require("multer");
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

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./assets/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: diskStorage });

// * RESTFul Api's
app.get("/", (req, res) => {
  res.set("Content-Type", "text/html");
  res.send(Buffer.from("<h2>Test String</h2>"));
});
app.use("/api/user", user);

app.use("/api/university", user);
app.use("/api/course", user);
app.use("/api/data", user);
app.use("/api/geo", user);

// *Multer file uploading
app.use("/api/file", upload.single("image"), user);
app.use("/api/files", upload.array("images", 3), user);

// * Creating a web server
app.listen(port, () => console.log(`Listening on Port ${port}...`));

console.log(process.env.PRIVATE_KEY);
