const Products = require("../models/productModel");

exports.getAllProducts = async (req, res) => {
  const products = await Products.find();

  res.status(200).json({
    status: "success",
    data: {
      products,
    },
  });
};
