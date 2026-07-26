const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_MAX_LENGTH = 80;
const DETAILS_MAX_LENGTH = 2000;
const MIN_FORM_FILL_MS = 1500;

function normalizeText(value, maxLength) {
  if (typeof value !== 'string') return '';

  return value
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

function parseAllowedOrigins() {
  return (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
}

export default async function handler(req, res) {
  const allowedOrigins = parseAllowedOrigins();
  const origin = req.headers.origin || '';

  if (allowedOrigins.length > 0 && origin && !allowedOrigins.includes(origin)) {
    return res.status(403).json({ error: 'Forbidden: Origin verification failed' });
  }
  
  res.setHeader('Access-Control-Allow-Origin', origin || '*');
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!req.headers['content-type']?.includes('application/json')) {
    return res.status(415).json({ error: 'Content-Type must be application/json' });
  }

  try {
    const body = req.body && typeof req.body === 'object' ? req.body : {};
    const name = normalizeText(body.name, NAME_MAX_LENGTH);
    const email = normalizeText(body.email, 160).toLowerCase();
    const projectDetails = normalizeText(body.details || body.description || body.message || '', DETAILS_MAX_LENGTH);
    const honeypot = normalizeText(body.website, 120);
    const submittedAt = Number(body.submittedAt);

    if (honeypot) {
      return res.status(400).json({ error: 'Spam submission rejected' });
    }

    if (!Number.isFinite(submittedAt) || Date.now() - submittedAt < MIN_FORM_FILL_MS) {
      return res.status(400).json({ error: 'Submission could not be verified' });
    }

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required.' });
    }

    if (name.length < 2) {
      return res.status(400).json({ error: 'Please enter your full name.' });
    }

    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }

    if (!projectDetails || projectDetails.length < 20) {
      return res.status(400).json({ error: 'Please share a few more project details.' });
    }

    const googleSheetsUrl = process.env.GOOGLE_SHEETS_URL;

    if (!googleSheetsUrl) {
      console.error('Missing GOOGLE_SHEETS_URL environment variable');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const formDataObj = new URLSearchParams();
    formDataObj.append('Name', name);
    formDataObj.append('name', name);
    formDataObj.append('Email', email);
    formDataObj.append('email', email);
    formDataObj.append('Details', projectDetails);
    formDataObj.append('details', projectDetails);
    formDataObj.append('Description', projectDetails);
    formDataObj.append('description', projectDetails);
    formDataObj.append('Message', projectDetails);
    formDataObj.append('message', projectDetails);

    const sheetResponse = await fetch(googleSheetsUrl, {
      method: 'POST',
      body: formDataObj,
      headers: {
        Accept: 'application/json, text/plain, */*',
      },
    });

    if (!sheetResponse.ok) {
      throw new Error(`Failed to forward to Google Sheets: ${sheetResponse.status}`);
    }

    return res.status(200).json({ success: true, message: 'Lead captured successfully.' });
  } catch (error) {
    console.error('Backend Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
