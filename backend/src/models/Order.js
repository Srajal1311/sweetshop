import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sweet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sweet",
      required: true,
    },
    qty: { type: Number, required: true, min: 1 },
    total: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);