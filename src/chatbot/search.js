// src/chatbot/search.js
// Client-side normalized search and typo-tolerant matcher against kb.js

import { kb, fallback, chips } from './kb.js';

export function normalize(str) {
  if (typeof str !== 'string') return '';
  return str
    .toLowerCase()
    .replace(/['\u2019]s\b/g, '')
    .replace(/['\u2019]t\b/g, 't')
    .replace(/['\u2019]re\b/g, '')
    .replace(/['\u2019]ve\b/g, '')
    .replace(/['\u2019]ll\b/g, '')
    .replace(/['\u2019]m\b/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

export function levenshtein(a, b) {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = i;
    for (let j = 1; j <= b.length; j++) {
      const val = a[i - 1] === b[j - 1] ? row[j - 1] : Math.min(row[j - 1], prev, row[j]) + 1;
      row[j - 1] = prev;
      prev = val;
    }
    row[b.length] = prev;
  }
  return row[b.length];
}

export function isWordMatch(w1, w2) {
  if (w1 === w2) return 1.0;
  const maxLen = Math.max(w1.length, w2.length);
  if (maxLen <= 3) return 0;
  const dist = levenshtein(w1, w2);
  if (maxLen <= 7 && dist <= 1) return 0.85;
  if (maxLen > 7 && dist <= 2) return 0.8;
  return 0;
}

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been',
  'do', 'does', 'did', 'to', 'for', 'in', 'on', 'at', 'by',
  'with', 'about', 'of', 'and', 'or', 'so', 'can', 'could',
  'would', 'should', 'i', 'you', 'your', 'my', 'we', 'our',
  'he', 'his', 'she', 'her', 'it', 'its', 'they', 'them',
  'me', 'please', 'tell', 'what', 'whats', 'how', 'hows', 's', 'd', 'm', 't'
]);

export function scoreQueryAgainstPhrase(queryNorm, qVariantNorm) {
  if (queryNorm === qVariantNorm) return 1.0;

  const qTokens = queryNorm.split(' ').filter((w) => w.length > 0);
  const vTokens = qVariantNorm.split(' ').filter((w) => w.length > 0);

  const qContentWords = qTokens.filter((w) => !STOP_WORDS.has(w));
  const vContentWords = vTokens.filter((w) => !STOP_WORDS.has(w));

  // If query contains content words, at least one content word must match
  if (qContentWords.length > 0) {
    if (vContentWords.length === 0) return 0;
    let hasContentMatch = false;
    for (const qWord of qContentWords) {
      for (const vWord of vContentWords) {
        if (isWordMatch(qWord, vWord) >= 0.8) {
          hasContentMatch = true;
          break;
        }
      }
      if (hasContentMatch) break;
    }
    if (!hasContentMatch) return 0;
  }

  // Exact phrase substring match bonus
  if (queryNorm.length >= 4 && (queryNorm.includes(qVariantNorm) || qVariantNorm.includes(queryNorm))) {
    const ratio = Math.min(queryNorm.length, qVariantNorm.length) / Math.max(queryNorm.length, qVariantNorm.length);
    if (ratio > 0.6) return 0.9 * ratio;
  }

  let matchedWeight = 0;
  let totalWeight = 0;

  for (const qWord of qTokens) {
    const isStop = STOP_WORDS.has(qWord);
    const weight = isStop ? 0.05 : 1.0;
    totalWeight += weight;

    let bestTokenScore = 0;
    for (const vWord of vTokens) {
      const s = isWordMatch(qWord, vWord);
      if (s > bestTokenScore) bestTokenScore = s;
    }
    matchedWeight += bestTokenScore * weight;
  }

  const queryRecall = totalWeight > 0 ? matchedWeight / totalWeight : 0;

  let vMatchedWeight = 0;
  let vTotalWeight = 0;
  for (const vWord of vTokens) {
    const isStop = STOP_WORDS.has(vWord);
    const weight = isStop ? 0.05 : 1.0;
    vTotalWeight += weight;
    let best = 0;
    for (const qWord of qTokens) {
      const s = isWordMatch(vWord, qWord);
      if (s > best) best = s;
    }
    vMatchedWeight += best * weight;
  }
  const variantPrecision = vTotalWeight > 0 ? vMatchedWeight / vTotalWeight : 0;

  if (queryRecall === 0 || variantPrecision === 0) return 0;
  return (2 * queryRecall * variantPrecision) / (queryRecall + variantPrecision);
}

export function search(query) {
  const norm = normalize(query);
  if (!norm) return { id: 'fallback', ...fallback };

  // Check if query matches a chip label directly
  const chipMatch = chips.find(
    (c) => normalize(c.label) === norm || c.label.toLowerCase() === query.trim().toLowerCase()
  );
  if (chipMatch) {
    const entry = getEntryById(chipMatch.id);
    if (entry) return entry;
  }

  let bestEntry = null;
  let highestScore = 0;

  for (const entry of kb) {
    for (const variant of entry.q) {
      const vNorm = normalize(variant);
      if (norm === vNorm) {
        return entry;
      }
      const score = scoreQueryAgainstPhrase(norm, vNorm);
      if (score > highestScore) {
        highestScore = score;
        bestEntry = entry;
      }
    }
  }

  const CONFIDENCE_THRESHOLD = 0.45;
  if (highestScore >= CONFIDENCE_THRESHOLD && bestEntry) {
    return bestEntry;
  }
  return { id: 'fallback', ...fallback };
}

export function getEntryById(id) {
  const found = kb.find((e) => e.id === id);
  if (found) return found;
  if (id === 'fallback') return { id: 'fallback', ...fallback };
  return null;
}

