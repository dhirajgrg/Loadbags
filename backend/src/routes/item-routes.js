import { Router } from "express";

import Item from "../models/items-model.js";
import protect from "../middlewares/auth-middleware.js";

const router = Router();

router.post("/", protect, async (req, res) => {
  try {
    const { quantity, title, packed } = req.body;
    const item = await Item.create({
      quantity,
      title,
      packed,
      user: req.user._id,
    });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", protect, async (req, res) => {
  try {
    const items = await Item.find({ user: req.user._id });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", protect, async (req, res) => {
  try {
    const { quantity, title, packed } = req.body;
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { quantity, title, packed },
      { new: true },
    );
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", protect, async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/", protect, async (req, res) => {
  try {
    await Item.deleteMany({ user: req.user._id });
    res
      .status(200)
      .json({ message: "All items for this user deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/:id/toggle", protect, async (req, res) => {
  try {
    const existing = await Item.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ message: "Item not found" });
    }
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { packed: !existing.packed },
      { new: true },
    );
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
