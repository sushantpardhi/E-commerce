const userModel = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandle");
const catchAsyncError = require("../middleware/catchAsyncErrors");

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

  const token = user.getJWTToken();

  res.status(201).json({ success: true, user, token });
});
