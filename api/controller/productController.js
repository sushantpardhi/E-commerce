const productModel = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandle");
const catchAsyncError = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");

//Create Product  --- Admin
exports.createProduct = catchAsyncError(async (req, res, next) => {
  //create product
  const product = await productModel.create(req.body);

  //log product
  res.status(200).json({ success: true, product });
});

//get All products
exports.getAllProducts = catchAsyncError(async (req, res) => {
  const resultPerPage = 5; // Number of products to be shown per page

  const productCount = await productModel.countDocuments(); //Getting product count

  //Fetching query to find specific product using search
  const apiFeature = new ApiFeatures(productModel.find(), req.query)
    //adding the features to our api from the class ApiFeatures
    .search()
    .filter()
    .pagination(resultPerPage);

  //find Product using the class ApiFeature
  const products = await apiFeature.query;

  //log product
  res.status(200).json({ success: true, products, productCount });
});

//update Products  --- Admin
exports.updateProducts = catchAsyncError(async (req, res, next) => {
  //find Product
  let product = await productModel.findById(req.params.id);

  //Check if product exist
  if (!product) return next(new ErrorHandler("Product not Found", 404));

  //Update product
  product = await productModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndmodify: false,
  });

  //log product
  res.status(200).json({ success: true, product });
});

//Delete Product  --- Admin
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  //find Product
  const product = await productModel.findById(req.params.id);

  //Check if product exist
  if (!product) return next(new ErrorHandler("Product not Found", 404));

  //Delete Product
  await product.deleteOne();

  //log product
  res.status(200).json({ success: true, message: "Product Deleted" });
});

// Get single Product
exports.getSingleProduct = catchAsyncError(async (req, res, next) => {
  //find Product
  const product = await productModel.findById(req.params.id);

  //Check if product exist
  if (!product) return next(new ErrorHandler("Product not Found", 404));

  //log product
  res.status(200).json({ success: true, product });
});
