const mongoose = require("mongoose");

const geoSpatialSchema = new mongoose.Schema(
  {
    name: String,
    location: {
      type: {
        type: String,
        enum: ["Point", "Polygon"],
      },
      coordinates: [Number],
    },
  },
  { versionKey: false }
);

geoSpatialSchema.index({ location: "2dsphere" });

const GeoSpatialLocation = mongoose.model(
  "geospatiallocation",
  geoSpatialSchema
);

module.exports = GeoSpatialLocation;
