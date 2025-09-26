import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
                                                                                                  //
import App from "./pages/App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import Orders from "./pages/Orders";

import { getUserRole } from "./api/auth"; // decode role from JWT

// ✅ Check if user is logged in
const isLoggedIn = () => !!localStorage.getItem("token");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin route (protected) */}
        <Route
          path="/admin"
          element={
            isLoggedIn() && getUserRole()?.toLowerCase() === "admin" ? (
              <Admin />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* Orders route (protected) */}
        <Route
          path="/orders"
          element={
            isLoggedIn() ? <Orders /> : <Navigate to="/login" replace />
          }
        />

        {/* Catch-all route */}
        <Route
          path="*"
          element={
            <div className="p-6 text-center text-red-600 text-xl font-bold">
              🚫 Page Not Found
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
