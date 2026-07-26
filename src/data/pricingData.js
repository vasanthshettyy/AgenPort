export const countryMarkets = [
  { code: 'AU', label: 'Australia', currency: 'AUD', symbol: 'A$' },
  { code: 'DK', label: 'Denmark', currency: 'DKK', symbol: 'kr ' },
  { code: 'SG', label: 'Singapore', currency: 'SGD', symbol: 'S$' },
  { code: 'IE', label: 'Ireland / EU', currency: 'EUR', symbol: 'EUR ' },
  { code: 'IN', label: 'India', currency: 'INR', symbol: 'INR ' }
];

export const pricingPlans = [
  {
    id: 'starter-site',
    name: 'Starter Site',
    subtitle: '1-3 Pages - Quick Launch',
    tag: 'Starter Tier',
    popular: false,
    description: 'Landing page or simple brochure site. Mobile-friendly, one contact form, basic on-page setup.',
    deliverables: [
      '1-3 Responsive Pages',
      'Mobile-Optimized Design',
      '1 Contact Form Integration',
      'Basic On-Page SEO Setup'
    ],
    pricing: {
      AU: { amount: 1000, display: 'A$1,000' },
      DK: { amount: 7900, display: 'kr 7,900' },
      SG: { amount: 1000, display: 'S$1,000' },
      IE: { amount: 625, display: 'EUR 625' },
      IN: { amount: 10000, display: 'INR 10,000' }
    },
    retainer: {
      name: 'Starter Care',
      description: 'Minimal upkeep - occasional text/image swap, uptime check.',
      pricing: {
        AU: { amount: 150, display: 'A$150/mo' },
        DK: { amount: 1200, display: 'kr 1,200/mo' },
        SG: { amount: 150, display: 'S$150/mo' },
        IE: { amount: 100, display: 'EUR 100/mo' },
        IN: { amount: 1500, display: 'INR 1,500/mo' }
      }
    }
  },
  {
    id: 'small-biz-standard',
    name: 'Small Business Standard',
    subtitle: '5-8 Pages - Most Popular Choice',
    tag: 'Recommended',
    popular: true,
    description: 'Your bread-and-butter offering. Home, About, Services, Contact, plus 1-4 more custom pages.',
    deliverables: [
      '5-8 Custom Pages',
      'Mobile & Tablet Optimization',
      'Local SEO Setup & Google Business Linkage',
      'Lead Capture Form & Analytics Setup'
    ],
    pricing: {
      AU: { amount: 3100, display: 'A$3,100' },
      DK: { amount: 21250, display: 'kr 21,250' },
      SG: { amount: 2650, display: 'S$2,650' },
      IE: { amount: 1950, display: 'EUR 1,950' },
      IN: { amount: 28000, display: 'INR 28,000' }
    },
    retainer: {
      name: 'Standard Care',
      description: 'Regular content updates, plugin/security updates, monthly check-in.',
      pricing: {
        AU: { amount: 350, display: 'A$350/mo' },
        DK: { amount: 2500, display: 'kr 2,500/mo' },
        SG: { amount: 300, display: 'S$300/mo' },
        IE: { amount: 220, display: 'EUR 220/mo' },
        IN: { amount: 3500, display: 'INR 3,500/mo' }
      }
    }
  },
  {
    id: 'growth-custom-site',
    name: 'Growth / Custom Site',
    subtitle: '8-15 Pages - Advanced Features',
    tag: 'Enterprise Tier',
    popular: false,
    description: 'Custom design (not just a themed template), blog or resources section, more integrations.',
    deliverables: [
      '8-15 Bespoke Custom Pages',
      'Blog / CMS / Resources Section',
      'Third-Party Integrations (Booking, Newsletter, Social)',
      'Advanced Technical SEO Foundation'
    ],
    pricing: {
      AU: { amount: 5800, display: 'A$5,800' },
      DK: { amount: 39500, display: 'kr 39,500' },
      SG: { amount: 4900, display: 'S$4,900' },
      IE: { amount: 3600, display: 'EUR 3,600' },
      IN: { amount: 55000, display: 'INR 55,000' }
    },
    retainer: {
      name: 'Growth Care',
      description: 'More moving parts - integrations, blog, frequent updates, priority response.',
      pricing: {
        AU: { amount: 750, display: 'A$750/mo' },
        DK: { amount: 5000, display: 'kr 5,000/mo' },
        SG: { amount: 650, display: 'S$650/mo' },
        IE: { amount: 480, display: 'EUR 480/mo' },
        IN: { amount: 7500, display: 'INR 7,500/mo' }
      }
    }
  }
];
