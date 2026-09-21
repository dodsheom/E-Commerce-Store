const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");

exports.createOrder = async (req, res) => {
  const userId = req.user.userId;

  const cart = await Cart.findOne({ userId }).populate("items.partId");

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  let totalPrice = 0;

  cart.items.forEach(item => {
    totalPrice += item.partId.price * item.quantity;
  });

  const order = new Order({
    userId,
    items: cart.items.map(item => ({
      partId: item.partId._id,
      quantity: item.quantity
    })),
    totalPrice
  });

  await order.save();

  // تفريغ السلة بعد إنشاء الطلب
  cart.items = [];
  await cart.save();

  res.json({
    message: "Order created successfully",
    order
  });
};
// عرض جميع الطلبات للمستخدم
exports.getMyOrders = async (req, res) => {
  const userId = req.user.userId;

  const orders = await Order.find({ userId }).populate("items.partId");

  res.json(orders);
};
// عرض جميع الطلبات (admin فقط)
exports.getAllOrders = async (req, res) => {
  const orders = await Order.find().populate("items.partId userId");

  res.json(orders);
};
// تحديث حالة الطلب (admin فقط)
exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const order = await Order.findById(id);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  order.status = status;
  await order.save();

  res.json({
    message: "Order status updated",
    order
  });
};
