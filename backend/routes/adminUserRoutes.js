const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const checkRole = require("../middleware/checkRole");
const adminUserController = require("../controllers/adminUserController");

// عرض جميع المستخدمين
router.get("/", auth, checkRole("admin"), adminUserController.getAllUsers);

// عرض مستخدم واحد
router.get("/:id", auth, checkRole("admin"), adminUserController.getUserById);

// تغيير دور المستخدم
router.put("/:id/role", auth, checkRole("admin"), adminUserController.updateUserRole);

// حذف مستخدم
router.delete("/:id", auth, checkRole("admin"), adminUserController.deleteUser);

module.exports = router;
