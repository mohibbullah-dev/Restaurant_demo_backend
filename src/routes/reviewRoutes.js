const router = require("express").Router();
const Review = require("../models/Review");

// PUBLIC: Get only approved reviews
router.get("/approved", async (req, res) => {
  const reviews = await Review.find({ isApproved: true }).sort({
    createdAt: -1,
  });
  res.json(reviews);
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
  const reviews = await Review.find().sort({ createdAt: -1 });
  res.json(reviews);
});

// ADMIN: Toggle Approval
router.patch("/admin/approve/:id", async (req, res) => {
  const review = await Review.findById(req.params.id);
  review.isApproved = !review.isApproved;
  await review.save();
  res.json(review);
});

// ADMIN: Delete Review
router.delete("/admin/:id", async (req, res) => {
  await Review.findByIdAndDelete(req.params.id);
  res.json({ message: "Review deleted" });
});

module.exports = router;
