const ProductsModel = require("./models/productModel");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");

dotenv.config({ path: "./.env" });

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log(err));

const products = fs.readFileSync("./products.json", "utf-8");
// console.log(products);
ProductsModel.create(JSON.parse(products)).then(() =>
  console.log("Added successfully")
);
