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
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const GOOGLE_SHEETS_URL = process.env.GOOGLE_SHEETS_URL;

    if (!GOOGLE_SHEETS_URL) {
      console.error("Missing GOOGLE_SHEETS_URL environment variable");
      return res.status(500).json({ error: "Server configuration error" });
    }

    const formDataObj = new URLSearchParams();
    formDataObj.append('Name', name);
    formDataObj.append('Email', email);

    const sheetResponse = await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      body: formDataObj
    });

    if (!sheetResponse.ok) {
      throw new Error('Failed to forward to Google Sheets');
    }

    return res.status(200).json({ success: true, message: "Lead captured successfully." });
  } catch (error) {
    console.error("Backend Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
