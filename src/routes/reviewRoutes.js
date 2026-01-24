import express from "express";
const router = express.Router();
import Review from "../models/Review.js"; // Ensure the .js extension is there

// PUBLIC: Get only approved reviews
router.get("/approved", async (req, res) => {
  try {
    const reviews = await Review.find({ isApproved: true }).sort({
      createdAt: -1,
    });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUBLIC: Submit a new review
router.post("/", async (req, res) => {
  try {
    const newReview = new Review(req.body);
    await newReview.save();
    res.status(201).json({ message: "Review submitted for moderation." });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ADMIN: Get ALL reviews (to moderate)
router.get("/admin/all", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ADMIN: Toggle Approval
router.patch("/admin/approve/:id", async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    review.isApproved = !review.isApproved;
    await review.save();
    res.json(review);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ADMIN: Delete Review
router.delete("/admin/:id", async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: "Review deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router; // Use export default instead of module.exports
