export default async function handler(req, res) {
  // CORS & Origin Verification (Task 6E.11)
  const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "").split(",").map(o => o.trim());
  const origin = req.headers.origin || "";

  if (ALLOWED_ORIGINS.length > 0 && ALLOWED_ORIGINS[0] !== "" && origin !== "") {
    if (!ALLOWED_ORIGINS.includes(origin)) {
      return res.status(403).json({ error: "Forbidden: Origin Verification Failed" });
    }
  }
  
  res.setHeader("Access-Control-Allow-Origin", origin || "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, scope, budget } = req.body;

    if (!name || !email || !scope || !budget) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    // In a real implementation, we would route this to SendGrid or Notion
    // based on process.env.LEAD_STORAGE_MODE
    console.log("Lead received:", { name, email, scope, budget });
    
    // Simulate async processing
    await new Promise(resolve => setTimeout(resolve, 1000));

    return res.status(200).json({ success: true, message: "Lead captured successfully." });
  } catch (error) {
    console.error("Backend Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
