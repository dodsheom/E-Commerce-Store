const express = require("express");
const router = express.Router();
const Product = require("../models/productModel");
const { body } = require("express-validator");

const auth = require("../middleware/auth");
const checkRole = require("../middleware/checkRole");

// عرض جميع المنتجات
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error loading products" });
  }
});

// إضافة منتج جديد (admin فقط)
router.post(
  "/",
  auth,
  checkRole("admin"),
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("price").isNumeric().withMessage("Price must be a number"),
  ],
  async (req, res) => {
    try {
      const { name, price, image } = req.body;

      const product = new Product({ name, price, image });
      await product.save();

      res.json({ message: "Product added", product });
    } catch (err) {
      res.status(500).json({ message: "Error adding product" });
    }
  }
);

// تعديل منتج (admin فقط)
router.put("/:id", auth, checkRole("admin"), async (req, res) => {
  try {
    const { name, price, image } = req.body;

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, image },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating product" });
  }
});

// حذف منتج (admin فقط)
router.delete("/:id", auth, checkRole("admin"), async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting product" });
  }
});
// عرض تفاصيل منتج معين
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(404).json({ message: "Product not found" });
  }
});

module.exports = router;
