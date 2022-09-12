const University = require("../models/university");
const Courses = require("../models/course");

async function addUniversity(req, res, next) {
  try {
    const uni = await University.insertMany([
      {
        country: "Spain",
        city: "Salamanca",
        courses: "631f2aa35f7a64806bf6cfc4",
        location: {
          coordinates: [-5.6722512, 17, 40.9607792],
        },
        students: [
          { year: 2014, number: 24774 },
          { year: 2015, number: 23166 },
          { year: 2016, number: 21913 },
          { year: 2017, number: 21715 },
        ],
      },
      {
        country: "Spain",
        city: "Salamanca",
        courses: "631f2aa35f7a64806bf6cfc4",
        location: {
          coordinates: [-5.6691191, 17, 40.9631732],
        },
        students: [
          { year: 2014, number: 4788 },
          { year: 2015, number: 4821 },
          { year: 2016, number: 6550 },
          { year: 2017, number: 6125 },
        ],
      },
    ]);
    res.send(uni);
  } catch (err) {
    res.status(404).send(err);
  }
}

async function addCourses(req, res, next) {
  try {
    const courses = await Courses.insertMany([
      {
        university: "USAL",
        name: "Computer Science",
        level: "Excellent",
      },
      {
        university: "USAL",
        name: "Electronics",
        level: "Intermediate",
      },
      {
        university: "USAL",
        name: "Communication",
        level: "Excellent",
      },
    ]);
    res.send(courses);
  } catch (err) {
    res.status(404).send(err);
  }
}

async function fetchData(req, res, next) {
  try {
    const computedData = await University.aggregate([
      {
        $lookup: {
          from: "courses",
          localField: "courses",
          foreignField: "_id",
          as: "course",
        },
      },
    ]);
    res.send(computedData);
  } catch (err) {
    res.status(404).send(err);
  }
}

module.exports = {
  addUniversity,
  addCourses,
  fetchData,
};
