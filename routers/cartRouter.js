const express = require("express");
const cartController = require("../controllers/cartController");

const router = express.Router();

router
  .route("/")
  .get(cartController.getCart)
  .post(cartController.addProductToCart);

router
  .route("/:id")
  .delete(cartController.removeProductFromCart)
  .patch(cartController.updateProductInCart);

module.exports = router;
