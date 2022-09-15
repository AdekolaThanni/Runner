const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
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
