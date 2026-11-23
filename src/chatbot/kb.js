// src/chatbot/kb.js
// Knowledge base for the rules-based portfolio chatbot (no LLM, runs fully in the browser).
//
// RULES:
// - Every answer traces to site content.
// - NO PRICES. Pricing numbers in pricingData.js are never displayed.
// - Voice: Vasanth's assistant (third person, max ~60 words).
// - Every entry has distinctive kw tokens for fast, accurate matching.

export const EMAIL = "vasanthshetty.dev@gmail.com";

export const fallback = {
  a: "I don't have an answer for that. I can only help with Vasanth's services, plans, process, payment, privacy and contact details. You can email vasanthshetty.dev@gmail.com or send a message through the contact form.",
  cta: "contact",
};

export const chips = [
  { label: "Services", id: "what-he-does" },
  { label: "Plans", id: "plans-overview" },
  { label: "How much?", id: "pricing" },
  { label: "Timeline", id: "timeline" },
  { label: "Payment", id: "payment" },
  { label: "Do I own the code?", id: "ownership" },
  { label: "Privacy", id: "privacy" },
  { label: "Contact", id: "contact" },
];

export const kb = [
  {
    "id": "greeting",
    "q": [
      "hi",
      "hii",
      "hello",
      "hey",
      "hey there",
      "good morning",
      "good afternoon",
      "good evening",
      "namaste",
      "yo",
      "hola"
    ],
    "a": "Hi! I can answer questions about Vasanth's services, plans, process, payment, privacy and how to get in touch. What would you like to know?",
    "kw": [
      "hi",
      "hello",
      "hey",
      "greetings"
    ]
  },
  {
    "id": "thanks-bye",
    "q": [
      "thanks",
      "thank you",
      "thankyou",
      "thx",
      "ty",
      "appreciate it",
      "great thanks",
      "bye",
      "goodbye",
      "see you",
      "cya",
      "that's all",
      "thats all",
      "ok thanks"
    ],
    "a": "You're welcome! If you'd like to talk about a project, the contact form is the quickest way to reach Vasanth.",
    "cta": "contact",
    "kw": [
      "thanks",
      "thank",
      "bye",
      "goodbye"
    ]
  },
  {
    "id": "help",
    "q": [
      "help",
      "what can you do",
      "what can i ask",
      "how does this work",
      "menu",
      "options",
      "what do you know",
      "topics",
      "what can you help with"
    ],
    "a": "I can answer questions about Vasanth's services, plans and what's included, timelines, payment, revisions and support, his projects, the privacy policy, and how to contact him. Try one of the buttons below or just type your question.",
    "kw": [
      "help",
      "topics",
      "options"
    ]
  },
  {
    "id": "about-bot",
    "q": [
      "are you a bot",
      "are you ai",
      "are you human",
      "are you a robot",
      "are you chatgpt",
      "who are you",
      "who am i talking to",
      "what are you",
      "is this ai",
      "are you real",
      "are you vasanth"
    ],
    "a": "I'm a simple automated assistant on Vasanth's website, not a person and not a general-purpose AI. I answer common questions using the content of this site. For anything else, email Vasanth directly.",
    "cta": "email",
    "kw": [
      "bot",
      "robot",
      "chatgpt"
    ]
  },
  {
    "id": "who",
    "q": [
      "who is vasanth",
      "who is vasanth shetty",
      "about vasanth",
      "tell me about vasanth",
      "about you",
      "tell me about yourself",
      "who runs this",
      "who built this",
      "who is the developer"
    ],
    "a": "Vasanth Shetty is a freelance Full-Stack Web Developer. He builds fast, custom-coded websites, AI chatbots and lead capture workflows that turn visitors into clients. No templates, no platform limitations.",
    "links": [
      {
        "label": "See his work",
        "href": "#work"
      }
    ],
    "kw": [
      "vasanth",
      "developer",
      "freelancer"
    ],
    "source": "src/components/Hero.jsx (lines 98-100)"
  },
  {
    "id": "what-he-does",
    "q": [
      "what do you do",
      "what does vasanth do",
      "what services",
      "services",
      "what do you offer",
      "what can you build",
      "what do you build",
      "what do you sell",
      "offerings",
      "service list"
    ],
    "a": "Vasanth offers four main services: lead generation websites, custom booking systems, high-converting landing pages, and website and landing page redesigns. He also builds AI chatbots and lead capture workflows.",
    "links": [
      {
        "label": "View services",
        "href": "#services"
      }
    ],
    "kw": [
      "services",
      "build",
      "offerings"
    ],
    "source": "src/data/services.js (lines 1-22)"
  },
  {
    "id": "for-whom",
    "q": [
      "who do you work with",
      "who are your clients",
      "what businesses",
      "what industries",
      "who is this for",
      "target customers",
      "do you work with small business",
      "who do you build for",
      "ideal client",
      "website for my business",
      "site for my business"
    ],
    "a": "Vasanth builds websites and landing pages for service businesses and growing brands. The focus is turning visitors into clients: more leads, booked appointments and phone calls.",
    "cta": "quote",
    "kw": [
      "clients",
      "industries",
      "business",
      "businesses"
    ],
    "source": "src/components/Footer.jsx (lines 37-38)"
  },
  {
    "id": "solo",
    "q": [
      "why freelancer",
      "why not an agency",
      "freelancer vs agency",
      "why should i work with you",
      "why choose you",
      "why hire you",
      "solo developer",
      "why you",
      "what makes you different"
    ],
    "a": "You work directly with the person building your site: no account managers, no handoffs, no getting passed around. As a solo Full-Stack Web Developer, what Vasanth quotes is what you pay, and every decision goes through one person.",
    "links": [
      {
        "label": "Why work with Vasanth",
        "href": "#process"
      }
    ],
    "kw": [
      "agency",
      "solo",
      "freelancer"
    ],
    "source": "src/data/faqData.js (lines 28-30)"
  },
  {
    "id": "custom-code",
    "q": [
      "templates",
      "do you use templates",
      "custom code",
      "custom coded",
      "wordpress",
      "shopify",
      "wix",
      "squarespace",
      "no code",
      "website builder",
      "platform",
      "which platform",
      "built from scratch"
    ],
    "a": "Sites are custom-coded, not built from templates, and not tied to a website-builder platform. If you need a specific platform, ask by email before starting.",
    "cta": "email",
    "kw": [
      "templates",
      "scratch",
      "wordpress",
      "wix",
      "squarespace",
      "shopify"
    ],
    "source": "src/data/faqData.js (lines 16-18)"
  },
  {
    "id": "lead-gen",
    "q": [
      "lead generation website",
      "lead gen",
      "lead generation",
      "capture leads",
      "get more leads",
      "collect emails",
      "email capture",
      "click to call",
      "get more clients",
      "generate leads"
    ],
    "a": "Lead generation websites are built to capture emails and phone numbers so visitors become paying clients. Features include email capture forms, click-to-call buttons and a mobile-friendly layout.",
    "links": [
      {
        "label": "View services",
        "href": "#services"
      }
    ],
    "kw": [
      "leads",
      "capture"
    ],
    "source": "src/data/services.js (lines 3-5)"
  },
  {
    "id": "booking",
    "q": [
      "booking system",
      "online booking",
      "appointment booking",
      "book appointments",
      "scheduling",
      "calendar",
      "sms reminders",
      "custom booking",
      "booking website",
      "book online",
      "online booking forms setup",
      "client appointments scheduling",
      "booking system integration"
    ],
    "a": "Custom booking systems let clients book appointments online automatically, saving you hours of phone calls. Features include automated scheduling, calendar syncing and SMS reminders.",
    "links": [
      {
        "label": "View services",
        "href": "#services"
      }
    ],
    "kw": [
      "booking",
      "appointments",
      "scheduling",
      "calendar"
    ],
    "source": "src/data/services.js (lines 8-10)"
  },
  {
    "id": "landing",
    "q": [
      "landing page",
      "landing pages",
      "single page",
      "one page website",
      "paid ads",
      "ads landing page",
      "google ads",
      "facebook ads",
      "high converting landing page",
      "sales page"
    ],
    "a": "A landing page is a single page built to sell one specific service or product. It's ideal if you're running paid ads and need somewhere for that traffic to convert. It includes persuasive copywriting, A/B testing readiness and fast loading speeds.",
    "cta": "quote",
    "kw": [
      "landing"
    ],
    "source": "src/data/services.js (lines 13-15)"
  },
  {
    "id": "redesign",
    "q": [
      "website redesign",
      "redo my website",
      "old website",
      "outdated website",
      "refresh my site",
      "improve my website",
      "modernize",
      "update my old site",
      "website redesign services",
      "revamp outdated website",
      "redesign my old site"
    ],
    "a": "Redesigns take an old, outdated site or landing page and make it look like a premium brand, with modern design, conversion rate optimization and SEO optimization, so you stand out and look like the obvious choice.",
    "cta": "quote",
    "kw": [
      "redesign",
      "revamp",
      "outdated",
      "modernize",
      "overhaul"
    ],
    "source": "src/data/services.js (lines 18-20)"
  },
  {
    "id": "ai-chatbots",
    "q": [
      "chat bot",
      "ai chatbot",
      "can you build a chatbot",
      "automation",
      "business automation",
      "lead capture workflow",
      "ai bots",
      "ai chatbot integration",
      "lead capture workflow setup",
      "custom ai assistants"
    ],
    "a": "Yes. Vasanth also builds AI chatbots and lead capture workflows, as listed on this site. There's no fixed plan for these, so describe what you need and he'll scope it.",
    "cta": "quote",
    "kw": [
      "chatbot",
      "chatbots",
      "automation",
      "automations"
    ],
    "source": "src/components/Hero.jsx (lines 99)"
  },
  {
    "id": "online-store",
    "q": [
      "online store",
      "online stores",
      "ecommerce website",
      "shopping cart",
      "sell products online",
      "web shop",
      "webshop",
      "sell online",
      "online payments",
      "ecommerce online store",
      "ecommerce store with payments",
      "selling products with cart"
    ],
    "a": "There's no set online store plan on this site. If you want one, send the details of what you need and Vasanth will scope it. Don't assume specific store features until they're confirmed in your written summary.",
    "cta": "quote",
    "kw": [
      "ecommerce",
      "store",
      "shop",
      "checkout",
      "cart",
      "stripe"
    ],
    "source": "src/data/faqData.js (lines 4-5)"
  },
  {
    "id": "seo",
    "q": [
      "search engine optimization",
      "google ranking",
      "rank on google",
      "rank higher",
      "google search",
      "local seo",
      "google business",
      "google my business",
      "technical seo",
      "will my site appear on google",
      "show up on google",
      "showing up on google search",
      "google ranking optimization"
    ],
    "a": "Sites are built with technical SEO best practices so you can rank higher on Google. Starter includes basic on-page SEO setup, Standard adds local SEO and Google Business linkage, and Growth has an advanced technical SEO foundation.",
    "links": [
      {
        "label": "View plans",
        "href": "#plans"
      }
    ],
    "kw": [
      "seo",
      "google",
      "rank",
      "ranking"
    ],
    "source": "src/data/pricingData.js (lines 22, 55, 90)"
  },
  {
    "id": "mobile",
    "q": [
      "mobile",
      "mobile friendly",
      "mobile first",
      "responsive",
      "phone friendly",
      "works on phone",
      "tablet",
      "fast website",
      "speed",
      "loading speed",
      "page speed"
    ],
    "a": "Sites are built mobile-first, since most clients find businesses on their phones, and built to load fast. Starter includes mobile-optimized design and Standard adds tablet optimization.",
    "kw": [
      "mobile",
      "responsive",
      "phone",
      "tablet",
      "speed"
    ],
    "source": "src/data/pricingData.js (lines 20, 54)"
  },
  {
    "id": "cms",
    "q": [
      "cms",
      "blog",
      "edit my own content",
      "update text myself",
      "can i edit the site",
      "content management",
      "newsletter",
      "integrations",
      "third party integrations",
      "social media integration"
    ],
    "a": "The Growth plan includes a blog / CMS / resources section and third-party integrations such as booking, newsletter and social. The site doesn't say whether Starter or Standard include a CMS for editing text yourself, so ask when you request a quote. Starter Care covers occasional text and image swaps.",
    "cta": "quote",
    "kw": [
      "cms",
      "blog"
    ],
    "source": "src/data/pricingData.js (lines 88)"
  },
  {
    "id": "plans-overview",
    "q": [
      "plans",
      "packages",
      "what plans",
      "service plans",
      "pricing plans",
      "what packages do you have",
      "tiers",
      "plan options",
      "compare plans",
      "plan comparison"
    ],
    "a": "There are three plans: Starter Site (1-3 pages), Small Business Standard (5-8 pages, the most popular choice) and Growth / Custom Site (8-15 pages). Every project also gets a custom scope assessment.",
    "cta": "quote",
    "links": [
      {
        "label": "View plans",
        "href": "#plans"
      }
    ],
    "kw": [
      "plans",
      "packages",
      "tiers"
    ],
    "source": "src/components/PricingSection.jsx (lines 69-70)"
  },
  {
    "id": "starter",
    "q": [
      "starter site",
      "starter plan",
      "starter package",
      "small website",
      "simple website",
      "brochure site",
      "1 to 3 pages",
      "basic website",
      "cheapest plan",
      "starter plan details",
      "1 to 3 page website package"
    ],
    "a": "Starter Site: 1-3 responsive pages, a quick launch, ideal for a landing page or simple brochure site. Includes mobile-optimized design, one contact form and basic on-page SEO. Timeline 1-2 weeks, 5 revision rounds, 1 month of free support.",
    "cta": "quote",
    "links": [
      {
        "label": "View plans",
        "href": "#plans"
      }
    ],
    "kw": [
      "starter"
    ],
    "source": "src/data/pricingData.js (lines 12-23)"
  },
  {
    "id": "standard",
    "q": [
      "standard plan",
      "small business standard",
      "small business plan",
      "most popular plan",
      "5 to 8 pages",
      "recommended plan",
      "standard package",
      "popular plan",
      "business website",
      "standard plan details",
      "small business standard 5 to 8 pages"
    ],
    "a": "Small Business Standard: 5-8 custom pages, the most popular choice (Home, About, Services, Contact plus 1-4 custom pages). Includes mobile and tablet optimization, local SEO with Google Business linkage, and a lead capture form with analytics setup. Timeline 2-3 weeks, 10 revision rounds, 2 months of free support.",
    "cta": "quote",
    "links": [
      {
        "label": "View plans",
        "href": "#plans"
      }
    ],
    "kw": [
      "standard"
    ],
    "source": "src/data/pricingData.js (lines 46-57)"
  },
  {
    "id": "growth",
    "q": [
      "growth plan",
      "growth site",
      "custom site",
      "growth custom",
      "8 to 15 pages",
      "big website",
      "advanced website",
      "large website",
      "advanced features",
      "growth plan details",
      "growth custom site package"
    ],
    "a": "Growth / Custom Site: 8-15 bespoke pages with custom design, not a themed template. Includes a blog / CMS / resources section, third-party integrations (booking, newsletter, social) and an advanced technical SEO foundation. Timeline 3-4 weeks, 15 revision rounds, 3 months of free support.",
    "cta": "quote",
    "links": [
      {
        "label": "View plans",
        "href": "#plans"
      }
    ],
    "kw": [
      "growth"
    ],
    "source": "src/data/pricingData.js (lines 80-91)"
  },
  {
    "id": "which-plan",
    "q": [
      "which plan",
      "which plan should i choose",
      "which plan is best",
      "not sure which plan",
      "custom scope",
      "custom plan",
      "something different",
      "what do i need",
      "which package",
      "help me choose",
      "website for my clinic",
      "website for my bakery",
      "website for my gym",
      "website for my law firm",
      "website for my shop"
    ],
    "a": "Not sure which plan fits? Standard (5-8 pages) is the most popular. Or tell Vasanth what you're after and he'll scope it. Every project gets a custom scope assessment to fit your business goals and timeline.",
    "cta": "quote",
    "kw": [
      "which",
      "bakery",
      "clinic",
      "gym",
      "firm",
      "dentist",
      "studio",
      "plumbing",
      "therapy",
      "consulting"
    ],
    "source": "src/components/PricingSection.jsx (lines 69-70)"
  },
  {
    "id": "care",
    "q": [
      "retainer",
      "maintenance plan",
      "monthly maintenance",
      "ongoing support",
      "starter care",
      "standard care",
      "growth care",
      "website maintenance",
      "monthly care plan",
      "ongoing website care package"
    ],
    "a": "Each plan has an optional care retainer. Starter Care: minimal upkeep like occasional text or image swaps and an uptime check. Standard Care: regular content updates, plugin and security updates, and a monthly check-in. Growth Care: for more moving parts such as integrations, a blog and frequent updates, with priority response. Ask for details when you request a quote.",
    "cta": "quote",
    "kw": [
      "care",
      "retainer",
      "maintenance",
      "upkeep"
    ],
    "source": "src/data/pricingData.js (lines 33-34, 67-68, 101-102)"
  },
  {
    "id": "pricing",
    "q": [
      "how much",
      "price",
      "quote",
      "how much does a website cost",
      "what do you charge",
      "budget",
      "cheap",
      "affordable",
      "estimate",
      "fees",
      "how much for a website",
      "rate card",
      "get a quote",
      "how much for a basic website",
      "landing page price",
      "general pricing structure",
      "project cost estimate",
      "how much for basic website",
      "pricing for landing page"
    ],
    "a": "Prices aren't listed on the site because every project is scoped individually. Use the button below to describe what you need and Vasanth will get back to you with a quote.",
    "cta": "quote",
    "links": [
      {
        "label": "View plans",
        "href": "#plans"
      }
    ],
    "kw": [
      "price",
      "pricing",
      "cost",
      "rates",
      "quote",
      "budget",
      "charge",
      "fees"
    ],
    "source": "src/components/PricingSection.jsx (lines 50-54)"
  },
  {
    "id": "hidden-fees",
    "q": [
      "hidden fees",
      "hidden costs",
      "monthly fees",
      "any extra charges",
      "extra costs",
      "recurring fees",
      "subscription",
      "no hidden fees",
      "additional costs",
      "what else will i pay",
      "do i have to pay every month",
      "monthly payment after launch",
      "recurring cost after site is built",
      "recurring charges after site is done",
      "ongoing monthly fees"
    ],
    "a": "No hidden fees: you own the website completely, with no monthly platform fees to Vasanth. Two things are separate: hosting is paid directly to your host, and care retainers are optional. Any extra work is quoted upfront before it starts.",
    "kw": [
      "hidden",
      "recurring",
      "monthly",
      "subscription",
      "extra"
    ],
    "source": "src/data/faqData.js (lines 22-24)"
  },
  {
    "id": "process",
    "q": [
      "how does it work",
      "how do you work",
      "steps",
      "how does working together work",
      "what happens after i contact you",
      "4 step process",
      "four steps",
      "what is the process",
      "project process steps",
      "development workflow phases"
    ],
    "a": "Four steps: 1) A short call or message to understand your business. 2) You approve the plan and design before Vasanth builds. 3) Regular updates while he builds, no surprises. 4) You go live, and free support continues for a while after.",
    "links": [
      {
        "label": "See the process",
        "href": "#how-it-works"
      }
    ],
    "kw": [
      "process",
      "workflow",
      "steps"
    ],
    "source": "src/data/processSteps.js (lines 1-22)"
  },
  {
    "id": "timeline",
    "q": [
      "how long",
      "delivery time",
      "how fast",
      "when will it be ready",
      "how many weeks",
      "project duration",
      "deadline",
      "time to build",
      "5-page site timeline",
      "typical turnaround timeline",
      "how long to build website",
      "timeline for 5 page website"
    ],
    "a": "Starter Site (1-3 pages) takes 1 to 2 weeks, Small Business Standard (5-8 pages) takes 2 to 3 weeks, and Growth / Custom (8-15 pages) takes 3 to 4 weeks. You get an exact timeline before starting.",
    "links": [
      {
        "label": "View plans",
        "href": "#plans"
      }
    ],
    "kw": [
      "timeline",
      "turnaround",
      "weeks",
      "duration",
      "fast"
    ],
    "source": "src/data/faqData.js (lines 4-6)"
  },
  {
    "id": "start",
    "q": [
      "how do i start",
      "get started",
      "start a project",
      "begin",
      "hire you",
      "work with you",
      "next step",
      "how to hire",
      "i want a website",
      "i want to work with you",
      "start my project",
      "how to start a new project",
      "initiating website project"
    ],
    "a": "Send an inquiry through the contact form or by email. The first step is a short call or message so Vasanth can understand your business, then he reaches out to you.",
    "cta": "quote",
    "links": [
      {
        "label": "Go to contact form",
        "href": "#contact"
      }
    ],
    "kw": [
      "start",
      "begin",
      "kickoff",
      "hire"
    ],
    "source": "src/data/processSteps.js (lines 4-5)"
  },
  {
    "id": "need-from-me",
    "q": [
      "what do i need to provide",
      "requirements",
      "do i need a logo",
      "brand colors",
      "content",
      "images",
      "copywriting",
      "i don't have a logo",
      "i dont have content",
      "what should i prepare",
      "photos",
      "text for the website",
      "can you write the text and find photos",
      "can you write the text and find photos for my website",
      "who provides photos and text",
      "materials needed from client",
      "copy and photos required from me"
    ],
    "a": "Not much to begin with. A logo, brand colors or inspiration sites you like help speed things up, but it's fine if you have none of that yet. Vasanth guides you through it in the kick-off conversation. The site doesn't spell out who writes copy or sources images, so ask when you get in touch.",
    "cta": "contact",
    "kw": [
      "photos",
      "images",
      "copy",
      "logo",
      "content",
      "text",
      "assets"
    ],
    "source": "src/data/faqData.js (lines 34-36)"
  },
  {
    "id": "design-approval",
    "q": [
      "do i approve the design",
      "design approval",
      "see the design first",
      "mockup",
      "preview",
      "will i see it before launch",
      "updates during the project",
      "progress updates",
      "how will i know progress",
      "approve before build"
    ],
    "a": "Yes. You approve the plan and design before Vasanth builds, and you get regular updates while it's being built, so there are no surprises at the end.",
    "kw": [
      "approve",
      "approval",
      "mockup",
      "preview"
    ],
    "source": "src/data/processSteps.js (lines 9-10)"
  },
  {
    "id": "payment",
    "q": [
      "how does payment work",
      "upfront",
      "advance",
      "pay",
      "40 percent",
      "payment schedule",
      "payment methods",
      "how do i pay",
      "accepted payments",
      "invoice",
      "payment terms and deposit",
      "upfront payment structure"
    ],
    "a": "Payment is 40% upfront to start the project and 60% once it's complete and ready to hand over. The site doesn't list accepted payment methods or currencies, so ask by email.",
    "cta": "email",
    "kw": [
      "payment",
      "deposit",
      "upfront",
      "split",
      "invoice"
    ],
    "source": "src/data/faqData.js (lines 10-12)"
  },
  {
    "id": "included",
    "q": [
      "what's included",
      "whats included",
      "included in the price",
      "what do i get",
      "what's in the price",
      "scope",
      "inclusions",
      "what does the price cover"
    ],
    "a": "You get a fully custom-built website made for your business, not a template, and you own the complete code. Included revision rounds depend on your plan: 5 for Starter, 10 for Standard and 15 for Growth.",
    "links": [
      {
        "label": "View plans",
        "href": "#plans"
      }
    ],
    "kw": [
      "included",
      "inclusions",
      "deliverables"
    ],
    "source": "src/data/faqData.js (lines 16-18)"
  },
  {
    "id": "revisions",
    "q": [
      "revision rounds",
      "how many revisions",
      "changes",
      "edits",
      "how many changes",
      "can i request changes",
      "rounds of changes",
      "modifications",
      "design revisions policy",
      "how many revisions included"
    ],
    "a": "Included revision rounds: 5 for Starter, 10 for Standard and 15 for Growth / Custom. Most concerns get sorted through these rounds.",
    "kw": [
      "revisions",
      "revision",
      "rounds",
      "tweaks",
      "changes"
    ],
    "source": "src/data/faqData.js (lines 17-18)"
  },
  {
    "id": "ownership",
    "q": [
      "ownership",
      "own the code",
      "who owns the website",
      "source code",
      "code ownership",
      "lock in",
      "will i own it",
      "do i get the code",
      "vendor lock in",
      "owning the code and site assets",
      "ownership of files and website"
    ],
    "a": "Yes, completely. Once the project is done, the code is yours: no monthly fees to Vasanth, no lock-in, nothing you're renting.",
    "kw": [
      "own",
      "ownership",
      "code",
      "rights",
      "ip"
    ],
    "source": "src/data/faqData.js (lines 22-24)"
  },
  {
    "id": "post-launch",
    "q": [
      "after launch",
      "support after launch",
      "post launch",
      "free support",
      "free updates",
      "changes after going live",
      "maintenance after launch",
      "what if i need changes later",
      "small updates",
      "support period",
      "warranty",
      "support if site breaks after launch",
      "post launch bug fix support"
    ],
    "a": "After launch you get free maintenance and small updates for 1 month on Starter, 2 on Standard and 3 on Growth. After that, or for bigger changes that take real time, there's a cost, and Vasanth tells you upfront before starting anything that costs extra. Optional care retainers are also available.",
    "kw": [
      "breaks",
      "broken",
      "bug",
      "launch",
      "warranty"
    ],
    "source": "src/data/faqData.js (lines 40-42)"
  },
  {
    "id": "unhappy",
    "q": [
      "not happy",
      "unhappy with result",
      "refund",
      "money back",
      "cancel",
      "cancel project",
      "stop the project",
      "dissatisfied",
      "refund policy",
      "what if i dont like it",
      "partial refund",
      "cancellation"
    ],
    "a": "Most concerns get resolved through the revision rounds in your plan. If things genuinely aren't working and you want to stop partway, Vasanth works out a fair partial refund based on how much work was already completed.",
    "kw": [
      "refund",
      "unhappy",
      "dissatisfied",
      "cancel"
    ],
    "source": "src/data/faqData.js (lines 46-48)"
  },
  {
    "id": "discount",
    "q": [
      "discount",
      "offer",
      "special offer",
      "founding client",
      "founding client offer",
      "founding client rate",
      "limited availability",
      "promo",
      "coupon",
      "deal",
      "cheaper rate",
      "is the offer still open",
      "are slots available",
      "discounts for new clients",
      "available project discounts"
    ],
    "a": "Yes. A Founding Client rate is offered for Vasanth's first few projects while he builds out his initial portfolio slots. I can't see whether a spot is open right now, so reach out to check.",
    "cta": "contact",
    "kw": [
      "discount",
      "discounts",
      "promo",
      "founding"
    ],
    "source": "src/data/faqData.js (lines 52-54)"
  },
  {
    "id": "hosting",
    "q": [
      "do you handle hosting",
      "web hosting",
      "hosting cost",
      "how much is hosting",
      "which host",
      "server",
      "deployment",
      "where will it be hosted",
      "domain name and hosting",
      "who pays for domain",
      "domain and hosting details",
      "who pays for domain and hosting"
    ],
    "a": "Hosting is separate and you pay the provider directly, not through Vasanth. If you're unsure which provider to pick, he's happy to help you set up a fast, secure and affordable option for your tech stack. The site doesn't list hosting costs.",
    "cta": "contact",
    "kw": [
      "host",
      "hosting",
      "domain"
    ],
    "source": "src/data/faqData.js (lines 58-60)"
  },
  {
    "id": "contract",
    "q": [
      "is there a contract",
      "terms and conditions",
      "terms",
      "legal",
      "written agreement",
      "do you sign contracts",
      "nda",
      "terms of service",
      "paperwork",
      "written contract agreement",
      "formal service agreement"
    ],
    "a": "Yes, by email. Before any work starts, Vasanth emails a clear summary of scope, price, payment split, revisions included and timeline. You reply confirming, and that's your agreement, so there's always a written record. There isn't a separate terms and conditions page.",
    "kw": [
      "contract",
      "agreement",
      "nda",
      "legal"
    ],
    "source": "src/data/faqData.js (lines 64-66)"
  },
  {
    "id": "projects",
    "q": [
      "projects",
      "previous work",
      "examples",
      "show me your work",
      "samples",
      "work samples",
      "your work",
      "demos",
      "past work portfolio",
      "portfolio case studies",
      "examples of previous work"
    ],
    "a": "The site shows four projects: AetherIntake, Meridian Assets, AXIOM Neural Interface and Vasanth's own developer portfolio. The first three are concept or personal builds that show his design and development style.",
    "links": [
      {
        "label": "View projects",
        "href": "#work"
      }
    ],
    "kw": [
      "projects",
      "portfolio",
      "examples",
      "samples"
    ],
    "source": "src/data/projects.js (lines 1-74)"
  },
  {
    "id": "aether",
    "q": [
      "aetherintake",
      "aether intake",
      "clinical intake",
      "healthcare project",
      "medical project",
      "patient portal",
      "healthcare website",
      "tell me about aetherintake"
    ],
    "a": "AetherIntake is a concept platform exploring how AI-driven intake flows could streamline clinical onboarding, with automated scheduling, secure patient portals and intake form design. It's a personal exploration of healthcare UX, built with Next.js.",
    "links": [
      {
        "label": "Visit AetherIntake",
        "href": "https://aether-intake.vercel.app"
      }
    ],
    "kw": [
      "aether",
      "aetherintake"
    ],
    "source": "src/data/projects.js (lines 5-7)"
  },
  {
    "id": "meridian",
    "q": [
      "meridian",
      "meridian assets",
      "real estate project",
      "proptech",
      "property valuation",
      "real estate website",
      "tell me about meridian"
    ],
    "a": "Meridian Assets is a personal project exploring property valuation UI design: a clean, professional interface for real estate professionals and investors, showing responsive data presentation. Built with Next.js.",
    "links": [
      {
        "label": "Visit Meridian Assets",
        "href": "https://meridian-assets.vercel.app"
      }
    ],
    "kw": [
      "meridian"
    ],
    "source": "src/data/projects.js (lines 23-25)"
  },
  {
    "id": "axiom",
    "q": [
      "axiom",
      "axiom neural interface",
      "neural interface",
      "neon landing page",
      "scroll animation project",
      "product landing page",
      "tell me about axiom",
      "neural tech"
    ],
    "a": "AXIOM Neural Interface is a personal landing page concept for a fictional wrist-worn neural interface. It explores neon high-tech design, scroll-linked animations and immersive product storytelling, built with Next.js.",
    "links": [
      {
        "label": "Visit AXIOM",
        "href": "https://axiom-neon-one.vercel.app"
      }
    ],
    "kw": [
      "axiom"
    ],
    "source": "src/data/projects.js (lines 41-43)"
  },
  {
    "id": "portfolio-site",
    "q": [
      "developer portfolio",
      "your portfolio site",
      "engineering portfolio",
      "vasanth portfolio",
      "personal portfolio",
      "your own website",
      "portfolio website"
    ],
    "a": "Vasanth's developer portfolio was built from scratch to show full-stack engineering, interactive UI design systems and production web apps. The codebase itself is the demonstration.",
    "links": [
      {
        "label": "Visit portfolio",
        "href": "https://vasanth-shetty-portfolio.vercel.app"
      }
    ],
    "kw": [
      "portfolio"
    ],
    "source": "src/data/projects.js (lines 59-61)"
  },
  {
    "id": "client-work",
    "q": [
      "do you have clients",
      "client work",
      "testimonials",
      "reviews",
      "experience",
      "previous clients",
      "references",
      "past clients",
      "how many projects",
      "client list",
      "proof",
      "detailed client case studies",
      "featured client project work"
    ],
    "a": "The projects on this site are concept and personal builds that show Vasanth's style; no client case studies or testimonials are listed yet. That's why a Founding Client rate is offered for his first few projects. Ask by email if you'd like to talk about what he can do for you.",
    "cta": "contact",
    "kw": [
      "testimonials",
      "reviews",
      "references",
      "proof"
    ],
    "source": "src/data/faqData.js (lines 53-54)"
  },
  {
    "id": "tech-stack",
    "q": [
      "technologies",
      "what tech do you use",
      "next js",
      "nextjs",
      "framework",
      "programming languages",
      "what do you code in",
      "which technology",
      "tailwind",
      "node",
      "technical stack and react tooling",
      "technologies used for development"
    ],
    "a": "The projects on this site are built with Next.js and React, and Vasanth is a Full-Stack developer. The site doesn't say which stack each plan uses, so the stack for your site is something to confirm when your project is scoped.",
    "cta": "quote",
    "kw": [
      "tech",
      "react",
      "nextjs",
      "tailwind",
      "framework"
    ],
    "source": "src/data/projects.js (lines 10, 28, 46, 64)"
  },
  {
    "id": "privacy",
    "q": [
      "privacy policy",
      "data policy",
      "is my data safe",
      "data protection",
      "what happens to my information",
      "gdpr",
      "privacy page",
      "personal data",
      "data privacy",
      "client privacy overview",
      "privacy policy commitments"
    ],
    "a": "Vasanth's privacy policy is short and written in plain language. It covers what's collected, what it's used for, how long it's kept, and your rights.",
    "links": [
      {
        "label": "Read the privacy policy",
        "href": "/privacy-policy"
      }
    ],
    "kw": [
      "privacy",
      "gdpr"
    ],
    "source": "src/components/PrivacyPolicy.jsx (lines 44-46)"
  },
  {
    "id": "data-collected",
    "q": [
      "what data do you collect",
      "what information do you collect",
      "what do you collect",
      "data collected",
      "what does the form collect",
      "what do you store about me",
      "information you collect"
    ],
    "a": "When you use the contact form, Vasanth collects your name, email address and whatever project details you share. That's it.",
    "links": [
      {
        "label": "Read the privacy policy",
        "href": "/privacy-policy"
      }
    ],
    "kw": [
      "collect",
      "collected",
      "store"
    ],
    "source": "src/components/PrivacyPolicy.jsx (lines 52-54)"
  },
  {
    "id": "tracking",
    "q": [
      "tracking",
      "do you use cookies",
      "analytics",
      "ad pixels",
      "do you track me",
      "tracking cookies",
      "google analytics",
      "facebook pixel",
      "are you tracking visitors",
      "cookie tracking policy",
      "website analytics tracking"
    ],
    "a": "The site doesn't use tracking cookies, ad pixels or analytics scripts that follow you around the web.",
    "links": [
      {
        "label": "Read the privacy policy",
        "href": "/privacy-policy"
      }
    ],
    "kw": [
      "cookies",
      "pixels",
      "trackers",
      "tracking"
    ],
    "source": "src/components/PrivacyPolicy.jsx (lines 53-54)"
  },
  {
    "id": "data-use",
    "q": [
      "what do you do with my data",
      "do you sell my data",
      "share my data",
      "marketing emails",
      "will you spam me",
      "newsletter list",
      "is my email shared",
      "how is my data used",
      "do you sell my information"
    ],
    "a": "Your information is used only to reply to you and discuss your project. It isn't sold, rented or shared with anyone else, and it isn't added to a marketing list.",
    "links": [
      {
        "label": "Read the privacy policy",
        "href": "/privacy-policy"
      }
    ],
    "kw": [
      "sell",
      "spam",
      "marketing"
    ],
    "source": "src/components/PrivacyPolicy.jsx (lines 61-63)"
  },
  {
    "id": "data-retention",
    "q": [
      "how long do you keep my data",
      "data retention",
      "how long is my data stored",
      "do you delete my data",
      "retention period",
      "when is my data deleted"
    ],
    "a": "If you work together, your details are kept as long as needed to finish the project and for basic record-keeping afterward. If you don't, they're deleted within a reasonable time after the conversation ends.",
    "links": [
      {
        "label": "Read the privacy policy",
        "href": "/privacy-policy"
      }
    ],
    "kw": [
      "retention",
      "retain",
      "stored"
    ],
    "source": "src/components/PrivacyPolicy.jsx (lines 70-72)"
  },
  {
    "id": "data-rights",
    "q": [
      "delete my data",
      "my data rights",
      "access my data",
      "correct my data",
      "remove my information",
      "request my data",
      "erase my data",
      "what are my rights",
      "data deletion",
      "update my information"
    ],
    "a": "You can ask at any time what information Vasanth has about you, have it corrected, or have it deleted completely. Just email vasanthshetty.dev@gmail.com.",
    "cta": "email",
    "kw": [
      "rights",
      "deletion",
      "erase",
      "erasure"
    ],
    "source": "src/components/PrivacyPolicy.jsx (lines 79-84)"
  },
  {
    "id": "chat-privacy",
    "q": [
      "is this chat private",
      "do you save my messages",
      "chat privacy",
      "are my messages stored",
      "is this chat recorded",
      "do you store this conversation",
      "chat data",
      "does the chatbot save anything"
    ],
    "a": "This chat runs in your browser. Your messages aren't sent anywhere or stored, and they disappear when you close or refresh the page. The contact form is separate: that's the only place details are collected.",
    "kw": [
      "chat"
    ]
  },
  {
    "id": "contact",
    "q": [
      "contact you",
      "get in touch",
      "reach you",
      "how can i contact",
      "talk to vasanth",
      "talk to a human",
      "speak to someone",
      "talk to a person",
      "linkedin",
      "github",
      "social media",
      "instagram",
      "insta",
      "inquiry",
      "enquiry",
      "message you",
      "response time",
      "how fast do you reply",
      "how to contact vasanth",
      "contact form submission"
    ],
    "a": "You can reach Vasanth through the contact form or by email at vasanthshetty.dev@gmail.com. He's also on LinkedIn, GitHub, and Instagram. After you submit the form he reaches out shortly; no fixed response time is published.",
    "cta": "contact",
    "links": [
      {
        "label": "Contact form",
        "href": "#contact"
      },
      {
        "label": "LinkedIn",
        "href": "https://www.linkedin.com/in/vasanth-shetty-dev"
      },
      {
        "label": "GitHub",
        "href": "https://github.com/vasanthshettyy"
      },
      {
        "label": "Instagram",
        "href": "https://www.instagram.com/vasanthshetty.dev/"
      }
    ],
    "kw": [
      "contact",
      "reach",
      "inquiry",
      "enquiry",
      "instagram"
    ],
    "source": "src/components/ContactSection.jsx (lines 170-186)"
  },
  {
    "id": "email",
    "q": [
      "email address",
      "what is your email",
      "mail",
      "gmail",
      "your email id",
      "email id",
      "send an email",
      "mail you",
      "contact by email",
      "reach vasanth by email"
    ],
    "a": "Vasanth's email is vasanthshetty.dev@gmail.com.",
    "cta": "email",
    "kw": [
      "email",
      "gmail",
      "mail"
    ],
    "source": "src/components/PrivacyPolicy.jsx (lines 82)"
  },
  {
    "id": "phone",
    "q": [
      "phone number",
      "call you",
      "whatsapp",
      "telegram",
      "mobile number",
      "contact number",
      "can i call",
      "text you",
      "sms",
      "call me",
      "contact by phone",
      "requesting phone call"
    ],
    "a": "No phone number or WhatsApp is published on the site. The best ways to reach Vasanth are the contact form and email.",
    "cta": "contact",
    "kw": [
      "phone",
      "whatsapp",
      "number"
    ],
    "source": "src/components/ContactSection.jsx (lines 1-270)"
  },
  {
    "id": "location",
    "q": [
      "where are you located",
      "country",
      "time zone",
      "working hours",
      "availability",
      "international clients",
      "do you work remotely",
      "do you work with clients abroad",
      "are you available",
      "which country",
      "location and operating timezone",
      "remote developer timezone"
    ],
    "a": "The site doesn't list a location, working hours or the regions Vasanth serves. Everything is handled by email and messages, so ask about your location and time zone when you get in touch.",
    "cta": "email",
    "kw": [
      "location",
      "timezone",
      "city",
      "country",
      "based"
    ],
    "source": "src/components/ContactSection.jsx (lines 1-270)"
  },
  {
    "id": "call",
    "q": [
      "book a call",
      "schedule a call",
      "consultation",
      "free consultation",
      "discovery call",
      "meeting",
      "can we talk",
      "video call",
      "calendly",
      "set up a meeting",
      "book a meeting",
      "zoom"
    ],
    "a": "There's no live booking calendar on the site. The first step is a short call or message to understand your business: send an inquiry through the form or by email and Vasanth will reach out.",
    "cta": "quote",
    "kw": [
      "call",
      "zoom",
      "meet",
      "meeting",
      "discovery"
    ],
    "source": "src/data/processSteps.js (lines 5)"
  }
];

export default kb;
