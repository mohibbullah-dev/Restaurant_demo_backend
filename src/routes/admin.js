import express from "express";
import { requireAuth } from "../middleware/auth.js";
import Order from "../models/Order.js";
import MenuItem from "../models/MenuItem.js";

const router = express.Router();

const seedMenu = [
  {
    name: "Classic Burger",
    desc: "Beef patty, cheese, sauce.",
    price: 120,
    category: "Burgers",
    isVeg: false,
    available: true,
    featured: true,
  },
  {
    name: "Margherita Pizza",
    desc: "Mozzarella, basil.",
    price: 150,
    category: "Pizza",
    isVeg: true,
    available: true,
    featured: true,
  },
  {
    name: "Chicken Shawarma",
    desc: "Garlic sauce, pickles.",
    price: 95,
    category: "Shawarma",
    isVeg: false,
    available: true,
    featured: false,
  },
  {
    name: "Lemon Mint",
    desc: "Cold refreshing drink.",
    price: 45,
    category: "Drinks",
    isVeg: true,
    available: true,
    featured: true,
  },
];

router.post("/reset-demo", requireAuth, async (req, res) => {
  try {
    await Order.deleteMany({});
    await MenuItem.deleteMany({});
    await MenuItem.insertMany(seedMenu);

    res.json({ ok: true, message: "Demo reset complete" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, message: "Reset failed" });
  }
});

export default router;
