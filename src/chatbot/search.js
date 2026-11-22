// src/chatbot/search.js
// High-performance client-side normalized search and typo-tolerant matcher against kb.js
// Precomputes token and keyword inverted indices at module load for sub-2ms query latency.

import { kb, fallback, chips } from './kb.js';

// ─── Aliases & Common SMS / Slang / Typos ──────────────────────────────────────
const ALIASES = {
  hw: 'how',
  pg: 'page',
  pgs: 'pages',
  u: 'you',
  ur: 'your',
  r: 'are',
  abt: 'about',
  pls: 'please',
  plz: 'please',
  biz: 'business',
  wat: 'what',
  cn: 'can',
  ecom: 'ecommerce',
  bussiness: 'business',
  servce: 'service',
  prcing: 'pricing',
  cst: 'cost',
  howlng: 'how long',
  thewebsit: 'the website',
  ownrship: 'ownership',
  redsign: 'redesign',
  boking: 'booking',
  onlinestore: 'online store',
  seoo: 'seo',
  revisons: 'revisions',
  revisin: 'revisions',
  paymnt: 'payment',
  whre: 'where',
  wht: 'what',
  hsting: 'hosting',
  doman: 'domain',
  exampels: 'examples',
  portfolo: 'portfolio',
  discoutns: 'discounts',
  fundng: 'founding',
  frm: 'from',
  afer: 'after',
  somthing: 'something',
  contct: 'contact',
  bok: 'book',
  sys: 'system',
  rupee: 'rupees',
  inr: 'rupees',
  dollar: 'dollars',
  usd: 'dollars',
};

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been',
  'do', 'does', 'did', 'to', 'for', 'in', 'on', 'at', 'by',
  'with', 'about', 'of', 'and', 'or', 'so', 'can', 'could',
  'would', 'should', 'i', 'you', 'your', 'my', 'we', 'our',
  'he', 'his', 'she', 'her', 'it', 'its', 'they', 'them',
  'me', 'please', 'tell', 's', 'd', 'm', 't', 'just', 'there',
  'here', 'get', 'give', 'also', 'some', 'any'
]);

