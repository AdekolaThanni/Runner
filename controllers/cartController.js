const catchErrors = require("../utilities/catchErrors");
const constructError = require("../utilities/constructError");

exports.getCart = catchErrors(async (req, res, next) => {
  const cart = req.cookies.runnerCart ? JSON.parse(req.cookies.runnerCart) : [];

  res.status(200).json({
    status: "success",
    data: {
      cart,
    },
  });
});

exports.addProductToCart = catchErrors(async (req, res, next) => {
  const {
    body: { id, quantity },
  } = req;

  if (!id || !quantity)
    return next(new constructError(400, "Product details are invalid"));

  if (Math.abs(quantity) > 5)
    return next(
      new constructError(400, "Only a maximum of 5 products can be purchased")
    );

  const newProduct = {
    id,
    quantity: Math.abs(quantity),
  };

  let newCart;
  if (req.cookies?.runnerCart) {
    const cart = JSON.parse(req.cookies.runnerCart);
    if (!cart.some((product) => product.id === newProduct.id)) {
      newCart = cart.concat(newProduct);
    } else {
      newCart = cart;
    }
  } else {
    newCart = [newProduct];
  }

  res.cookie("runnerCart", JSON.stringify(newCart));

  res.status(200).json({
    status: "success",
    data: {
      cart: newCart,
    },
  });
});

exports.removeProductFromCart = catchErrors(async (req, res, next) => {
  let cart = [];

  if (req.cookies.runnerCart) {
    cart = JSON.parse(req.cookies.runnerCart).filter(
      (product) => product.id !== req.params.id
    );

    res.cookie("runnerCart", JSON.stringify(cart));
  }

  res.status(204).json({
    status: "success",
    data: {
      cart,
    },
  });
});

exports.updateProductInCart = catchErrors(async (req, res, next) => {
  if (!req.body.quantity)
    return next(new constructError(400, "Product update fields are empty"));

  if (Math.abs(req.body.quantity) > 5)
    return next(
      new constructError(400, "Only a maximum of 5 products can be purchased")
    );

  let cart = req.cookies.runnerCart ? JSON.parse(req.cookies.runnerCart) : [];

  cart = cart.map((product) => {
    if (product.id === req.params.id) {
      return {
        id: req.params.id,
        quantity: Math.abs(req.body.quantity),
      };
    } else return product;
  });

  res.cookie("runnerCart", JSON.stringify(cart));

  res.status(200).json({
    status: "success",
    data: {
      cart,
    },
  });
});
