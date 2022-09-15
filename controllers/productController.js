const Products = require("../models/productModel");
const apiQuery = require("../utilities/apiQuery");

exports.getAllProducts = async (req, res) => {
  const products = await new apiQuery(Products, req.query)
    .filter()
    .sort()
    .paginate()
    .limitFields().query;

  res.status(200).json({
    status: "success",
    data: {
      results: products.length,
      page: req.query.page || 1,
      products,
    },
  });
};

exports.getSingleProduct = async (req, res) => {
  const product = await new apiQuery(
    Products.findOne({ id: req.params.id }),
    req.query
  ).limitFields().query;

  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
};
