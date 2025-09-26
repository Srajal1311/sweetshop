import { jwtDecode } from "jwt-decode";

// 🔹 Get user role from stored JWT
export function getUserRole() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token); // no typing needed in JS
    return decoded.role || null;
  } catch (err) {
    console.error("getUserRole error:", err);
    return null;
  }
}
