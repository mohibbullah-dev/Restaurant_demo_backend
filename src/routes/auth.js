import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

// One-time: hash env password on the fly and compare securely
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ ok: false, message: "Missing fields" });

    if (email !== process.env.ADMIN_EMAIL)
      return res
        .status(401)
        .json({ ok: false, message: "Invalid credentials" });

    // Compare password with env password
    // We hash the env password to avoid plain comparison
    const envPass = process.env.ADMIN_PASSWORD || "";
    const envHash = await bcrypt.hash(envPass, 10);
    const ok = await bcrypt.compare(password, envHash);

    if (!ok)
      return res
        .status(401)
        .json({ ok: false, message: "Invalid credentials" });

    const token = jwt.sign({ role: "admin", email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ ok: true, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, message: "Server error" });
  }
});

export default router;
