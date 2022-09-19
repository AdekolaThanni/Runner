const Products = require("../models/productModel");
const catchErrors = require("../utilities/catchErrors");
// Configure environment files
require("dotenv").config({ path: "./.env" });
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

exports.takePayment = catchErrors(async (req, res, next) => {
  const products = await Promise.all(
    req.body.products.map(async (product) => {
      const realProdDetails = await Products.findById(product.id).select(
        "price name images"
      );

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: realProdDetails.name,
            images: realProdDetails.images,
          },
          unit_amount: realProdDetails.price * 100,
        },
        quantity: product.quantity,
      };
    })
  );

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: products,
    success_url: `${process.env.CLIENT_URL}?success=true`,
    cancel_url: `${process.env.CLIENT_URL}?canceled=true`,
  });

  res.status(200).json({
    status: "success",
    data: {
      url: session.url,
    },
  });
});
