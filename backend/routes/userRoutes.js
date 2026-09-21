const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { body } = require("express-validator");

// تسجيل مستخدم جديد
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 4 }).withMessage("Password must be at least 4 characters")
  ],
  userController.register
);

// تسجيل الدخول
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required")
  ],
  userController.login
);

module.exports = router;
