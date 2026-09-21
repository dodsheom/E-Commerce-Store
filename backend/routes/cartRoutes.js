const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const cartController = require("../controllers/cartController");

// إضافة للسلة
router.post("/", auth, cartController.addToCart);

// زيادة الكمية
router.put("/increase/:productId", auth, cartController.increaseQty);

// نقصان الكمية
router.put("/decrease/:productId", auth, cartController.decreaseQty);

// عرض السلة
router.get("/", cartController.getCart);

// حذف منتج من السلة
router.delete("/:productId", auth, cartController.removeFromCart);

module.exports = router;
