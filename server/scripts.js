const ProductsModel = require("./models/productModel");
const ReviewsModel = require("./models/reviewModel");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");

dotenv.config({ path: "./.env" });

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log(err));

// const products = fs.readFileSync("./products.json", "utf-8");
// // console.log(products);
// ProductsModel.create(JSON.parse(products)).then(() =>
//   console.log("Added successfully")
// );

const reviews = fs.readFileSync("./Reviews.json", "utf-8");
ReviewsMode.create(
  JSON.parse(reviews, () => {
    console.log("Added");
  })
);
