// src/chatbot/kb.js
// Knowledge base for the rules-based portfolio chatbot (no LLM, runs fully in the browser).
//
// RULES (do not break these when editing):
// - Every answer must trace to the site's content (faqData, pricingData non-price fields,
//   services, processSteps, projects, PrivacyPolicy, ContactSection). Never invent facts.
// - NO PRICES. Pricing numbers in pricingData.js are intentionally never shown.
// - Never claim a Founding Client slot is open. Never volunteer location.
// - Voice: Vasanth's assistant, third person. Short answers (about 60 words or fewer).
// - REVIEW: service feature lists (booking, lead-gen, landing) come from services.js;
//   confirm they are visible in ServicesSection.jsx before shipping.
//
// Entry shape:
//   id      unique string
//   q       question variants, lowercase, no punctuation (include typos / casual phrasing)
//   a       answer text
//   links   optional [{ label, href }]  (hash = scroll to section, /path = route, https = external)
//   cta     optional: "quote" -> dispatch prefillContactQuoteNoPrice then scroll to #contact
//                     "contact" -> scroll to #contact
//                     "email" -> open mailto:vasanthshetty.dev@gmail.com

export const EMAIL = "vasanthshetty.dev@gmail.com";

export const fallback = {
  a: "I don't have an answer for that. I can only help with Vasanth's services, plans, process, payment, privacy and contact details. You can email vasanthshetty.dev@gmail.com or send a message through the contact form.",
  cta: "contact",
};

