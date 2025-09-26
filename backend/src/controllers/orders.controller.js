import Order from "../models/Order.js";
import Sweet from "../models/Sweet.js";

// Get all orders for logged-in user
export async function listOrders(req, res) {
  const user = req.user; // set in auth middleware
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  try {
    const orders = await Order.find({ userId: user.id })
      .populate("sweet") // replaces Prisma include: { sweet: true }
      .sort({ createdAt: -1 });

    return res.json(orders);
  } catch (err) {
    console.error("listOrders error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}

// Cancel order
export async function deleteOrder(req, res) {
  const id = req.params.id;
  const user = req.user;

  try {
    const order = await Order.findById(id).populate("sweet");
    if (!order || order.userId.toString() !== user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    // Restore stock
    order.sweet.quantity += order.qty;
    await order.sweet.save();

    await Order.findByIdAndDelete(id);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: "Order not found" });
  }
}


// Update order quantity
export async function updateOrder(req, res) {
  const id = req.params.id;
  const { quantity } = req.body;
  const user = req.user;

  try {
    const order = await Order.findById(id).populate("sweet");
    if (!order || order.userId.toString() !== user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const sweet = order.sweet;

    // 🔑 Calculate the difference
    const diff = quantity - order.qty;

    if (diff > 0) {
      // User wants to increase order
      if (sweet.quantity < diff) {
        return res.status(400).json({ message: "Insufficient stock" });
      }
      sweet.quantity -= diff;
    } else if (diff < 0) {
      // User decreased order → restore stock
      sweet.quantity += Math.abs(diff);
    }

    await sweet.save();

    // Update order
    order.qty = quantity;
    order.total = quantity * sweet.price;

    const updated = await order.save();
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}
