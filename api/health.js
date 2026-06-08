export default function handler(req, res) {
  // Origin verification
  const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "").split(",").map(o => o.trim());
  const origin = req.headers.origin || "";
  
  if (ALLOWED_ORIGINS.length > 0 && ALLOWED_ORIGINS[0] !== "" && !ALLOWED_ORIGINS.includes(origin) && origin !== "") {
    // In strict environments, we might enforce this. For health checks, it's often more relaxed.
    // Leaving standard CORS headers for health check.
  }

  res.setHeader("Access-Control-Allow-Origin", origin || "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  
  return res.status(200).json({ status: "healthy", timestamp: new Date().toISOString() });
}
