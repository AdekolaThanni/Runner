const Products = require("../models/productModel");
const Review = require("../models/reviewModel");
const apiQuery = require("../utilities/apiQuery");
const catchErrors = require("../utilities/catchErrors");
const constructError = require("../utilities/constructError");

exports.getAllProducts = catchErrors(async (req, res, next) => {
  const products = await new apiQuery(Products, req.query)
    .search()
    .filter()
    .sort()
    .paginate()
    .limitFields()
    .query.populate("reviews");

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
  )
    .limitFields()
    .query.populate("reviews");

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

exports.getReview = catchErrors(async (req, res, next) => {
  const { name, comment, rating } = req.body;
  const review = await Review.create({ name, comment, rating });
  const product = await Products.findById(req.params.id);
  product.reviews.unshift(review._id);

  await product.save();

  res.status(200).json({
    status: "success",
    data: {
      review,
    },
  });
});
