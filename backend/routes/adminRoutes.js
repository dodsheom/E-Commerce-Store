const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const Product = require("../models/productModel");

// جلب كل المنتجات للوحة التحكم
router.get("/products", auth, admin, async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

module.exports = router;
