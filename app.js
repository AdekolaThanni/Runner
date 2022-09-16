const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
// const hpp = require("hpp");
const cookieParser = require("cookie-parser");

const productRouter = require("./routers/productRouter");
const userRouter = require("./routers/userRouter");
const cartRouter = require("./routers/cartRouter");
const errorController = require("./controllers/errorController");

const app = express();

// Secure requests
app.use(helmet());

// Limit request limit
app.use(
  "/api",
  rateLimit({
    max: 100,
    windowMS: 60 * 60 * 1000,
    message: "Request limit exhausted, only 100 calls/ hour is allowed",
  })
);

// Parse cookies
app.use(cookieParser());

// Sanitize request from manipulating mongoDB database
app.use(mongoSanitize());

// Cross site cleaning to prevent malicious html codes
app.use(xss());

// Add body to requests
app.use(
  express.json({
    limit: "10kb",
  })
);

// Routes
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/cart", cartRouter);

// Error handler
app.use(errorController);

// Not found
app.use("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: "Path not found on server",
  });
});

module.exports = app;
