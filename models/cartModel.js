const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, "Invalid quantity"],
    max: [5, "Maximum amount of product that can be purchased is 5"],
  },
});

const Schema = new mongoose.Schema({
  products: [productSchema],
});

module.exports = new mongoose.model("Cart", Schema);
