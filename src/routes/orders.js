import express from "express";
import Order from "../models/Order.js";
import { requireAuth } from "../middleware/auth.js";
import mongoose from "mongoose";

const router = express.Router();

// 1. PUBLIC: GET ONE ORDER BY ID (This was missing!)
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Check if ID is a valid format to prevent server crash
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ ok: false, message: "Invalid ID Format" });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ ok: false, message: "Order not found" });
    }

    // Returns the order in the format the frontend expects: { ok: true, order }
    res.json({ ok: true, order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, message: "Server error" });
  }
});

// 2. Public: Create order
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

// 3. Admin: list orders
router.get("/", requireAuth, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).limit(200);
    res.json({ ok: true, orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, message: "Server error" });
  }
});

// 4. Admin: update status
router.patch("/:id/status", requireAuth, async (req, res) => {
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
