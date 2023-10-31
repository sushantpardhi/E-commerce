const userModel = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandle");
const catchAsyncError = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");

//Register User
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await userModel.create({
    name,
    email,
    password,
    avatar: {
      public_Id: "this is sample Id",
      url: "this is sample url",
    },
  });

  sendToken(user, 201, res);
});

//Login User
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  //Checking if user has given email and password
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email and Password", 400));
  }

  //Finding usre with the given email
  const user = await userModel.findOne({ email }).select("+password");

  //checking if user with email exists
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  //checking for password
  const isPasswordMatched = user.comparePassword(password);

  //if password is wrong
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});

//Logout
exports.logout = catchAsyncError(async (req, res, next) => {
  //clearing the Token cookie
  res.clearCookie("token");

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});
