const Part = require("../models/productModel");
const { validationResult } = require("express-validator");

exports.getAllProducts = async (req, res) => {
  try {
    const parts = await Part.find();
    res.json(parts);
  } catch (err) {
    res.status(500).json({ message: "Error loading parts" });
  }
};


exports.addPart = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const part = new Part({
    name: req.body.name,
    price: req.body.price
  });

  await part.save();

  res.json({
    message: "Part added successfully",
    part
  });
};
//Update Part
exports.updatePart = async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;

  try {
    const part = await Part.findByIdAndUpdate(
      id,
      { name, price },
      { new: true }
    );

    if (!part) {
      return res.status(404).json({ message: "Part not found" });
    }

    res.json({
      message: "Part updated successfully",
      part
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
//delete Part
exports.deletePart = async (req, res) => {
  const { id } = req.params;

  try {
    const part = await Part.findByIdAndDelete(id);

    if (!part) {
      return res.status(404).json({ message: "Part not found" });
    }

    res.json({ message: "Part deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
