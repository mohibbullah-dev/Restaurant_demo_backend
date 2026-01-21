import mongoose from "mongoose";

const SettingsSchema = new mongoose.Schema(
  {
    isOpen: { type: Boolean, default: true },
    notice: { type: String, default: "" }, // e.g. "Closed for maintenance"
    deliveryFee: { type: Number, default: 0 },
    minimumOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default mongoose.model("Settings", SettingsSchema);
