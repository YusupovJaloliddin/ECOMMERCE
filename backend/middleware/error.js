const ErrorHandler = require("../utils/errorhendler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //Wrong MongoDB id error
  if (err.name === "CastError") {
    const message = `Resource not found.Invalid:${err.path}`;
    err = new ErrorHandler(message, 400);
  }
  //Mongoose  duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }
  //Wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `Json web token is invalid ,try again`;
    err = new ErrorHandler(message, 400);
  }
  // JWT EXpire error
  if (err.name === "TokenExpiredError") {
    const message = `Json web token is Expire ,try again`;
    err = new ErrorHandler(message, 400);
  }
  res.status(res.statusCode).json({
    succces: false,
    message: err.message,
  });
};
