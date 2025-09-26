import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

import User from "./models/User.js";
import Sweet from "./models/Sweet.js";

dotenv.config();

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB for seeding");

    // 1. Clear existing data (optional, for clean seeding)
    await User.deleteMany({});
    await Sweet.deleteMany({});

    // 2. Create Admin user
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const adminUser = await User.create({
      name: "Admin",
      email: "admin@sweetshop.com",
      password: hashedPassword,
      role: "admin", // matches your User.js model
    });

    console.log(" Admin user created:", adminUser.email);

    // 3. Insert sample sweets
    const sweets = await Sweet.insertMany([
      { name: "Ladoo", category: "Indian", price: 50, quantity: 100 },
      { name: "Barfi", category: "Indian", price: 40, quantity: 80 },
      { name: "Jalebi", category: "Indian", price: 30, quantity: 120 },
    ]);

    console.log(" Sample sweets inserted:", sweets.map(s => s.name).join(", "));

    // Done
    console.log(" Seeding complete!");
    process.exit(0);
  } catch (err) {
    console.error(" Seeding error:", err);
    process.exit(1);
  }
}

seed();