const University = require("../models/university");
const Courses = require("../models/course");
const GeoSpatialLocation = require("../models/map");

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

async function updateCourse(req, res, next) {
  try {
    const updateCourse = await Courses.findById(req.params.id);
    updateCourse.name = req.body.name;
    console.log(updateCourse);
    const newCourse = await updateCourse.save();
    await res.send(newCourse);
  } catch (err) {
    console.log(err);
  }
}

async function textSearch(req, res) {
  try {
    const textSearch = await Courses.find({
      $text: {
        $search: "mathematics electronics",
      },
    });
    await res.send(textSearch);
  } catch (err) {
    console.log(err);
  }
}

async function addLocation(req, res) {
  try {
    const location = await GeoSpatialLocation.insertMany([
      {
        name: "UMASS Amherst",
        location: {
          type: "Point",
          coordinates: [42.3867598, -72.5322402],
        },
      },
    ]);
    await res.send(location);
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
}

async function getNearLoc(req, res) {
  try {
    const near = await GeoSpatialLocation.find({
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [42.314398, -71.036445],
        },
        $maxDistance: 122,
        $minDistance: 150,
      },
    });
    await res.send(near);
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
}

module.exports = {
  addUniversity,
  addCourses,
  fetchData,
  updateCourse,
  textSearch,
  addLocation,
  getNearLoc,
};
