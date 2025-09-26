import React, { useEffect, useState } from "react";
import api from "../api/client";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const [sweets, setSweets] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editQuantity, setEditQuantity] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const nav = useNavigate();

  async function loadSweets() {
    const res = await api.get("/sweets");
    setSweets(res.data);
  }

  async function addSweet(e) {
    e.preventDefault();
    await api.post("/sweets", {
      name,
      category,
      price: Number(price),
      quantity: Number(quantity),
    });
    setName("");
    setCategory("");
    setPrice("");
    setQuantity("");
    loadSweets();
  }

  async function deleteSweet(id) {
    if (!window.confirm("Delete this sweet?")) return;
    await api.delete(`/sweets/${id}`);
    loadSweets();
  }

  async function restockSweet(id) {
    const amount = Number(prompt("Enter restock amount:"));
    if (!amount) return;
    await api.post(`/sweets/${id}/restock`, { quantity: amount });
    loadSweets();
  }

  async function updateSweet(id) {
    await api.put(`/sweets/${id}`, {
      name: editName,
      category: editCategory,
      price: Number(editPrice),
      quantity: Number(editQuantity),
    });
    setEditingId(null);
    loadSweets();
  }

  useEffect(() => {
    loadSweets();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-purple-700 mb-8">
          🍬 Admin Panel
        </h1>

        {/* Add Sweet Form */}
        <form
          onSubmit={addSweet}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white shadow-lg p-6 rounded-xl mb-10"
        >
          <input
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-400"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-400"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <input
            type="number"
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-400"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="number"
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-400"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <button
            type="submit"
            className="col-span-2 md:col-span-4 bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition"
          >
            ➕ Add Sweet
          </button>
        </form>

        {/* Sweet List */}
        <ul className="space-y-4">
          {sweets.map((s) => (
            <li
              key={s._id}
              className="flex justify-between items-center bg-white shadow-md p-4 rounded-xl hover:shadow-xl transition"
            >
              {editingId === s._id ? (
                <div className="flex flex-wrap gap-2">
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="border rounded px-2 py-1"
                    placeholder="Name"
                  />
                  <input
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    className="border rounded px-2 py-1"
                    placeholder="Category"
                  />
                  <input
                    type="number"
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                    className="border rounded px-2 py-1 w-24"
                    placeholder="Price"
                  />
                  <input
                    type="number"
                    value={editQuantity}
                    onChange={(e) => setEditQuantity(e.target.value)}
                    className="border rounded px-2 py-1 w-20"
                    placeholder="Qty"
                  />
                  <button
                    onClick={() => updateSweet(s._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <span className="text-gray-800 font-medium">
                    <b>{s.name}</b> —{" "}
                    <span className="italic text-purple-600">{s.category}</span>{" "}
                    — ₹{s.price} — stock: {s.quantity}
                  </span>
                  <div className="space-x-2">
                    <button
                      onClick={() => {
                        setEditingId(s._id);
                        setEditName(s.name);
                        setEditCategory(s.category);
                        setEditPrice(s.price);
                        setEditQuantity(s.quantity);
                      }}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => restockSweet(s._id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Restock
                    </button>
                    <button
                      onClick={() => deleteSweet(s._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>

        {/* Back button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => nav("/")}
            className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            ⬅ Back to Shop
          </button>
        </div>
      </div>
    </div>
  );
}
