const Products = require("../models/productModel");
const apiQuery = require("../utilities/apiQuery");

exports.getAllProducts = async (req, res) => {
  const { query } = req;

  const products = await new apiQuery(Products, query).filter().query;

  res.status(200).json({
    status: "success",
    data: {
      results: products.length,
      products,
    },
  });
};
