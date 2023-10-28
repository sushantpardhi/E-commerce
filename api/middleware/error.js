//  -- Error Handling for all the server errors

const ErrorHandler = require("../utils/errorHandle");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  err.message = err.message || "Internal Server Error";

  //Wrong MongoDb Error

  if (err.name === "CastError") {
    const message = `Resource not found. Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  //this is what we would use to log error in all places, so we created a class to handle all the errors and pass the message and status here
  res
    .status(err.statusCode)
    .json({ success: false, error: err.statusCode, message: err.message });
};
