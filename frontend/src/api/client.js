import axios from "axios";

const api = axios.create({
  baseURL: "https://ss-backend-deploy-1.onrender.com/api",
});

export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
}

// ✅ Auto-load token from localStorage if available
const saved = localStorage.getItem("token");
if (saved) {
  setAuthToken(saved);
}

export default api;
