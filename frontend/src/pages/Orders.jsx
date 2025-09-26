import React, { useEffect, useState } from "react";
import api from "../api/client";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  async function loadOrders() {
    try {
      setLoading(true);
      const res = await api.get("/orders");
      setOrders(res.data);
    } catch (e) {
      console.error("❌ Failed to load orders", e);
    } finally {
      setLoading(false);
    }
  }

  async function updateOrder(id, currentQty) {
    const newQty = Number(prompt("Enter new quantity:", currentQty));
    if (!newQty || newQty <= 0) return;
    await api.put(`/orders/${id}`, { quantity: newQty });
    loadOrders();
  }

  async function cancelOrder(id) {
    if (!window.confirm("Cancel this order?")) return;
    await api.delete(`/orders/${id}`);
    loadOrders();
  }

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-extrabold mb-8 text-center text-purple-700">
          🧾 My Orders
        </h1>

        {/* Loader */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-purple-600"></div>
          </div>
        ) : orders.length === 0 ? (
          <p className="text-gray-600 text-center bg-white shadow-md p-6 rounded-xl">
            No orders yet. Go grab some sweets! 🍬
          </p>
        ) : (
          <ul className="space-y-4">
            {orders.map((o) => (
              <li
                key={o._id}
                className="bg-white rounded-2xl shadow-md p-5 flex flex-col sm:flex-row justify-between sm:items-center hover:shadow-xl transform hover:-translate-y-1 transition"
              >
                <div className="mb-3 sm:mb-0">
                  <h3 className="text-xl font-bold text-gray-800">
                    {o.sweet?.name}
                  </h3>
                  <p className="text-sm text-purple-600 font-medium">
                    {o.sweet?.category} | ₹{o.sweet?.price} each
                  </p>
                  <p className="mt-2 text-gray-700">
                    Qty: <b>{o.qty}</b> — Total:{" "}
                    <span className="font-semibold text-pink-600">
                      ₹{o.total}
                    </span>
                  </p>
                  <p className="text-xs text-gray-400">
                    Ordered on {new Date(o.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => updateOrder(o._id, o.qty)}
                    className="bg-yellow-400 text-black px-3 py-1 rounded-lg hover:bg-yellow-500 transition"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => cancelOrder(o._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                  >
                    ❌ Cancel
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Back Button */}
        <div className="text-center mt-10">
          <button
            onClick={() => nav("/")}
            className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-2 rounded-full shadow-md hover:from-purple-700 hover:to-pink-600 transition"
          >
            ⬅ Back to Shop
          </button>
        </div>
      </div>
    </div>
  );
}
