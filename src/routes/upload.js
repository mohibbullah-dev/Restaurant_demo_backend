import express from "express";
import cloudinary from "../config/cloudinary.js";
import { requireAuth } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

// helper: upload buffer to cloudinary
function uploadToCloudinary(buffer, options = {}) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(options, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
    stream.end(buffer);
  });
}

// Admin: upload an image
router.post("/image", requireAuth, upload.single("image"), async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ ok: false, message: "No file" });

    const result = await uploadToCloudinary(req.file.buffer, {
      folder: "restaurant-demo/menu", // change per client
      resource_type: "image",
    });

    res.json({
      ok: true,
      imageUrl: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, message: "Upload failed" });
  }
});

// Admin: delete image by publicId (optional but recommended)
router.delete("/image", requireAuth, async (req, res) => {
  try {
    const { publicId } = req.body;
    if (!publicId)
      return res.status(400).json({ ok: false, message: "publicId required" });

    await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, message: "Delete failed" });
  }
});

export default router;
