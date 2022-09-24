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
    .limitFields()
    .paginate(18).query;

  const results = await new apiQuery(Products, req.query)
    .search()
    .filter()
    .query.countDocuments();

  res.status(200).json({
    status: "success",
    data: {
      results,
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

exports.getProductReviews = catchErrors(async (req, res, next) => {
  const reviews = await new apiQuery(
    Review.find({ product: req.params.id }),
    req.query
  )
    .sort()
    .paginate(10).query;

  res.status(200).json({
    status: "success",
    data: {
      results: reviews.length,
      reviews,
    },
  });
});

exports.createProductReview = catchErrors(async (req, res, next) => {
  const { name, comment, rating } = req.body;
  const product = await Products.findById(req.params.id);
  const review = await Review.create({
    name,
    comment,
    rating,
    product: product._id,
  });
  const [ratingsDetails] = await Review.aggregate([
    {
      $match: {
        product: product._id,
      },
    },
    {
      $group: {
        _id: null,
        ratingsCount: { $sum: 1 },
        ratingsAverage: { $avg: "$rating" },
      },
    },
  ]);

  product.updateRatings(review._id, ratingsDetails);
  await product.save();

  res.status(200).json({
    status: "success",
    data: {
      review,
    },
  });
});
