import express from "express";
import MenuItem from "../models/MenuItem.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

// Public: get menu
router.get("/", async (req, res) => {
  const filter = {};
  if (req.query.featured === "true") filter.featured = true;
  const items = await MenuItem.find().sort({ category: 1, createdAt: -1 });
  res.json({ ok: true, items });
});

// Admin: create
router.post("/", requireAuth, async (req, res) => {
  const item = await MenuItem.create(req.body);
  res.status(201).json({ ok: true, item });
});

// Admin: update
router.put("/:id", requireAuth, async (req, res) => {
  const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!item) return res.status(404).json({ ok: false, message: "Not found" });
  res.json({ ok: true, item });
});

// Admin: delete
router.delete("/:id", requireAuth, async (req, res) => {
  const item = await MenuItem.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ ok: false, message: "Not found" });
  res.json({ ok: true });
});

export default router;
