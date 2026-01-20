import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true }, // frontend item id
    name: { type: String, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, required: true },
  },
  { _id: false },
);

const OrderSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    customerPhone: { type: String, required: true },
    orderType: {
      type: String,
      enum: ["Pickup", "Delivery", "Dine-in"],
      required: true,
    },
    address: { type: String, default: "" },
    notes: { type: String, default: "" },

    items: { type: [OrderItemSchema], required: true },
    subtotal: { type: Number, required: true },

    status: {
      type: String,
      enum: ["New", "Confirmed", "Preparing", "Ready", "Completed", "Canceled"],
      default: "New",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Order", OrderSchema);
