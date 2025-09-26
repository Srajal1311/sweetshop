import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import ordersRoutes from "./src/routes/orders.routes.js";
import authRoutes from "./src/routes/auth.routes.js";
import sweetsRoutes from "./src/routes/sweets.routes.js";

dotenv.config();

const app = express();

// ✅ Enable CORS for frontend
app.use(
  cors({
    origin: "http://localhost:5173", // allow frontend dev server
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/orders", ordersRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetsRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });
