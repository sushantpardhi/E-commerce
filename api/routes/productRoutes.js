const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProducts,
  deleteProduct,
  getSingleProduct,
} = require("../controller/productController");
const {
  isauthenticatedUser,
  autherisedRoles,
} = require("../middleware/authentication");

const router = express.Router();

router.get("/product", getAllProducts);

router.get("/product/:id", getSingleProduct);

router.post(
  "/product/new",
  isauthenticatedUser,
  autherisedRoles("Admin"),
  createProduct
);

router.put(
  "/product/:id",
  isauthenticatedUser,
  autherisedRoles("Admin"),
  updateProducts
);

router.delete(
  "/product/:id",
  isauthenticatedUser,
  autherisedRoles("Admin"),
  deleteProduct
);

module.exports = router;
