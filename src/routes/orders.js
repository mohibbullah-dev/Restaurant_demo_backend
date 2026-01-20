import express from "express";
import Order from "../models/Order.js";
import { adminAuth } from "../middleware/adminAuth.js";

const router = express.Router();

// Public: create order
router.post("/", async (req, res) => {
  try {
    const {
      customerName,
      customerPhone,
      orderType,
      address,
      notes,
      items,
      subtotal,
    } = req.body;

    if (!customerName || !customerPhone || !orderType) {
      return res
        .status(400)
        .json({ ok: false, message: "Missing required fields" });
    }
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ ok: false, message: "Cart is empty" });
    }
    if (orderType === "Delivery" && !address) {
      return res
        .status(400)
        .json({ ok: false, message: "Address required for delivery" });
    }

    const order = await Order.create({
      customerName,
      customerPhone,
      orderType,
      address: address || "",
      notes: notes || "",
      items,
      subtotal,
    });

    res.status(201).json({ ok: true, order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, message: "Server error" });
  }
});

// Admin: list orders (newest first)
router.get("/", adminAuth, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).limit(200);
    res.json({ ok: true, orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, message: "Server error" });
  }
});

// Admin: update status
router.patch("/:id/status", adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = [
      "New",
      "Confirmed",
      "Preparing",
      "Ready",
      "Completed",
      "Canceled",
    ];
    if (!allowed.includes(status)) {
      return res.status(400).json({ ok: false, message: "Invalid status" });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );

    if (!order)
      return res.status(404).json({ ok: false, message: "Not found" });

    res.json({ ok: true, order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, message: "Server error" });
  }
});

export default router;
