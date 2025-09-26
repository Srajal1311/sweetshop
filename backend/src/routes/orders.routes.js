import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.js";
import * as controller from "../controllers/orders.controller.js";

const router = Router();

// Order routes
router.get("/", authMiddleware, controller.listOrders);
router.put("/:id", authMiddleware, controller.updateOrder);
router.delete("/:id", authMiddleware, controller.deleteOrder);

export default router;
