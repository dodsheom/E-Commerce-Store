const User = require("../models/userModel");
// عرض جميع المستخدمين (admin فقط)
exports.getAllUsers = async (req, res) => {
  const users = await User.find().select("-password"); // بدون كلمة المرور
  res.json(users);
};
//عرض مستخدم واحد
exports.getUserById = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id).select("-password");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
};
// تحديث دور المستخدم (admin فقط)
exports.updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.role = role;
  await user.save();

  res.json({
    message: "User role updated",
    user
  });
};
// حذف مستخدم (admin فقط)
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findByIdAndDelete(id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ message: "User deleted successfully" });
};

