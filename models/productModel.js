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
  ratingsCount: {
    type: Number,
    default: 0,
  },
  ratingsAverage: Number,
  images: [String],
});

Schema.pre("save", function (next) {
  if (!this.isModified("reviews.length")) return next();
  this.ratingsCount = this.reviews.length;

  next();
});

Schema.method("updateRatings", function (id, rating) {
  this.reviews.unshift(id);
  this.ratingsCount = rating.ratingsCount;
  this.ratingsAverage = rating.ratingsAverage.toFixed(1);
});

module.exports = mongoose.model("Product", Schema);
