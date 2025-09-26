import Sweet from "../models/Sweet.js";
import Order from "../models/Order.js";

// Get all sweets
export async function listSweets(req, res) {
  try {
    const sweets = await Sweet.find();
    return res.json(sweets);
  } catch (err) {
    console.error("listSweets error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}

// Search sweets
export async function searchSweets(req, res) {
  try {
    const { q, category, minPrice, maxPrice } = req.query;

    const query = {};
    if (q) query.name = { $regex: q, $options: "i" };
    if (category) query.category = { $regex: category, $options: "i" };
    if (minPrice) query.price = { ...query.price, $gte: Number(minPrice) };
    if (maxPrice) query.price = { ...query.price, $lte: Number(maxPrice) };

    const sweets = await Sweet.find(query);
    return res.json(sweets);
  } catch (err) {
    console.error("searchSweets error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// Create sweet
export async function createSweet(req, res) {
  try {
    const { name, category, price, quantity } = req.body;
    if (!name || !category || price == null || quantity == null) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const sweet = await Sweet.create({
      name,
      category,
      price: Number(price),
      quantity: Number(quantity),
    });

    return res.status(201).json(sweet);
  } catch (err) {
    console.error("createSweet error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}

// Update sweet
export async function updateSweet(req, res) {
  try {
    const id = req.params.id;
    const data = req.body;

    const sweet = await Sweet.findByIdAndUpdate(id, data, { new: true });
    if (!sweet) return res.status(404).json({ message: "Not found" });

    return res.json(sweet);
  } catch (err) {
    console.error("updateSweet error:", err);
    return res.status(404).json({ message: "Not found" });
  }
}

// Delete sweet
export async function deleteSweet(req, res) {
  try {
    const id = req.params.id;
    await Sweet.findByIdAndDelete(id);
    return res.status(204).send();
  } catch (err) {
    console.error("deleteSweet error:", err);
    return res.status(404).json({ message: "Not found" });
  }
}

// Purchase sweet
export async function purchaseSweet(req, res) {
  try {
    const id = req.params.id;
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    const sweet = await Sweet.findById(id);
    if (!sweet) return res.status(404).json({ message: "Not found" });
    if (sweet.quantity < quantity) {
      return res.status(400).json({ message: "Insufficient stock" });
    }

    // Update stock
    sweet.quantity -= quantity;
    await sweet.save();

    // Record order if user logged in
    const user = req.user;
    if (user && user.id) {
      await Order.create({
        userId: user.id,
        sweet: sweet._id,
        qty: quantity,
        total: quantity * sweet.price,
      });
    }

    return res.json(sweet);
  } catch (err) {
    console.error("purchaseSweet error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}

// Restock sweet
export async function restockSweet(req, res) {
  try {
    const id = req.params.id;
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    const sweet = await Sweet.findById(id);
    if (!sweet) return res.status(404).json({ message: "Not found" });

    sweet.quantity += Number(quantity);
    await sweet.save();

    return res.json(sweet);
  } catch (err) {
    console.error("restockSweet error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}
