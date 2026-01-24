import express from "express";
import Reservation from "../models/Reservation.js";
const router = express.Router();

// Submit a new reservation
router.post("/", async (req, res) => {
  try {
    const newBooking = new Reservation(req.body);
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Admin: Get all reservations
router.get("/admin/all", async (req, res) => {
  try {
    const bookings = await Reservation.find().sort({ date: 1, time: 1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ADMIN: Delete Reservation
router.delete("/admin/:id", async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    res.json({ message: "Reservation removed" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
