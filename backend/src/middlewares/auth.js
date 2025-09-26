import jwt from "jsonwebtoken";

// Authentication middleware
export function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = header.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || "devsecret");
    req.user = payload; // attach payload to request
    return next();
  } catch (err) {
    console.error("authMiddleware error:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

// Admin-only middleware
export function adminOnly(req, res, next) {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  if (user.role !== "admin") {
  return res.status(403).json({ message: "Admin only" });
}
  return next();
}