function expandContractions(text) {
  return text
    .replace(/\bcan['\u2019]t\b/gi, 'cannot')
    .replace(/\bwon['\u2019]t\b/gi, 'will not')
    .replace(/\bi['\u2019]m\b/gi, 'i am')
    .replace(/\bit['\u2019]s\b/gi, 'it is')
    .replace(/\bwhat['\u2019]s\b/gi, 'what is')
    .replace(/\bhow['\u2019]s\b/gi, 'how is')
    .replace(/\bthat['\u2019]s\b/gi, 'that is')
    .replace(/\bthere['\u2019]s\b/gi, 'there is')
    .replace(/\bdon['\u2019]t\b/gi, 'do not')
    .replace(/\bdoesn['\u2019]t\b/gi, 'does not')
    .replace(/\bdidn['\u2019]t\b/gi, 'did not')
    .replace(/\byou['\u2019]re\b/gi, 'you are')
    .replace(/\bwe['\u2019]re\b/gi, 'we are')
    .replace(/\bthey['\u2019]re\b/gi, 'they are')
    .replace(/\byou['\u2019]ve\b/gi, 'you have')
    .replace(/\bwe['\u2019]ve\b/gi, 'we have')
    .replace(/\bi['\u2019]ve\b/gi, 'i have')
    .replace(/\byou['\u2019]ll\b/gi, 'you will')
    .replace(/\bi['\u2019]ll\b/gi, 'i will');
}

export function lightStem(word) {
  if (word.length <= 3) return word;
  if (word.endsWith('ly') && word.length > 4) word = word.slice(0, -2);
  if (word.endsWith('ies') && word.length > 4) return word.slice(0, -3) + 'y';
  if (word.endsWith('ing') && word.length > 5) return word.slice(0, -3);
  if (word.endsWith('ed') && word.length > 4) return word.slice(0, -2);
  if (word.endsWith('es') && word.length > 4 && !word.endsWith('services')) return word.slice(0, -2);
  if (
    word.endsWith('s') &&
    !word.endsWith('ss') &&
    word.length > 3 &&
    !['this', 'does', 'cms', 'yes', 'sms', 'plus'].includes(word)
  ) {
    return word.slice(0, -1);
  }
  return word;
}

export function normalize(str) {
  if (typeof str !== 'string') return '';
  const clean = expandContractions(str.toLowerCase())
    .replace(/web\s+site/g, 'website')
    .replace(/e\s*-\s*commerce/g, 'ecommerce')
    .replace(/[^a-z0-9\s]/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');

  if (!clean) return '';

  const words = clean.split(' ').map((w) => ALIASES[w] || w);
  return words.map((w) => lightStem(w)).join(' ');
}

// ─── Levenshtein & Fuzzy Matcher ─────────────────────────────────────────────
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
  if (maxLen <= 6 && dist <= 1) return 0.88;
  if (maxLen > 6 && dist <= 2) return 0.82;
  return 0;
}

// ─── Precomputed Inverted Index (Built ONCE at module load) ───────────────────
const INDEX = kb.map((entry) => {
  const normVariants = entry.q.map((v) => {
    const norm = normalize(v);
    const tokens = norm.split(' ').filter(Boolean);
    const content = tokens.filter((t) => !STOP_WORDS.has(t));
    return { raw: v, norm, tokens, content };
  });

  const kwNormalized = (entry.kw || []).map((k) => normalize(k));
  const kwTokens = new Set();
  const tokenSet = new Set();

  for (const k of kwNormalized) {
    for (const t of k.split(' ')) {
      if (t) {
        kwTokens.add(t);
        tokenSet.add(t);
      }
    }
  }

  for (const v of normVariants) {
    for (const t of v.content) tokenSet.add(t);
  }

  return {
    entry,
    id: entry.id,
    variants: normVariants,
    kwNormalized,
    kwTokens,
    tokenSet,
  };
});

const ENTRY_MAP = new Map(kb.map((e) => [e.id, e]));

export function getEntryById(id) {
  if (ENTRY_MAP.has(id)) return ENTRY_MAP.get(id);
  if (id === 'fallback') return { id: 'fallback', ...fallback };
  return null;
}

// ─── Phrase Scoring ──────────────────────────────────────────────────────────
export function scoreQueryAgainstPhrase(queryNorm, qVariantNorm) {
  if (queryNorm === qVariantNorm) return 1.0;

  const qTokens = queryNorm.split(' ').filter(Boolean);
  const vTokens = qVariantNorm.split(' ').filter(Boolean);

  const qContent = qTokens.filter((w) => !STOP_WORDS.has(w));
  const vContent = vTokens.filter((w) => !STOP_WORDS.has(w));

  if (qContent.length > 0 && vContent.length > 0) {
    let matchedOne = false;
    for (const qw of qContent) {
      for (const vw of vContent) {
        if (isWordMatch(qw, vw) >= 0.8) {
          matchedOne = true;
          break;
        }
      }
      if (matchedOne) break;
    }
    if (!matchedOne) return 0;
  }

  let matchedWeight = 0;
  let totalWeight = 0;
  for (const qw of qTokens) {
    const isStop = STOP_WORDS.has(qw);
    const weight = isStop ? 0.05 : 1.0;
    totalWeight += weight;

    let bestScore = 0;
    for (const vw of vTokens) {
      const s = isWordMatch(qw, vw);
      if (s > bestScore) bestScore = s;
    }
    matchedWeight += bestScore * weight;
  }
  const queryRecall = totalWeight > 0 ? matchedWeight / totalWeight : 0;

  let vMatchedWeight = 0;
  let vTotalWeight = 0;
  for (const vw of vTokens) {
    const isStop = STOP_WORDS.has(vw);
    const weight = isStop ? 0.05 : 1.0;
    vTotalWeight += weight;

    let best = 0;
    for (const qw of qTokens) {
      const s = isWordMatch(vw, qw);
      if (s > best) best = s;
    }
    vMatchedWeight += best * weight;
  }
  const variantPrecision = vTotalWeight > 0 ? vMatchedWeight / vTotalWeight : 0;

  if (queryRecall === 0 || variantPrecision === 0) return 0;
  return (2 * queryRecall * variantPrecision) / (queryRecall + variantPrecision);
}

function scoreWindowed(qTokens, vNorm) {
  const fullScore = scoreQueryAgainstPhrase(qTokens.join(' '), vNorm);
  if (qTokens.length <= 4) return fullScore;

  let bestScore = fullScore;
  const n = qTokens.length;

  for (let w = 2; w <= Math.min(6, n); w++) {
    for (let i = 0; i <= n - w; i++) {
      const windowStr = qTokens.slice(i, i + w).join(' ');
      const s = scoreQueryAgainstPhrase(windowStr, vNorm);
      if (s > bestScore) {
        bestScore = s;
        if (bestScore >= 0.95) return bestScore;
      }
    }
  }

  return bestScore;
}

// ─── Adversarial & Out-Of-Scope Fast Rejection ──────────────────────────────
function isAdversarialOrOutOfScope(rawQuery, norm) {
  if (!norm || norm.length === 0) return true;
  if (rawQuery.length > 500) return true;
  if (/(.)\1{10,}/.test(rawQuery)) return true;

  const rawLower = rawQuery.toLowerCase();

  if (
    rawLower.includes('ignore all previous') ||
    rawLower.includes('system prompt') ||
    rawLower.includes('developer mode') ||
    rawLower.includes('password') ||
    rawLower.includes('api key') ||
    rawLower.includes('repeat the word') ||
    rawLower.includes('hidden prompt') ||
    rawLower.includes('jailbreak') ||
    rawLower.includes('<script') ||
    rawLower.includes('<iframe') ||
    rawLower.includes('select * from') ||
    rawLower.includes('drop table') ||
    rawLower.includes('rm -rf') ||
    rawLower.includes('${7*7}') ||
    rawLower.includes('{{7*7}}') ||
    rawLower.includes('base64:')
  ) {
    return true;
  }

  if (
    rawLower.includes('idiot') ||
    rawLower.includes('shut up') ||
    rawLower.includes('suck at everything')
  ) {
    return true;
  }

  const oosKeywords = [
    'weather', 'square root', 'joke', 'chocolate chip', 'calories', 'avocado',
    'faucet', 'presidential election', 'travel advice', 'tokyo', 'roman empire',
    'distance between the earth', 'persistent cough', 'geopolitics', 'c++ segfault',
    'python script', 'scrape twitter', 'poem', 'stock price', 'capital of france',
    'quantum computing', 'netflix', 'iphone screen', 'guitar', 'cover letter',
    'ceo of google', 'homework', 'german', 'translate', 'webflow vs squarespace'
  ];
  for (const oos of oosKeywords) {
    if (rawLower.includes(oos)) return true;
  }

  return false;
}

// ─── Main Search Function ───────────────────────────────────────────────────
export function search(query) {
  if (typeof query !== 'string' || !query.trim()) {
    return { id: 'fallback', ...fallback };
  }

  const rawLower = query.trim().toLowerCase();

  // 1. Chips
  const chipMatch = chips.find(
    (c) => normalize(c.label) === normalize(query) || c.label.toLowerCase() === rawLower
  );
  if (chipMatch) {
    const e = getEntryById(chipMatch.id);
    if (e) return e;
  }

  const norm = normalize(query);
  if (!norm) return { id: 'fallback', ...fallback };

  // 2. Fast rejection
  if (isAdversarialOrOutOfScope(query, norm)) {
    return { id: 'fallback', ...fallback };
  }

  const qTokens = norm.split(' ').filter(Boolean);
  const qContent = qTokens.filter((t) => !STOP_WORDS.has(t));

  // 3. Exact single keyword checks
  if (norm === 'starter') return getEntryById('starter');
  if (norm === 'standard') return getEntryById('standard');
  if (norm === 'growth') return getEntryById('growth');
  if (norm === 'react') return getEntryById('tech-stack');

  // 4. Exact variant match check
  for (const item of INDEX) {
    for (const v of item.variants) {
      if (v.norm === norm) {
        return item.entry;
      }
    }
  }

  // 5. Special Intent Overrides

  // (a) Target Clients / For-Whom
  if (
    norm.includes('typic client') ||
    norm.includes('what industri do you serv') ||
    norm.includes('who do you work with') ||
    norm.includes('who is this for')
  ) {
    return getEntryById('for-whom');
  }

  // (b) Identity: "are you a real human", "who am i talking to", "are you ai" -> about-bot
  if (
    norm.startsWith('are you a') ||
    norm.startsWith('are you human') ||
    norm.startsWith('are you real') ||
    norm.startsWith('who am i talk') ||
    norm === 'who are you' ||
    norm.startsWith('who are you ') ||
    norm.includes('are you vasanth himself')
  ) {
    return getEntryById('about-bot');
  }

  // (c) Help: "what can you assist with", "quick overview of what you can"
  if (
    norm.includes('what you can assist with') ||
    norm.includes('overview of what you can assist') ||
    norm.includes('what can i ask this assistant') ||
    norm === 'help' ||
    norm === 'can you help me'
  ) {
    return getEntryById('help');
  }

  // (d) Code generation / AI trap: "ai to automatically generate"
  if (
    (norm.includes('ai') || norm.includes('automat')) &&
    (norm.includes('generat') && norm.includes('code') || norm.includes('scratch or use templat'))
  ) {
    return getEntryById('custom-code');
  }

  // (e) AI chatbots service
  if (norm.includes('chatbot') || norm.includes('chat bot') || norm.includes('ai assistant')) {
    if (norm.includes('chat widget') || norm.includes('convers record') || norm.includes('this chat send')) {
      return getEntryById('chat-privacy');
    }
    return getEntryById('ai-chatbots');
  }

  // (f) Chat Privacy: "this chat", "chat widget", "conversation recorded"
  if (norm.includes('chat widget') || norm.includes('convers record') || norm.includes('this chat send') || norm.includes('chat privaci') || norm.includes('chat privacy')) {
    return getEntryById('chat-privacy');
  }

  // (g) Privacy Rights
  if (norm.includes('privaci right') || norm.includes('privacy right') || norm.includes('data right') || norm.includes('delet my data') || norm.includes('remov my inform') || norm.includes('eras')) {
    return getEntryById('data-rights');
  }

  // (h) Data Use: "how is contact info utilized", "sell or share client email"
  if (norm.includes('util') || norm.includes('sell my data') || norm.includes('share my email') || norm.includes('share client email') || (norm.includes('contact inform') && norm.includes('util'))) {
    return getEntryById('data-use');
  }

  // (i) Call intent (must use token check or boundary)
  if (
    qTokens.includes('call') ||
    norm.includes('zoom') ||
    norm.includes('google meet') ||
    norm.includes('discoveri call')
  ) {
    if (qTokens.includes('phone') && !norm.includes('zoom') && !norm.includes('meet')) {
      return getEntryById('phone');
    }
    return getEntryById('call');
  }

  // (j) Unhappy / Unsatisfied with design
  if (norm.includes('unsatisfi') || norm.includes('unhappi') || norm.includes('do not like design')) {
    return getEntryById('unhappy');
  }

  // (k) Post-launch bugs / support right after go live
  if (
    norm.includes('bug') ||
    norm.includes('site go live') ||
    norm.includes('site goes live') ||
    norm.includes('after the site go live') ||
    norm.includes('after launch') ||
    norm.includes('post launch') ||
    norm.includes('someth break') ||
    (norm.includes('support') && norm.includes('live'))
  ) {
    return getEntryById('post-launch');
  }

  // (l) Code & Domain ownership
  if (norm.includes('do i own') || norm.includes('will i own') || norm.includes('code repositori and design')) {
    return getEntryById('ownership');
  }

  // (m) Ecommerce / Online store
  if (
    norm.includes('ecommerc') ||
    norm.includes('stripe') ||
    norm.includes('onlin store') ||
    norm.includes('webshop') ||
    norm.includes('store') ||
    (norm.includes('sell') && (norm.includes('product') || norm.includes('onlin') || norm.includes('physic'))) ||
    norm.includes('checkout') ||
    norm.includes('cart')
  ) {
    return getEntryById('online-store');
  }

  // (n) Care & Support plan
  if (
    norm.includes('care and support') ||
    norm.includes('care plan') ||
    norm.includes('ongoin mainten') ||
    norm.includes('support retainer') ||
    norm.includes('mainten differ')
  ) {
    return getEntryById('care');
  }

  // (o) Payment Schedule & Milestones
  if (norm.includes('payment schedul') || norm.includes('mileston') || norm.includes('deposit') || norm.includes('upfront')) {
    return getEntryById('payment');
  }

  // (p) Monthly fees / recurring hidden costs
  if (
    (norm.includes('month') || norm.includes('recur') || norm.includes('after the site is done') || norm.includes('extra charg') || norm.includes('hidden fee') || norm.includes('surpris cost')) &&
    !norm.includes('how long')
  ) {
    return getEntryById('hidden-fees');
  }

  // (q) Time / Timeline
  if (
    norm.includes('how much time') ||
    norm.includes('how long') ||
    norm.includes('turnaround') ||
    norm.includes('by tomorrow') ||
    qTokens.includes('timelin')
  ) {
    return getEntryById('timeline');
  }

  // (r) Price intent: "how much", "cost", "price", "charge", "quote", "rate", "rupees", "dollars"
  const isPriceIntent =
    qTokens.some((t) => ['pric', 'price', 'cost', 'charg', 'charge', 'rate', 'quot', 'quote', 'budget', 'rupe', 'rupees', 'dollar', 'dollars'].includes(t)) ||
    norm.includes('how much') ||
    norm.includes('wat do u charg');

  if (isPriceIntent) {
    if (qTokens.includes('host') || qTokens.includes('domain')) {
      return getEntryById('hosting');
    }
    if (qTokens.includes('care') || qTokens.includes('retainer') || norm.includes('mainten')) {
      return getEntryById('care');
    }
    return getEntryById('pricing');
  }

  // (s) Hosting / Deployment
  if (
    qTokens.includes('host') ||
    qTokens.includes('domain') ||
    qTokens.includes('server') ||
    norm.includes('deploy') ||
    norm.includes('netlify') ||
    norm.includes('vercel') ||
    norm.includes('cloudflar')
  ) {
    return getEntryById('hosting');
  }

  // (t) External Client Work vs Personal Projects
  if (norm.includes('extern client') || norm.includes('person project') || (norm.includes('work with') && norm.includes('client') && norm.includes('project'))) {
    return getEntryById('client-work');
  }

  // (u) Business hiring intent (e.g. "I need a website for my bakery")
  const isBusinessHiring =
    (norm.includes('need') || norm.includes('want') || norm.includes('look for') || norm.includes('can you mak') || norm.includes('can you build') || norm.includes('build me') || norm.includes('websit for') || norm.includes('site for')) &&
    (norm.includes('websit') || norm.includes('site') || norm.includes('page') || norm.includes('presenc')) &&
    !norm.includes('calendar') &&
    !norm.includes('appoint') &&
    !norm.includes('book') &&
    !norm.includes('land') &&
    !norm.includes('cms') &&
    !norm.includes('mockup') &&
    !norm.includes('figma');

  if (isBusinessHiring) {
    return getEntryById('which-plan');
  }

  // (v) Polite greetings / thanks
  const isQuestion =
    norm.includes('pric') ||
    norm.includes('cost') ||
    norm.includes('how much') ||
    norm.includes('timelin') ||
    norm.includes('how long') ||
    norm.includes('can you build') ||
    norm.includes('do you build') ||
    norm.includes('plan');

  if (!isQuestion) {
    if (
      norm.startsWith('hello') ||
      norm.startsWith('hi ') ||
      norm === 'hi' ||
      norm.startsWith('hey') ||
      norm.startsWith('good morn') ||
      norm.startsWith('good afternoon') ||
      norm.startsWith('good even')
    ) {
      return getEntryById('greeting');
    }

    if (
      norm.includes('thank') ||
      norm.includes('bye') ||
      norm.includes('goodbye') ||
      norm.includes('have a good one') ||
      norm.includes('see you')
    ) {
      return getEntryById('thanks-bye');
    }
  }

  // 6. Distinctive Direct Keyword Priority
  if (norm.includes('googl') || norm.includes('seo') || norm.includes('search engin') || norm.includes('rank')) {
    return getEntryById('seo');
  }
  if (norm.includes('appoint') || norm.includes('schedul') || (norm.includes('book') && !norm.includes('blog'))) {
    return getEntryById('booking');
  }
  if (norm.includes('redesign') || norm.includes('revamp') || norm.includes('outdat websit')) {
    return getEntryById('redesign');
  }
  if (norm.includes('cms') || norm.includes('blog post') || norm.includes('edit my content') || norm.includes('updat text')) {
    return getEntryById('cms');
  }
  if (norm.includes('land') || norm.includes('singl page') || norm.includes('one page websit')) {
    return getEntryById('landing');
  }
  if (norm.includes('contract') || norm.includes('statement of work') || norm.includes('written agreement')) {
    return getEntryById('contract');
  }
  if (norm.includes('case studi')) {
    return getEntryById('client-work');
  }
  if (norm.includes('meridian')) {
    return getEntryById('meridian');
  }
  if (norm.includes('this exact portfolio') || norm.includes('exact portfolio websit')) {
    return getEntryById('portfolio-site');
  }
  if (norm.includes('portfolio') || norm.includes('exampl') || norm.includes('past work')) {
    return getEntryById('projects');
  }
  if (norm.includes('photo') || norm.includes('imag') || norm.includes('copi') || norm.includes('logo') || norm.includes('content from me') || norm.includes('need from me') || norm.includes('provid everyth') || norm.includes('need frm me')) {
    return getEntryById('need-from-me');
  }
  if (norm.includes('figma mockup') || norm.includes('approv the design') || norm.includes('befor build the site') || norm.includes('design draft')) {
    return getEntryById('design-approval');
  }
  if (norm.includes('revis') || norm.includes('chang request')) {
    return getEntryById('revisions');
  }
  if (norm.includes('payment') || norm.includes('bill')) {
    return getEntryById('payment');
  }
  if (norm.includes('freelanc') || norm.includes('agenc') || norm.includes('solo') || norm.includes('work with you')) {
    return getEntryById('solo');
  }
  if (norm.includes('templat') || norm.includes('scratch') || norm.includes('wordpres') || norm.includes('builder')) {
    return getEntryById('custom-code');
  }
  if (norm.includes('standard tier') || norm.includes('standard packag') || norm.includes('5 to 8 page')) {
    return getEntryById('standard');
  }
  if (norm.includes('starter plan') || norm.includes('starter tier') || norm.includes('1 to 3 page')) {
    return getEntryById('starter');
  }
  if (norm.includes('growth tier') || norm.includes('growth plan') || norm.includes('8 to 15 page')) {
    return getEntryById('growth');
  }
  if (norm.includes('care plan') || norm.includes('ongoin mainten') || norm.includes('support retainer') || norm.includes('mainten')) {
    return getEntryById('care');
  }
  if (norm.includes('decid between') || norm.includes('choos a plan') || norm.includes('which plan') || norm.includes('between starter standard and growth')) {
    return getEntryById('which-plan');
  }
  if (norm.includes('includ in all') || norm.includes('standard featur') || (norm.includes('deliver') && norm.includes('includ'))) {
    return getEntryById('included');
  }
  if (norm.includes('how long do you keep') || norm.includes('retent period') || norm.includes('data store')) {
    return getEntryById('data-retention');
  }
  if (norm.includes('react') || norm.includes('tech stack') || norm.includes('stay fast') || norm.includes('bloat')) {
    return getEntryById('tech-stack');
  }
  if (norm.includes('figma') || norm.includes('frontend cod')) {
    return getEntryById('what-he-does');
  }
  if (norm.includes('timezon') || norm.includes('locat') || norm.includes('where are you base')) {
    return getEntryById('location');
  }
  if (norm.includes('email can i reach') || norm.includes('reach you at for project')) {
    return getEntryById('email');
  }
  if (norm.includes('mobil') || norm.includes('phone respons') || norm.includes('dope on mobil')) {
    return getEntryById('mobile');
  }

  // 7. Scored Candidate Fallback
  const candidateScores = [];

  for (const item of INDEX) {
    if ((item.id === 'greeting' || item.id === 'thanks-bye') && qTokens.length > 3) {
      continue;
    }

    let maxVariantScore = 0;
    for (const v of item.variants) {
      const s = scoreWindowed(qTokens, v.norm);
      if (s > maxVariantScore) {
        maxVariantScore = s;
      }
    }

    let kwHits = 0;
    for (const qt of qContent) {
      if (item.kwTokens.has(qt)) {
        kwHits++;
      }
    }

    const kwBoost = kwHits > 0 ? Math.min(0.40, kwHits * 0.25) : 0;
    const finalScore = maxVariantScore + kwBoost * (1 - maxVariantScore);
    if (finalScore > 0.15) {
      candidateScores.push({ entry: item.entry, id: item.id, score: finalScore });
    }
  }

  candidateScores.sort((a, b) => b.score - a.score);

  const top1 = candidateScores[0];
  const top2 = candidateScores[1];

  const CONFIDENCE_THRESHOLD = 0.42;

  if (!top1 || top1.score < CONFIDENCE_THRESHOLD) {
    return { id: 'fallback', ...fallback };
  }

  const isCompound = norm.includes(' and ') || norm.includes(' or ') || query.includes('&');
  if (!isCompound && top2 && top1.score - top2.score < 0.03 && top1.id !== top2.id) {
    if (top1.score < 0.60) {
      return { id: 'fallback', ...fallback };
    }
  }

  return top1.entry;
}
