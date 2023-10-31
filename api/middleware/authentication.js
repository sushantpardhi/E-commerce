const userModel = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandle");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");

//checking for authenticated user
exports.isauthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  //getting token from cookie
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login to access this route", 401));
  }

  //decoding data from token that is User Id
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  //finding user from decoded data i.e. user Id
  req.user = await userModel.findById(decodedData.id);

  next();
});

exports.autherisedRoles = (...roles) => {
  return (req, res, next) => {
    //checking if the user is the required role to access the particular route
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role : ${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }

    next();
  };
};
