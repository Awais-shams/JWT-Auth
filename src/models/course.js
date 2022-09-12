const mongoose = require("mongoose");

const coursesSchema = new mongoose.Schema(
  {
    
    university: String,
    name: String,
    level: String,
  },
  { versionKey: false }
);

const Courses = mongoose.model("courses", coursesSchema);

module.exports = Courses;
