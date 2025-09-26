import express from "express";
import cors from "cors";
import authRoutes from "./src/routes/auth.routes.js";
import sweetsRoutes from "./src/routes/sweets.routes.js";
import ordersRoutes from "./src/routes/orders.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetsRoutes);
app.use("/api/orders", ordersRoutes);

app.get("/", (req, res) => res.json({ ok: true }));

export default app;
