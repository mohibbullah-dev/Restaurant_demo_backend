import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema({
  guestName: { type: String, required: true },
  phone: { type: String, required: true },
  guests: { type: Number, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  occasion: { type: String }, // e.g., Birthday, Anniversary
  status: { type: String, default: "Pending" }, // Pending, Confirmed, Cancelled
  createdAt: { type: Date, default: Date.now },
});

const Reservation = mongoose.model("Reservation", ReservationSchema);
export default Reservation;
