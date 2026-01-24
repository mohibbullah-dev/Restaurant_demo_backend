import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  isApproved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Review = mongoose.model("Review", ReviewSchema);
export default Review; // Proper ES Module export
