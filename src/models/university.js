const mongoose = require("mongoose");
const universitySchema = new mongoose.Schema(
  {
    country: String,
    city: String,
    courses: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courses",
    },
    location: {
      coordinates: [Number],
    },
    students: [
      {
        year: Number,
        number: Number,
      },
    ],
  },
  { versionKey: false }
);

const University = mongoose.model("university", universitySchema);

module.exports = University;
