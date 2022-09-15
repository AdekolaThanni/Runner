const mongoose = require("mongoose");

// Schema declaration
const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  details: {
    description: String,
    features: [String],
  },
  brand: {
    type: String,
    required: true,
    lowercase: true,
  },
  ratingsCount: Number,
  ratingsAverage: Number,
  images: [String],
});

module.exports = mongoose.model("Product", Schema);
