const express = require("express");
const userController = require("../controllers/userController");
const wishlistController = require("../controllers/wishlistController");

const router = express.Router();

router.route("/register").post(userController.register);
router
  .route("/login")
  .get(userController.checkIfLoggedIn)
  .post(userController.login);
router.route("/forgotPassword").post(userController.forgotPassword);
router.route("/resetPassword/:token").post(userController.resetPassword);

// The following routes are protected
router.use(userController.protect);

router.route("/me").get(userController.getUser);
router.route("/logout").get(userController.logout);
router.route("/").patch(userController.updateProfile);
router.route("/updatePassword").post(userController.updatePassword);

router.route("/wishlist").get(wishlistController.getUserWishlist);

router
  .route("/wishlist/:id")
  .post(wishlistController.addProductToWishlist)
  .delete(wishlistController.removeProductFromWishlist);
module.exports = router;
