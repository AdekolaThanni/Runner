const Cart = require("../models/cartModel");
const catchErrors = require("../utilities/catchErrors");
const constructError = require("../utilities/constructError");

const checkCartInCookies = (req) => {
  const cookie = req.cookies?.runnerCart;
  if (!cookie || !JSON.parse(cookie)) {
    return;
  } else {
    return JSON.parse(cookie);
  }
};

exports.getCart = catchErrors(async (req, res, next) => {
  const cartId = checkCartInCookies(req);

  if (!cartId)
    return res.status(200).json({
      status: "success",
      message: "Your cart is empty",
    });

  const cart = await Cart.findById(cartId).populate(
    "products.product",
    "name price brand gender images"
  );

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

  const newProduct = {
    product: id,
    quantity,
  };

  let newCart;

  const cartId = checkCartInCookies(req);

  if (cartId) {
    newCart = await Cart.findById(cartId);
    if (
      !newCart.products.some(
        (prod) => prod.product.toString() === newProduct.product
      )
    ) {
      newCart.products.push(newProduct);
      await newCart.save();
    }
  } else {
    newCart = await Cart.create({ products: [newProduct] });
    res.cookie("runnerCart", JSON.stringify(newCart._id));
  }

  res.status(200).json({
    status: "success",
    data: {
      cart: newCart,
    },
  });
});

exports.removeProductFromCart = catchErrors(async (req, res, next) => {
  let cart = "Your cart is empty";
  const cartId = checkCartInCookies(req);
  if (cartId) {
    cart = await Cart.findById(cartId);
    cart.products = cart.products.filter(
      (prod) => prod.product.toString() !== req.params.id
    );
    await cart.save();
    if (!cart.products.length) {
      await Cart.deleteOne({ _id: cart._id });
      res.cookie("runnerCart", JSON.stringify(""));
    }
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

  const cartId = checkCartInCookies(req);

  if (!cartId) {
    return next(new constructError(400, "You cart is empty"));
  }

  const cart = await Cart.findById(cartId);

  cart.products = cart.products.map((product) => {
    if (product.product.toString() === req.params.id) {
      return {
        product: req.params.id,
        quantity: req.body.quantity,
      };
    } else return product;
  });

  await cart.save();

  res.status(200).json({
    status: "success",
    data: {
      cart,
    },
  });
});
