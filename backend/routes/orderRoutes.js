const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const checkRole = require("../middleware/checkRole");
const orderController = require("../controllers/orderController");

// إنشاء طلب
router.post("/", auth, orderController.createOrder);

// عرض طلباتي
router.get("/my", auth, orderController.getMyOrders);

// عرض جميع الطلبات (admin فقط)
router.get("/", auth, checkRole("admin"), orderController.getAllOrders);

// تغيير حالة الطلب (admin فقط)
router.put("/:id", auth, checkRole("admin"), orderController.updateOrderStatus);

module.exports = router;
