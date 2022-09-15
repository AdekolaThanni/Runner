const Products = require("../models/productModel");
const apiQuery = require("../utilities/apiQuery");
const catchErrors = require("../utilities/catchErrors");
const constructError = require("../utilities/constructError");

exports.getAllProducts = catchErrors(async (req, res, next) => {
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
});

exports.getSingleProduct = catchErrors(async (req, res, next) => {
  const product = await new apiQuery(
    Products.findById(req.params.id),
    req.query
  ).limitFields().query;

  if (!product) {
    return next(new constructError(404, "Product not found"));
  }

  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});
