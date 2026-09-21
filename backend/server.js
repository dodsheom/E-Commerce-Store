const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const mongoose = require("mongoose");

// مسارات المنتجات
const productRoutes = require("./routes/productRoutes");
app.use("/products", productRoutes);

// مسارات المستخدمين
const userRoutes = require("./routes/userRoutes");
app.use("/users", userRoutes);

// مسارات الطلبات
const orderRoutes = require("./routes/orderRoutes");
app.use("/orders", orderRoutes);

// مسارات السلة
const cartRoutes = require("./routes/cartRoutes");
app.use("/cart", cartRoutes);

// مسارات لوحة التحكم
const adminUserRoutes = require("./routes/adminUserRoutes");
app.use("/admin/users", adminUserRoutes);

//مسارات تحكم الادمن
const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);

// اتصال MongoDB Atlas
mongoose.connect("mongodb+srv://dodshoem_db_user:Ff0YYm95QCmySGzn@cluster0.9k5r3pn.mongodb.net/partsDB")
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.log(err));

// تشغيل السيرفر
app.listen(3000, () => {
  console.log("API is running on http://localhost:3000");
});
