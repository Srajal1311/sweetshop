import { Router } from "express";
import { authMiddleware, adminOnly } from "../middlewares/auth.js";
import * as controller from "../controllers/sweets.controller.js";

const router = Router();

// Public routes
router.get("/", controller.listSweets);
router.get("/search", controller.searchSweets);

// Admin-protected routes
router.post("/", authMiddleware, adminOnly, controller.createSweet);
router.put("/:id", authMiddleware, adminOnly, controller.updateSweet);
router.delete("/:id", authMiddleware, adminOnly, controller.deleteSweet);
router.post("/:id/restock", authMiddleware, adminOnly, controller.restockSweet);

// User-protected routes
router.post("/:id/purchase", authMiddleware, controller.purchaseSweet);

export default router;
