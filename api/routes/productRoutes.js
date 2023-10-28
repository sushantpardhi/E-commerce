const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProducts,
  deleteProduct,
  getSingleProduct,
} = require("../controller/productController");

const router = express.Router();

router.get("/product", getAllProducts);

router.get("/product/:id", getSingleProduct);

router.post("/product/new", createProduct);

router.put("/product/:id", updateProducts);

router.delete("/product/:id", deleteProduct);

module.exports = router;