// Quick-reply chips: jump straight to an entry id (more reliable than text matching).
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
  // ---------- Conversation basics (4) ----------
  {
    id: "greeting",
    q: ["hi", "hii", "hello", "hey", "hey there", "good morning", "good afternoon", "good evening", "namaste", "yo", "hola"],
    a: "Hi! I can answer questions about Vasanth's services, plans, process, payment, privacy and how to get in touch. What would you like to know?",
  },
  {
    id: "thanks-bye",
    q: ["thanks", "thank you", "thankyou", "thx", "ty", "appreciate it", "great thanks", "bye", "goodbye", "see you", "cya", "that's all", "thats all", "ok thanks"],
    a: "You're welcome! If you'd like to talk about a project, the contact form is the quickest way to reach Vasanth.",
    cta: "contact",
  },
  {
    id: "help",
    q: ["help", "what can you do", "what can i ask", "how does this work", "menu", "options", "what do you know", "topics", "what can you help with"],
    a: "I can answer questions about Vasanth's services, plans and what's included, timelines, payment, revisions and support, his projects, the privacy policy, and how to contact him. Try one of the buttons below or just type your question.",
  },
  {
    id: "about-bot",
    q: ["are you a bot", "are you ai", "are you human", "are you a robot", "are you chatgpt", "who are you", "who am i talking to", "what are you", "is this ai", "are you real"],
    a: "I'm a simple automated assistant on Vasanth's website, not a person and not a general-purpose AI. I answer common questions using the content of this site. For anything else, email Vasanth directly.",
    cta: "email",
  },

  // ---------- About Vasanth (5) ----------
  {
    id: "who",
    q: ["who is vasanth", "who is vasanth shetty", "about vasanth", "tell me about vasanth", "about you", "tell me about yourself", "who runs this", "who built this", "who is the developer"],
    a: "Vasanth Shetty is a freelance Full-Stack Web Developer. He builds fast, custom-coded websites, AI chatbots and lead capture workflows that turn visitors into clients. No templates, no platform limitations.",
    links: [{ label: "See his work", href: "#work" }],
  },
  {
    id: "what-he-does",
    q: ["what do you do", "what does vasanth do", "what services", "services", "what do you offer", "what can you build", "what do you build", "what do you sell", "offerings", "service list"],
    a: "Vasanth offers four main services: lead generation websites, custom booking systems, high-converting landing pages, and website and landing page redesigns. He also builds AI chatbots and lead capture workflows.",
    links: [{ label: "View services", href: "#services" }],
  },
  {
    id: "for-whom",
    q: ["who do you work with", "who are your clients", "what businesses", "what industries", "who is this for", "target customers", "do you work with small business", "who do you build for", "ideal client"],
    a: "Vasanth builds websites and landing pages for service businesses and growing brands. The focus is turning visitors into clients: more leads, booked appointments and phone calls.",
    cta: "quote",
  },
  {
    id: "solo",
    q: ["why freelancer", "why not an agency", "freelancer vs agency", "why should i work with you", "why choose you", "why hire you", "solo developer", "why you", "what makes you different"],
    a: "You work directly with the person building your site: no account managers, no handoffs, no getting passed around. As a solo Full-Stack Web Developer, what Vasanth quotes is what you pay, and every decision goes through one person.",
    links: [{ label: "Why work with Vasanth", href: "#process" }],
  },
  {
    id: "custom-code",
    q: ["templates", "do you use templates", "custom code", "custom coded", "wordpress", "shopify", "wix", "squarespace", "no code", "website builder", "platform", "which platform"],
    a: "Sites are custom-coded, not built from templates, and not tied to a website-builder platform. If you need a specific platform, ask by email before starting.",
    cta: "email",
  },

  // ---------- Services (9) ----------
  {
    id: "lead-gen",
    q: ["lead generation website", "lead gen", "lead generation", "capture leads", "get more leads", "collect emails", "email capture", "click to call", "get more clients", "generate leads"],
    a: "Lead generation websites are built to capture emails and phone numbers so visitors become paying clients. Features include email capture forms, click-to-call buttons and a mobile-friendly layout.",
    links: [{ label: "View services", href: "#services" }],
  },
  {
    id: "booking",
    q: ["booking system", "online booking", "appointment booking", "book appointments", "scheduling", "calendar", "sms reminders", "appointments", "custom booking", "booking website"],
    a: "Custom booking systems let clients book appointments online automatically, saving you hours of phone calls. Features include automated scheduling, calendar syncing and SMS reminders.",
    links: [{ label: "View services", href: "#services" }],
  },
  {
    id: "landing",
    q: ["landing page", "landing pages", "single page", "one page website", "paid ads", "ads landing page", "google ads", "facebook ads", "high converting landing page", "sales page"],
    a: "A landing page is a single page built to sell one specific service or product. It's ideal if you're running paid ads and need somewhere for that traffic to convert. It includes persuasive copywriting, A/B testing readiness and fast loading speeds.",
    cta: "quote",
  },
  {
    id: "redesign",
    q: ["redesign", "website redesign", "redo my website", "old website", "outdated website", "revamp", "refresh my site", "improve my website", "modernize", "update my old site"],
    a: "Redesigns take an old, outdated site or landing page and make it look like a premium brand, with modern design, conversion rate optimization and SEO optimization, so you stand out and look like the obvious choice.",
    cta: "quote",
  },
  {
    id: "ai-chatbots",
    q: ["chatbot", "chat bot", "ai chatbot", "can you build a chatbot", "automation", "automations", "business automation", "workflows", "lead capture workflow", "ai"],
    a: "Yes. Vasanth also builds AI chatbots and lead capture workflows, as listed on this site. There's no fixed plan for these, so describe what you need and he'll scope it.",
    cta: "quote",
  },
  {
    id: "online-store",
    q: ["online store", "online stores", "ecommerce", "e commerce", "e-commerce", "shopping cart", "sell products online", "web shop", "webshop", "sell online"],
    a: "There's no set online store plan on this site. If you want one, send the details of what you need and Vasanth will scope it. Don't assume specific store features until they're confirmed in your written summary.",
    cta: "quote",
  },
  {
    id: "seo",
    q: ["seo", "search engine optimization", "google ranking", "rank on google", "rank higher", "google search", "local seo", "google business", "google my business", "technical seo"],
    a: "Sites are built with technical SEO best practices so you can rank higher on Google. Starter includes basic on-page SEO setup, Standard adds local SEO and Google Business linkage, and Growth has an advanced technical SEO foundation.",
    links: [{ label: "View plans", href: "#plans" }],
  },
  {
    id: "mobile",
    q: ["mobile", "mobile friendly", "mobile first", "responsive", "phone friendly", "works on phone", "tablet", "fast website", "speed", "loading speed", "page speed"],
    a: "Sites are built mobile-first, since most clients find businesses on their phones, and built to load fast. Starter includes mobile-optimized design and Standard adds tablet optimization.",
  },
  {
    id: "cms",
    q: ["cms", "blog", "edit my own content", "update text myself", "can i edit the site", "content management", "newsletter", "integrations", "third party integrations", "social media integration"],
    a: "The Growth plan includes a blog / CMS / resources section and third-party integrations such as booking, newsletter and social. The site doesn't say whether Starter or Standard include a CMS for editing text yourself, so ask when you request a quote. Starter Care covers occasional text and image swaps.",
    cta: "quote",
  },

  // ---------- Plans and pricing (8) ----------
  {
    id: "plans-overview",
    q: ["plans", "packages", "what plans", "service plans", "pricing plans", "what packages do you have", "tiers", "plan options", "compare plans", "plan comparison"],
    a: "There are three plans: Starter Site (1-3 pages), Small Business Standard (5-8 pages, the most popular choice) and Growth / Custom Site (8-15 pages). Every project also gets a custom scope assessment.",
    links: [{ label: "View plans", href: "#plans" }],
    cta: "quote",
  },
  {
    id: "starter",
    q: ["starter", "starter site", "starter plan", "starter package", "small website", "simple website", "brochure site", "1 to 3 pages", "basic website", "cheapest plan"],
    a: "Starter Site: 1-3 responsive pages, a quick launch, ideal for a landing page or simple brochure site. Includes mobile-optimized design, one contact form and basic on-page SEO. Timeline 1-2 weeks, 5 revision rounds, 1 month of free support.",
    links: [{ label: "View plans", href: "#plans" }],
    cta: "quote",
  },
  {
    id: "standard",
    q: ["standard", "standard plan", "small business standard", "small business plan", "most popular plan", "5 to 8 pages", "recommended plan", "standard package", "popular plan", "business website"],
    a: "Small Business Standard: 5-8 custom pages, the most popular choice (Home, About, Services, Contact plus 1-4 custom pages). Includes mobile and tablet optimization, local SEO with Google Business linkage, and a lead capture form with analytics setup. Timeline 2-3 weeks, 10 revision rounds, 2 months of free support.",
    links: [{ label: "View plans", href: "#plans" }],
    cta: "quote",
  },
  {
    id: "growth",
    q: ["growth", "growth plan", "growth site", "custom site", "growth custom", "8 to 15 pages", "big website", "advanced website", "large website", "advanced features"],
    a: "Growth / Custom Site: 8-15 bespoke pages with custom design, not a themed template. Includes a blog / CMS / resources section, third-party integrations (booking, newsletter, social) and an advanced technical SEO foundation. Timeline 3-4 weeks, 15 revision rounds, 3 months of free support.",
    links: [{ label: "View plans", href: "#plans" }],
    cta: "quote",
  },
  {
    id: "which-plan",
    q: ["which plan", "which plan should i choose", "which plan is best", "not sure which plan", "custom scope", "custom plan", "something different", "what do i need", "which package", "help me choose"],
    a: "Not sure which plan fits? Standard (5-8 pages) is the most popular. Or tell Vasanth what you're after and he'll scope it. Every project gets a custom scope assessment to fit your business goals and timeline.",
    cta: "quote",
  },
  {
    id: "care",
    q: ["care plan", "care plans", "retainer", "retainers", "maintenance plan", "monthly maintenance", "ongoing support", "starter care", "standard care", "growth care", "website maintenance"],
    a: "Each plan has an optional care retainer. Starter Care: minimal upkeep like occasional text or image swaps and an uptime check. Standard Care: regular content updates, plugin and security updates, and a monthly check-in. Growth Care: for more moving parts such as integrations, a blog and frequent updates, with priority response. Ask for details when you request a quote.",
    cta: "quote",
  },
  {
    id: "pricing",
    q: ["how much", "price", "prices", "cost", "pricing", "rates", "quote", "how much does a website cost", "what do you charge", "budget", "cheap", "affordable", "estimate", "fees", "how much for a website", "rate card", "get a quote"],
    a: "Prices aren't listed on the site because every project is scoped individually. Use the button below to describe what you need and Vasanth will get back to you with a quote.",
    links: [{ label: "View plans", href: "#plans" }],
    cta: "quote",
  },
  {
    id: "hidden-fees",
    q: ["hidden fees", "hidden costs", "monthly fees", "any extra charges", "extra costs", "recurring fees", "subscription", "no hidden fees", "additional costs", "what else will i pay"],
    a: "No hidden fees: you own the website completely, with no monthly platform fees to Vasanth. Two things are separate: hosting is paid directly to your host, and care retainers are optional. Any extra work is quoted upfront before it starts.",
  },

  // ---------- Process and timeline (5) ----------
  {
    id: "process",
    q: ["process", "how does it work", "how do you work", "steps", "workflow", "how does working together work", "what happens after i contact you", "4 step process", "four steps", "what is the process"],
    a: "Four steps: 1) A short call or message to understand your business. 2) You approve the plan and design before Vasanth builds. 3) Regular updates while he builds, no surprises. 4) You go live, and free support continues for a while after.",
    links: [{ label: "See the process", href: "#how-it-works" }],
  },
  {
    id: "timeline",
    q: ["how long", "how long does it take", "timeline", "turnaround", "delivery time", "how fast", "when will it be ready", "how many weeks", "project duration", "deadline", "time to build"],
    a: "Starter Site (1-3 pages) takes 1 to 2 weeks, Small Business Standard (5-8 pages) takes 2 to 3 weeks, and Growth / Custom (8-15 pages) takes 3 to 4 weeks. You get an exact timeline before starting.",
    links: [{ label: "View plans", href: "#plans" }],
  },
  {
    id: "start",
    q: ["how do i start", "get started", "start a project", "begin", "hire you", "work with you", "next step", "how to hire", "i want a website", "i want to work with you", "start my project"],
    a: "Send an inquiry through the contact form or by email. The first step is a short call or message so Vasanth can understand your business, then he reaches out to you.",
    links: [{ label: "Go to contact form", href: "#contact" }],
    cta: "quote",
  },
  {
    id: "need-from-me",
    q: ["what do you need from me", "what do i need to provide", "requirements", "do i need a logo", "brand colors", "content", "images", "copywriting", "i don't have a logo", "i dont have content", "what should i prepare", "photos", "text for the website"],
    a: "Not much to begin with. A logo, brand colors or inspiration sites you like help speed things up, but it's fine if you have none of that yet. Vasanth guides you through it in the kick-off conversation. The site doesn't spell out who writes copy or sources images, so ask when you get in touch.",
    cta: "contact",
  },
  {
    id: "design-approval",
    q: ["do i approve the design", "design approval", "see the design first", "mockup", "preview", "will i see it before launch", "updates during the project", "progress updates", "how will i know progress", "approve before build"],
    a: "Yes. You approve the plan and design before Vasanth builds, and you get regular updates while it's being built, so there are no surprises at the end.",
  },

  // ---------- Payment, terms and support (9) ----------
  {
    id: "payment",
    q: ["payment", "how does payment work", "payment terms", "deposit", "upfront", "advance", "pay", "40 percent", "payment schedule", "payment methods", "how do i pay", "accepted payments", "invoice"],
    a: "Payment is 40% upfront to start the project and 60% once it's complete and ready to hand over. The site doesn't list accepted payment methods or currencies, so ask by email.",
    cta: "email",
  },
  {
    id: "included",
    q: ["what's included", "whats included", "what is included", "included in the price", "what do i get", "what's in the price", "scope", "inclusions", "what does the price cover"],
    a: "You get a fully custom-built website made for your business, not a template, and you own the complete code. Included revision rounds depend on your plan: 5 for Starter, 10 for Standard and 15 for Growth.",
    links: [{ label: "View plans", href: "#plans" }],
  },
  {
    id: "revisions",
    q: ["revisions", "revision rounds", "how many revisions", "changes", "edits", "how many changes", "can i request changes", "rounds of changes", "modifications"],
    a: "Included revision rounds: 5 for Starter, 10 for Standard and 15 for Growth / Custom. Most concerns get sorted through these rounds.",
  },
  {
    id: "ownership",
    q: ["do i own the website", "ownership", "own the code", "who owns the website", "source code", "code ownership", "lock in", "lock-in", "will i own it", "do i get the code", "vendor lock in"],
    a: "Yes, completely. Once the project is done, the code is yours: no monthly fees to Vasanth, no lock-in, nothing you're renting.",
  },
  {
    id: "post-launch",
    q: ["after launch", "support after launch", "post launch", "free support", "free updates", "changes after going live", "maintenance after launch", "what if i need changes later", "small updates", "support period", "warranty"],
    a: "After launch you get free maintenance and small updates for 1 month on Starter, 2 on Standard and 3 on Growth. After that, or for bigger changes that take real time, there's a cost, and Vasanth tells you upfront before starting anything that costs extra. Optional care retainers are also available.",
  },
  {
    id: "unhappy",
    q: ["not happy", "unhappy with result", "refund", "money back", "cancel", "cancel project", "stop the project", "dissatisfied", "refund policy", "what if i dont like it", "partial refund", "cancellation"],
    a: "Most concerns get resolved through the revision rounds in your plan. If things genuinely aren't working and you want to stop partway, Vasanth works out a fair partial refund based on how much work was already completed.",
  },
  {
    id: "discount",
    q: ["discount", "discounts", "offer", "special offer", "founding client", "founding client offer", "founding client rate", "limited availability", "promo", "coupon", "deal", "cheaper rate", "is the offer still open", "are slots available"],
    a: "Yes. A Founding Client rate is offered for Vasanth's first few projects while he builds out his initial portfolio slots. I can't see whether a spot is open right now, so reach out to check.",
    cta: "contact",
  },
  {
    id: "hosting",
    q: ["hosting", "do you handle hosting", "web hosting", "hosting cost", "how much is hosting", "domain", "which host", "server", "deployment", "where will it be hosted"],
    a: "Hosting is separate and you pay the provider directly, not through Vasanth. If you're unsure which provider to pick, he's happy to help you set up a fast, secure and affordable option for your tech stack. The site doesn't list hosting costs.",
    cta: "contact",
  },
  {
    id: "contract",
    q: ["contract", "agreement", "is there a contract", "terms and conditions", "terms", "legal", "written agreement", "do you sign contracts", "nda", "terms of service", "paperwork"],
    a: "Yes, by email. Before any work starts, Vasanth emails a clear summary of scope, price, payment split, revisions included and timeline. You reply confirming, and that's your agreement, so there's always a written record. There isn't a separate terms and conditions page.",
  },

  // ---------- Projects (7) ----------
  {
    id: "projects",
    q: ["projects", "portfolio", "previous work", "past work", "examples", "show me your work", "samples", "work samples", "your work", "demos", "case study"],
    a: "The site shows four projects: AetherIntake, Meridian Assets, AXIOM Neural Interface and Vasanth's own developer portfolio. The first three are concept or personal builds that show his design and development style.",
    links: [{ label: "View projects", href: "#work" }],
  },
  {
    id: "aether",
    q: ["aetherintake", "aether intake", "clinical intake", "healthcare project", "medical project", "patient portal", "healthcare website", "tell me about aetherintake"],
    a: "AetherIntake is a concept platform exploring how AI-driven intake flows could streamline clinical onboarding, with automated scheduling, secure patient portals and intake form design. It's a personal exploration of healthcare UX, built with Next.js.",
    links: [{ label: "Visit AetherIntake", href: "https://aether-intake.vercel.app" }],
  },
  {
    id: "meridian",
    q: ["meridian", "meridian assets", "real estate project", "proptech", "property valuation", "real estate website", "tell me about meridian"],
    a: "Meridian Assets is a personal project exploring property valuation UI design: a clean, professional interface for real estate professionals and investors, showing responsive data presentation. Built with Next.js.",
    links: [{ label: "Visit Meridian Assets", href: "https://meridian-assets.vercel.app" }],
  },
  {
    id: "axiom",
    q: ["axiom", "axiom neural interface", "neural interface", "neon landing page", "scroll animation project", "product landing page", "tell me about axiom", "neural tech"],
    a: "AXIOM Neural Interface is a personal landing page concept for a fictional wrist-worn neural interface. It explores neon high-tech design, scroll-linked animations and immersive product storytelling, built with Next.js.",
    links: [{ label: "Visit AXIOM", href: "https://axiom-neon-one.vercel.app" }],
  },
  {
    id: "portfolio-site",
    q: ["developer portfolio", "your portfolio site", "engineering portfolio", "vasanth portfolio", "personal portfolio", "your own website", "portfolio website"],
    a: "Vasanth's developer portfolio was built from scratch to show full-stack engineering, interactive UI design systems and production web apps. The codebase itself is the demonstration.",
    links: [{ label: "Visit portfolio", href: "https://vasanth-shetty-portfolio.vercel.app" }],
  },
  {
    id: "client-work",
    q: ["do you have clients", "client work", "testimonials", "reviews", "experience", "previous clients", "case studies", "references", "past clients", "how many projects", "client list", "proof"],
    a: "The projects on this site are concept and personal builds that show Vasanth's style; no client case studies or testimonials are listed yet. That's why a Founding Client rate is offered for his first few projects. Ask by email if you'd like to talk about what he can do for you.",
    cta: "contact",
  },
  {
    id: "tech-stack",
    q: ["tech stack", "technologies", "what tech do you use", "react", "next js", "nextjs", "framework", "programming languages", "what do you code in", "which technology", "tailwind", "node"],
    a: "The projects on this site are built with Next.js and React, and Vasanth is a Full-Stack developer. The site doesn't say which stack each plan uses, so the stack for your site is something to confirm when your project is scoped.",
    cta: "quote",
  },

  // ---------- Privacy (7) ----------
  {
    id: "privacy",
    q: ["privacy", "privacy policy", "data policy", "is my data safe", "data protection", "what happens to my information", "gdpr", "privacy page", "personal data", "data privacy"],
    a: "Vasanth's privacy policy is short and written in plain language. It covers what's collected, what it's used for, how long it's kept, and your rights.",
    links: [{ label: "Read the privacy policy", href: "/privacy-policy" }],
  },
  {
    id: "data-collected",
    q: ["what data do you collect", "what information do you collect", "what do you collect", "data collected", "what does the form collect", "what do you store about me", "information you collect"],
    a: "When you use the contact form, Vasanth collects your name, email address and whatever project details you share. That's it.",
    links: [{ label: "Read the privacy policy", href: "/privacy-policy" }],
  },
  {
    id: "tracking",
    q: ["cookies", "tracking", "do you use cookies", "analytics", "ad pixels", "do you track me", "tracking cookies", "google analytics", "facebook pixel", "are you tracking visitors"],
    a: "The site doesn't use tracking cookies, ad pixels or analytics scripts that follow you around the web.",
    links: [{ label: "Read the privacy policy", href: "/privacy-policy" }],
  },
  {
    id: "data-use",
    q: ["what do you do with my data", "do you sell my data", "share my data", "marketing emails", "will you spam me", "newsletter list", "is my email shared", "how is my data used", "do you sell my information"],
    a: "Your information is used only to reply to you and discuss your project. It isn't sold, rented or shared with anyone else, and it isn't added to a marketing list.",
    links: [{ label: "Read the privacy policy", href: "/privacy-policy" }],
  },
  {
    id: "data-retention",
    q: ["how long do you keep my data", "data retention", "how long is my data stored", "do you delete my data", "retention period", "when is my data deleted"],
    a: "If you work together, your details are kept as long as needed to finish the project and for basic record-keeping afterward. If you don't, they're deleted within a reasonable time after the conversation ends.",
    links: [{ label: "Read the privacy policy", href: "/privacy-policy" }],
  },
  {
    id: "data-rights",
    q: ["delete my data", "my data rights", "access my data", "correct my data", "remove my information", "request my data", "erase my data", "what are my rights", "data deletion", "update my information"],
    a: "You can ask at any time what information Vasanth has about you, have it corrected, or have it deleted completely. Just email vasanthshetty.dev@gmail.com.",
    cta: "email",
  },
  {
    id: "chat-privacy",
    q: ["is this chat private", "do you save my messages", "chat privacy", "are my messages stored", "is this chat recorded", "do you store this conversation", "chat data", "does the chatbot save anything"],
    a: "This chat runs in your browser. Your messages aren't sent anywhere or stored, and they disappear when you close or refresh the page. The contact form is separate: that's the only place details are collected.",
  },

  // ---------- Contact (5) ----------
  {
    id: "contact",
    q: ["contact", "contact you", "get in touch", "reach you", "how can i contact", "talk to vasanth", "talk to a human", "speak to someone", "talk to a person", "linkedin", "github", "social media", "inquiry", "enquiry", "message you", "response time", "how fast do you reply"],
    a: "You can reach Vasanth through the contact form or by email at vasanthshetty.dev@gmail.com. He's also on LinkedIn and GitHub. After you submit the form he reaches out shortly; no fixed response time is published.",
    links: [
      { label: "Contact form", href: "#contact" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/vasanth-shetty-dev" },
      { label: "GitHub", href: "https://github.com/vasanthshettyy" },
    ],
    cta: "contact",
  },
  {
    id: "email",
    q: ["email", "email address", "what is your email", "mail", "gmail", "your email id", "email id", "send an email", "mail you"],
    a: "Vasanth's email is vasanthshetty.dev@gmail.com.",
    cta: "email",
  },
  {
    id: "phone",
    q: ["phone", "phone number", "call you", "whatsapp", "telegram", "mobile number", "contact number", "can i call", "text you", "sms", "call me"],
    a: "No phone number or WhatsApp is published on the site. The best ways to reach Vasanth are the contact form and email.",
    cta: "contact",
  },
  {
    id: "location",
    q: ["where are you based", "location", "where are you located", "country", "time zone", "timezone", "working hours", "availability", "international clients", "do you work remotely", "do you work with clients abroad", "are you available", "which country"],
    a: "The site doesn't list a location, working hours or the regions Vasanth serves. Everything is handled by email and messages, so ask about your location and time zone when you get in touch.",
    cta: "email",
  },
  {
    id: "call",
    q: ["book a call", "schedule a call", "consultation", "free consultation", "discovery call", "meeting", "can we talk", "video call", "calendly", "set up a meeting", "book a meeting", "zoom"],
    a: "There's no live booking calendar on the site. The first step is a short call or message to understand your business: send an inquiry through the form or by email and Vasanth will reach out.",
    cta: "quote",
  },
];

export default kb;
