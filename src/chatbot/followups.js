// src/chatbot/followups.js
// Contextual follow-up suggestions mapped by entry ID

export const followupsMap = {
  pricing: ['plans-overview', 'timeline', 'start'],
  'plans-overview': ['starter', 'standard', 'growth'],
  timeline: ['process', 'payment', 'plans-overview'],
  payment: ['revisions', 'ownership', 'contract'],
  ownership: ['hosting', 'post-launch', 'hidden-fees'],
  privacy: ['data-collected', 'data-rights', 'tracking'],
  contact: ['email', 'call', 'pricing'],
};

export const defaultFollowups = ['pricing', 'timeline', 'contact'];

export const followUpLabels = {
  pricing: 'How much does it cost?',
  'plans-overview': 'View all plans',
  timeline: 'How long does it take?',
  start: 'How do I start?',
  starter: 'Starter Site details',
  standard: 'Standard package',
  growth: 'Growth Custom Site',
  process: '4-step process',
  payment: 'Payment terms',
  revisions: 'Revision policy',
  ownership: 'Do I own the code?',
  contract: 'Is there a contract?',
  hosting: 'Do you handle hosting?',
  'post-launch': 'Support after launch',
  'hidden-fees': 'Any hidden fees?',
  'data-collected': 'What data is collected?',
  'data-rights': 'How to delete my data',
  tracking: 'Cookies & tracking policy',
  email: 'Send an email',
  call: 'Book a call',
  contact: 'Contact Vasanth',
  'what-he-does': 'What services do you offer?',
};

export function getFollowups(entryId) {
  const ids = followupsMap[entryId] || defaultFollowups;
  return ids.map((id) => ({
    id,
    label: followUpLabels[id] || id,
  }));
}

