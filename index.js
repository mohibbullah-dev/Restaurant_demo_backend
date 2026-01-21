import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "https://restaurant-demo-frontend-two.vercel.app/",
    credentials: true,
  }),
);
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ ok: true }));

// routes starts from here
import ordersRoutes from "./src/routes/orders.js";
import authRoutes from "./src/routes/auth.js";
import menuRoutes from "./src/routes/menu.js";
import settingsRoutes from "./src/routes/settings.js";
import adminRoutes from "./src/routes/admin.js";
import uploadRoutes from "./src/routes/upload.js";

app.use("/api/orders", ordersRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/upload", uploadRoutes);

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("DB connection failed:", err.message);
    process.exit(1);
  });
