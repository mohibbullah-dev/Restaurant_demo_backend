import express from "express";
import Settings from "../models/Settings.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

async function getSingleton() {
  let s = await Settings.findOne();
  if (!s) s = await Settings.create({ isOpen: true, notice: "" });
  return s;
}

// Public: get settings
router.get("/", async (req, res) => {
  const s = await getSingleton();
  res.json({ ok: true, settings: s });
});

// Admin: update settings
router.put("/", requireAuth, async (req, res) => {
  const s = await getSingleton();
  s.isOpen = typeof req.body.isOpen === "boolean" ? req.body.isOpen : s.isOpen;
  s.notice = typeof req.body.notice === "string" ? req.body.notice : s.notice;
  await s.save();
  res.json({ ok: true, settings: s });
});

export default router;
