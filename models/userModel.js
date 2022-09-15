const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const Schema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: validator.isEmail,
      message: "The given email is invalid",
    },
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  confirmPassword: {
    type: String,
    required: true,
    validate: {
      validator: function (givenConfirmation) {
        return this.password === givenConfirmation;
      },
      message: "Passwords do not match",
    },
  },
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

// Hash password before saving
Schema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

// Verify Password
Schema.method("verifyPassword", async function (realPassword, givenPassword) {
  return await bcrypt.compare(givenPassword, realPassword);
});

module.exports = mongoose.model("User", Schema);
