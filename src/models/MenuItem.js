import mongoose from "mongoose";

const MenuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    desc: { type: String, default: "" },
    price: { type: Number, required: true },
    category: { type: String, required: true },

    isVeg: { type: Boolean, default: false },
    available: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },

    // imageUrl: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
    imagePublicId: { type: String, default: "" },
  },
  { timestamps: true },
);

export default mongoose.model("MenuItem", MenuItemSchema);
