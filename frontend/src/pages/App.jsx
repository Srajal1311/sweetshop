import React, { useEffect, useState } from "react";
import api, { setAuthToken } from "../api/client";
import { Link, useNavigate } from "react-router-dom";
import { getUserRole } from "../api/auth";

export default function App() {
  const [sweets, setSweets] = useState([]);
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  // 🔎 Search state
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const nav = useNavigate();

  // Fetch sweets
  async function loadSweets(query = {}) {
    try {
      let res;
      if (Object.keys(query).length > 0) {
        res = await api.get("/sweets/search", { params: query });
      } else {
        res = await api.get("/sweets");
      }
      setSweets(res.data);
    } catch (e) {
      setError("Failed to load sweets");
    }
  }

  // Handle purchase
  async function handlePurchase(id) {
    try {
      const res = await api.post(`/sweets/${id}/purchase`, { quantity: 1 });
      setSweets(sweets.map((s) => (s._id === id ? res.data : s)));
    } catch (e) {
      alert(e?.response?.data?.message || "Purchase failed");
    }
  }

  // Handle logout
  function logout() {
    localStorage.removeItem("token");
    setAuthToken(undefined);
    setLoggedIn(false);
    nav("/login");
  }

  // Handle search submit
  function handleSearch(e) {
    e.preventDefault();
    const query = {};
    if (name) query.q = name;
    if (category) query.category = category;
    if (minPrice) query.minPrice = minPrice;
    if (maxPrice) query.maxPrice = maxPrice;
    loadSweets(query);
  }

  useEffect(() => {
    const saved = localStorage.getItem("token");
    if (saved) {
      setAuthToken(saved);
      setLoggedIn(true);
    }
    loadSweets();
  }, []);
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100">
      {/* Navbar */}
      <nav className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-500 shadow-md p-4 flex justify-between items-center z-10">
        <h1
          onClick={() => nav("/")}
          className="text-2xl font-bold text-white cursor-pointer"
        >
          🍬 Sweet Shop
        </h1>
        <div className="space-x-4">
          {!loggedIn ? (
            <>
              <Link
                to="/login"
                className="text-white font-medium hover:underline"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-white font-medium hover:underline"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              {/* Show Admin Panel if role is admin */}
              {getUserRole()?.toLowerCase() === "admin" && (
                <Link
                  to="/admin"
                  className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-300 transition"
                >
                  Admin Panel
                </Link>
              )}

              {/* Show My Orders if role is user */}
              {getUserRole()?.toLowerCase() === "user" && (
                <Link
                  to="/orders"
                  className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600 transition"
                >
                  My Orders
                </Link>
              )}

              <button
                onClick={logout}
                className="bg-gray-900 text-white px-3 py-1 rounded hover:bg-gray-800 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Content */}
      <div className="container mx-auto p-6">
        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 bg-white shadow-lg p-6 rounded-xl"
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
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <input
            type="number"
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-400"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
          <button
            type="submit"
            className="col-span-2 md:col-span-4 bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition"
          >
            🔎 Search
          </button>
        </form>

        {/* Error */}
        {error && (
          <div className="text-red-600 mb-4 font-semibold">{error}</div>
        )}

        {/* Sweet List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sweets.map((s) => (
            <div
              key={s._id}
              className="bg-white rounded-2xl shadow-md p-5 flex flex-col justify-between hover:shadow-2xl transform hover:-translate-y-1 transition"
            >
              <div>
                <div className="w-full h-32 bg-gradient-to-br from-pink-200 to-purple-200 rounded-lg mb-4"></div>
                <h3 className="text-xl font-bold text-gray-800">{s.name}</h3>
                <span className="inline-block mt-1 px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded-full">
                  {s.category}
                </span>
                <p className="mt-3 text-gray-700 text-lg font-semibold">
                  ₹{s.price}
                </p>
                <p
                  className={`mt-1 text-sm font-medium ${
                    s.quantity > 50
                      ? "text-green-600"
                      : s.quantity <= 20
                      ? "text-red-600"
                      : "text-orange-600"
                  }`}
                >
                  Stock: {s.quantity}
                </p>
              </div>
              <button
                disabled={s.quantity <= 0 || !loggedIn}
                onClick={() => handlePurchase(s._id)}
                className={`mt-4 w-full py-2 rounded-lg font-semibold transition transform hover:scale-105 ${
                  s.quantity <= 0 || !loggedIn
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-pink-500 text-white hover:bg-pink-600"
                }`}
              >
                {s.quantity <= 0 ? "Out of Stock" : "Purchase"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
