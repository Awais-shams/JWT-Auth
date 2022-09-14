const mongoose = require("mongoose");

const coursesSchema = new mongoose.Schema(
  {
    university: String,
    name: {
      type: String,
      required: true,
    },
    level: String,
  },
  { versionKey: false }
);

coursesSchema.index({ name: "text" });

coursesSchema.post("save", async function (course) {
  console.log("Course updated successfully");
  course.name = "not upaded";
  course.save();
  if (this._id === course._id) {
    return;
  }
  return;
});

const Courses = mongoose.model("courses", coursesSchema);

module.exports = Courses;
