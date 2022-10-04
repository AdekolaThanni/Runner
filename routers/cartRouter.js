const express = require("express");
const cartController = require("../controllers/cartController");

const router = express.Router();

router
  .route("/")
  .get(cartController.getCart)
  .post(cartController.addProductToCart)
  .delete(cartController.deleteCart);

router
  .route("/:id")
  .delete(cartController.removeProductFromCart)
  .patch(cartController.updateProductInCart);

module.exports = router;
