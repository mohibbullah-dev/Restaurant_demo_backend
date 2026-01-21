import express from "express";
import Settings from "../models/Settings.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

async function getSingleton() {
  let s = await Settings.findOne();
  if (!s) s = await Settings.create({}); // ✅ let defaults handle all fields
  return s;
}

// Public: get settings
router.get("/", async (req, res) => {
  const s = await getSingleton();
  res.json({ ok: true, settings: s });
});

// Admin: update settings
router.put("/", requireAuth, async (req, res) => {
  const { isOpen, notice, deliveryFee, minimumOrder } = req.body;

  const settings = await getSingleton();

  settings.isOpen = isOpen ?? settings.isOpen;
  settings.notice = notice ?? settings.notice;
  settings.deliveryFee = Number(deliveryFee) || 0;
  settings.minimumOrder = Number(minimumOrder) || 0;

  await settings.save();
  res.json({ ok: true, settings });
});

export default router;
