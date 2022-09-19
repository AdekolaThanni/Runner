const express = require("express");
const productController = require("../controllers/productController");

const router = express.Router();

router.route("/").get(productController.getAllProducts);

router.route("/:id").get(productController.getSingleProduct);

router
  .route("/review/:id")
  .get(productController.getProductReviews)
  .post(productController.createProductReview);

module.exports = router;
