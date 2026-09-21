const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const { validationResult } = require("express-validator");

// تسجيل مستخدم جديد
exports.register = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    email,
    password: hashedPassword,
    role: role || "user"
  });

  await user.save();

  res.json({
    message: "User registered successfully",
    user
  });
};



// تسجيل الدخول

exports.login = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Incorrect password" });
  }

  // إنشاء Token
  const token = jwt.sign(
  { userId: user._id, email: user.email, role: user.role },
  "SECRET_KEY",
  { expiresIn: "1h" }
);


  res.json({
    message: "Login successful",
    token,
    user
  });
};

