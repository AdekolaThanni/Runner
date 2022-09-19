const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

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

// Listen to requests
const server = app.listen(4000, () =>
  console.log("Server listening to requests from port 4000...")
);

// Close server on error
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  server.close(() => process.exit(1));
});
