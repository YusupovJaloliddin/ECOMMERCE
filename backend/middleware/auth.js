const catchAsyncError = require("./catchAsyncError");
const ErrorHandler = require("../utils/errorhendler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModal");

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please Login to acces this resouce", 401));
  }
  const decodedDate = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedDate.id);
  next();
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to acces this resouce`,
          403
        )
      );
    }
    next();
  };
};
