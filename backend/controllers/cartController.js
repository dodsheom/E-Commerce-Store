const Cart = require("../models/cartModel");

// إضافة منتج للسلة
exports.addToCart = async (req, res) => {
  const userId = req.user.userId;
  const { productId, quantity } = req.body;

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({ userId, items: [] });
  }

  // البحث عن المنتج داخل السلة
  const existingItem = cart.items.find(item => item.productId.toString() === productId);

  if (existingItem) {
    existingItem.quantity += quantity || 1;
  } else {
    cart.items.push({ productId, quantity: quantity || 1 });
  }

  await cart.save();

  res.json({
    message: "Item added to cart",
    cart
  });
};

// عرض السلة
exports.getCart = async (req, res) => {
  try {
    // إذا كان المستخدم غير مسجل دخول
    if (!req.user) {
      return res.json({ items: [] });
    }

    const cart = await Cart.findOne({ userId: req.user.id }).populate("items.productId");

    if (!cart) {
      return res.json({ items: [] });
    }

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Error loading cart" });
  }
};



// حذف منتج من السلة
exports.removeFromCart = async (req, res) => {
  const userId = req.user.userId;
  const { productId } = req.params;

  const cart = await Cart.findOne({ userId });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  cart.items = cart.items.filter(item => item.productId.toString() !== productId);

  await cart.save();

  res.json({
    message: "Item removed",
    cart
  });
};

// زيادة الكمية
exports.increaseQty = async (req, res) => {
  const userId = req.user.userId;
  const { productId } = req.params;

  const cart = await Cart.findOne({ userId });

  const item = cart.items.find(i => i.productId.toString() === productId);
  if (item) item.quantity += 1;

  await cart.save();
  res.json(cart);
};

// نقصان الكمية
exports.decreaseQty = async (req, res) => {
  const userId = req.user.userId;
  const { productId } = req.params;

  const cart = await Cart.findOne({ userId });

  const item = cart.items.find(i => i.productId.toString() === productId);
  if (item) {
    item.quantity -= 1;
    if (item.quantity <= 0) {
      cart.items = cart.items.filter(i => i.productId.toString() !== productId);
    }
  }

  await cart.save();
  res.json(cart);
};
