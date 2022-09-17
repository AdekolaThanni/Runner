const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now(),
  },
  name: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: [1, "Minimum rating is 1"],
    max: [5, "Maximum rating is 5"],
  },
});

module.exports = mongoose.model("Review", Schema);
