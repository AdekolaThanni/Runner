// Configure environment files
require("dotenv").config({ path: "./.env" });
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utilities/sendEmail");
const catchErrors = require("../utilities/catchErrors");
const constructError = require("../utilities/constructError");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const assignTokenToCookie = (user, res, statusCode) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + parseInt(process.env.JWT_EXPIRES_IN) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true,
  };

  res.cookie("runnerAuthToken", token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    data: {
      token,
      user,
    },
  });
};

exports.register = catchErrors(async (req, res, next) => {
  const newUser = await User.create(req.body);

  assignTokenToCookie(newUser, res, 201);
});

exports.login = catchErrors(async (req, res, next) => {
  const {
    body: { email, password },
  } = req;

  //   Check validity
  if (!email || !password)
    return next(new constructError(400, "Input your password and email"));

  // Get User
  const user = await User.findOne({ email });
  if (!user)
    return next(new constructError(400, "Email or password is incorrect"));

  //   Verify Password
  if (!(await user.verifyPassword(user.password, password)))
    return next(new constructError(400, "Email or password is incorrect"));

  assignTokenToCookie(user, res, 200);
});

exports.logout = (req, res, next) => {
  res.cookie("runnerAuthToken", "", {
    httpOnly: true,
    expires: new Date(Date.now() + 10000),
  });

  res.status(200).json({
    status: "success",
    message: "Logged out",
  });
};

exports.protect = catchErrors(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.runnerAuthToken) {
    token = req.cookies.runnerAuthToken;
  }

  //   Check if user is logged in
  if (!token) return next(new constructError(403, "You are not logged in"));

  const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);

  const user = await User.findById(decodedToken.id);

  //   Check if user exists
  if (!user) return next(new constructError(404, "User not found!"));

  req.user = user;

  next();
});

exports.updateProfile = catchErrors(async (req, res, next) => {
  const {
    body: { firstName, lastName, email },
    user,
  } = req;

  if (!firstName && !lastName && !email) {
    return next(
      new constructError(
        400,
        "Please fill out some field you would like to update (First name, Last name, Email)"
      )
    );
  }

  user.firstName = firstName || user.firstName;
  user.lastName = lastName || user.lastName;
  user.email = email || user.email;

  await user.save();

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.updatePassword = catchErrors(async (req, res, next) => {
  const {
    body: { currentPassword, newPassword, confirmNewPassword },
    user,
  } = req;

  if (!currentPassword || !newPassword || !confirmNewPassword) {
    return next(new constructError(400, "Fill all details"));
  }

  if (!(await user.verifyPassword(user.password, currentPassword))) {
    return next(new constructError(400, "Password incorrect"));
  }

  user.password = newPassword;
  user.confirmPassword = confirmNewPassword;

  await user.save();

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.forgotPassword = catchErrors(async (req, res, next) => {
  const { email } = req.body;
  if (!email) return next(new constructError(400, "Please provide your email"));

  const user = await User.findOne({ email });
  if (!user) return next(new constructError(404, "User does not exist"));

  const token = user.createPasswordResetToken();

  await user.save();

  const emailOptions = {
    email: user.email,
    subject: "Runner Password Reset Token (Expires in 10 minutes)",
    message: `Your reset password token is ${token}`,
  };

  try {
    await sendEmail(emailOptions);
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new constructError(
        500,
        "An error occured, Email could not be sent, Please try again"
      )
    );
  }

  res.status(200).json({
    status: "success",
    message: "Token sent to email",
  });
});

exports.resetPassword = catchErrors(async (req, res, next) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;

  if (!password || !confirmPassword)
    return next(new constructError(400, "Please provide new password twice"));

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    passswordResetToken: hashedToken,
    passwordResetTokenExpires: { $gte: Date.now() },
  });

  if (!user)
    return next(new constructError(404, "Invalid token or Expired token"));

  user.password = password;
  user.confirmPassword = confirmPassword;
  user.passswordResetToken = undefined;
  user.passwordResetTokenExpires = undefined;
  await user.save();

  assignTokenToCookie(user, res, 200);
});
