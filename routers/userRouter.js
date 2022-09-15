const express = require("express");
const userController = require("../controllers/userController");
const wishlistController = require("../controllers/wishlistController");

const router = express.Router();

router.route("/register").post(userController.register);
router.route("/login").post(userController.login);

// The following routes are protected
router.use(userController.protect);

router.route("/wishlist").get(wishlistController.getUserWishlist);

router
  .route("/wishlist/:id")
  .post(wishlistController.addProductToWishlist)
  .delete(wishlistController.removeProductFromWishlist);
module.exports = router;
