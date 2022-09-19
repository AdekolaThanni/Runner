const User = require("../models/userModel");
const catchErrors = require("../utilities/catchErrors");

exports.getUserWishlist = catchErrors(async (req, res, next) => {
  const { wishlist } = await User.findById(req.user._id).populate(
    "wishlist",
    "name price ratingsAverage ratingsQuantity images"
  );

  res.status(200).json({
    status: "success",
    data: {
      results: wishlist.length,
      wishlist,
    },
  });
});

exports.addProductToWishlist = catchErrors(async (req, res, next) => {
  if (
    !req.user.wishlist.some((product) => product.toString() === req.params.id)
  ) {
    req.user.wishlist.push(req.params.id);
    await req.user.save({
      validateBeforeSave: false,
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      user: req.user,
    },
  });
});

exports.removeProductFromWishlist = catchErrors(async (req, res, next) => {
  req.user.wishlist = req.user.wishlist.filter(
    (product) => product.toString() !== req.params.id
  );

  await req.user.save({
    validateBeforeSave: false,
  });

  res.status(204).json({
    status: "success",
    data: null,
  });
});
