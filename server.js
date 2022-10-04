const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");
const path = require("path");

// Configure environment files
dotenv.config({ path: "./.env" });

// On syntax errors
process.on("unhandledException", (err) => {
  console.log(err.name, err.message);
  process.exit(1);
});

// Connect to database
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log(err));

app.use(express.static(path.join(__dirname, "client", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// Listen to requests
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () =>
  console.log("Server listening to requests from port 4000...")
);

// Close server on error
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  server.close(() => process.exit(1));
});
