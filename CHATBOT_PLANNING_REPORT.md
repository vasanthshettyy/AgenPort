# CHATBOT PLANNING REPORT: PORTFOLIO AUDIT & SPECIFICATION

**Project:** Vasanth Shetty Portfolio (`https://dev-vasanth.vercel.app/`)  
**Audit Type:** Read-Only Codebase Inspection & Architecture Audit for AI Website Chatbot  
**Report Generated:** November 21, 2026  

---

## 1. STACK

### Framework & Architecture
* **Framework:** React 19 SPA running on **Vite 8** (`vite v8.0.12`, `@vitejs/plugin-react v6.0.1`).
  * *Important Framework Note:* The user prompt asked to audit "this Next.js project". Inspection of `package.json` confirms this project is **not** a Next.js application; it is a **Vite + React 19 Client-Side Single-Page Application (SPA)** with client-side routing via `window.location.pathname` and `popstate` events. (Next.js is only referenced as a developer skill and project stack item in `src/data/techStack.js` and `src/data/projects.js`).
* **Serverless Backend:** Vercel Serverless Function at `/api/contact` (`api/contact.js`, Node.js ESM handler).
* **Language:** JavaScript (ESM, JSX, `.js` / `.jsx`), with TypeScript types declared for React (`@types/react ^19.2.14`, `@types/react-dom ^19.2.3`).
* **Styling Approach:** **Tailwind CSS v3** (`tailwindcss ^3.4.19`, `postcss ^8.5.15`, `autoprefixer ^10.5.0`) with custom utility and component layers in `src/index.css` and CSS variables in `src/App.css`.
* **Animation & Motion Libraries:**
  * **GSAP:** `gsap ^3.15.0`
  * **GSAP React Integration:** `@gsap/react ^2.1.2` (utilizing `useGSAP` hook)
  * **GSAP Plugins:** `ScrollTrigger`
  * **Smooth Scrolling:** `@studio-freight/lenis ^1.0.42` (with ticker synchronization into GSAP)
  * **Canvas Motion:** Custom 2D HTML5 Canvas interactive reveal (`HeroCursorReveal.jsx`)
* **Package Manager:** `npm` (lockfile present at `package-lock.json`).

### Complete Dependencies with Exact Versions (`package.json`)
```json
{
  "dependencies": {
    "@gsap/react": "^2.1.2",
    "@studio-freight/lenis": "^1.0.42",
    "gsap": "^3.15.0",
    "react": "^19.2.6",
    "react-dom": "^19.2.6",
    "react-helmet-async": "^3.0.0",
    "sweetalert2": "^11.26.25",
    "zod": "^4.4.3"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.1",
    "autoprefixer": "^10.5.0",
    "eslint": "^10.3.0",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.2",
    "globals": "^17.6.0",
    "postcss": "^8.5.15",
    "tailwindcss": "^3.4.19",
    "vite": "^8.0.12"
  }
}
```

### Layout Hierarchy & Global Mounting Location
* **Root Application Entry:** `src/main.jsx`
  ```jsx
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </React.StrictMode>
  );
  ```
* **Application Shell / Router:** `src/App.jsx`
  * Manages routing via state: `const [currentPath, setCurrentPath] = useState(window.location.pathname);`
  * Handles two primary route views:
    1. `/privacy-policy` or `/privacy-policy/`: Renders `<SmoothScroll>`, `<CustomCursor />`, `<Header />`, `<main><PrivacyPolicy /></main>`, `<Footer />`.
    2. `/` or `/index.html`: Renders `<SmoothScroll>`, `<CustomCursor />`, `<ScrollProgress />`, `<Helmet>`, `<Header />`, `<main><Hero /><ValueSection /><ServicesSection /><ProcessSection /><PricingSection /><ProjectGrid /><FaqSection /><ContactSection /></main>`, `<Footer />`, and `<FloatingBadge />`.
    3. Any other path: `<NotFound />`.
* **Recommended Mounting Point for Global Chatbot Component:**
  * Mount inside `src/App.jsx` as a direct sibling to `<FloatingBadge />` right before the closing `</SmoothScroll>` tag:
    ```jsx
    <FloatingBadge />
    <ChatbotLauncher />
    ```
  * Mounting here guarantees the chatbot stays mounted continuously during on-page scrolling, across anchor jumps, and during navigation between `/` and `/privacy-policy`.

---

## 2. DESIGN TOKENS (exact values)

### Colors (from `tailwind.config.js`, `src/App.css`, and `src/index.css`)
* **Canvas / Backgrounds:**
  * `canvas.DEFAULT`: `#0a0a0a` (`--bg: #0a0a0a`)
  * `canvas.surface`: `#121212`
  * `canvas.card`: `#121212`
  * `canvas.border`: `#1f1f1f`
  * `canvas.hover`: `#1f1f1f`
  * `canvas/85`: `rgba(10, 10, 10, 0.85)` (used in Header)
  * `canvas/90`: `rgba(10, 10, 10, 0.90)` (used in FloatingBadge)
  * `canvas/95`: `rgba(10, 10, 10, 0.95)` (used in Mobile Nav Drawer)
* **Text / Content:**
  * `content.primary`: `#f5f5f7` (`--content-primary: #f5f5f7`, pure off-white)
  * `content.secondary`: `#c4c4c8` in `tailwind.config.js`, `#a1a1a6` in `src/App.css` (`--content-secondary`), `#888` / `#9ca3af` used in GSAP fallbacks
  * `content.border`: `#1f1f1f`
* **Accents / Highlights:**
  * `accent.primary` / `content.accent` / `content.neon`: `#00e5ff` (`--accent: #00e5ff`, bright cyan)
  * `accent.secondary`: `#f5f5f7`
* **Gradients & Glows:**
  * Cyan Neon Glow Bloom: `rgba(0, 229, 255, 0.10)` (`bg-content-neon/10 blur-[100px]`)
  * Shimmer / Shine Sweep: `linear-gradient(90deg, transparent 0%, rgba(0, 229, 255, 0.25) 50%, transparent 100%)`
  * Process Line Gradient: `linear-gradient(to right, rgba(0, 229, 255, 0.2), rgba(0, 229, 255, 0.4), rgba(0, 229, 255, 0.2))`
  * 404 Gradient: `linear-gradient(to bottom right, #00e5ff, #f5f5f7)`

### Typography
* **Font Families:**
  * Primary Sans: `Inter, Outfit, Space Grotesk, sans-serif` (loaded via Google Fonts: `Inter:wght@300;400;500;600;700;800;900` and `Space Grotesk:wght@500;700`)
  * Monospace: System `font-mono` (used for category tags, step numbers, timestamps, badges, and small metadata labels)
* **Font Weights:** `font-light` (300), `font-normal` (400), `font-medium` (500), `font-semibold` (600), `font-bold` (700), `font-extrabold` (800), `font-black` (900).
* **Headings & Body Scale:**
  * `text-massive`: `clamp(2rem, 8vw, 6rem)` (line-height: `0.9`, letter-spacing: `-0.05em`)
  * `text-giant`: `clamp(1.5rem, 4vw, 3.5rem)` (line-height: `1`, letter-spacing: `-0.04em`)
  * `text-mobile-h1`: `clamp(1.75rem, 5vw, 2.5rem)` (line-height: `0.95`, letter-spacing: `-0.03em`)
  * `text-mobile-h2`: `clamp(1.5rem, 4vw, 2.25rem)` (line-height: `1`, letter-spacing: `-0.02em`)
  * `text-mobile-h3`: `clamp(1.25rem, 3vw, 1.75rem)` (line-height: `1.1`, letter-spacing: `-0.01em`)
  * Body: `text-base` (16px), `text-lg` (18px), `text-xl` (20px) with `leading-relaxed`
  * Small labels / captions: `text-xs` (12px), `text-[10px]` (10px), `text-[9px]` (9px) with `uppercase tracking-widest` or `tracking-[0.2em]`

### Radii, Shadows, Blur & Borders
* **Border Radii:**
  * Full Pill: `rounded-full` (buttons, status tags, floating badge, custom cursor)
  * Cards / Containers: `rounded-2xl` (16px), `rounded-3xl` (24px)
  * Inner Elements: `rounded-xl` (12px), `rounded-md` (6px)
* **Shadows:**
  * Accent Box Shadows: `shadow-[0_0_30px_rgba(0,229,255,0.25)]`, `shadow-[0_8px_30px_rgba(0,229,255,0.2)]`, `shadow-[0_0_30px_rgba(0,229,255,0.08)]`
  * Process Card Hover Shadow: `shadow-[0_12px_40px_-5px_rgba(0,229,255,0.28),0_0_25px_rgba(0,229,255,0.12)]`
  * Floating Badge Shadow: `shadow-[0_4px_20px_rgba(0,0,0,0.5)]`
* **Blur / Glassmorphism:**
  * `backdrop-blur-md` (Header & FloatingBadge)
  * `backdrop-blur-xl` (Mobile navigation drawer)

### Button Interaction Patterns
* **Bottom-to-Top Wipe Fill:**
  * Container: `relative overflow-hidden`
  * Text: `.btn-fill-text` / `.btn-fill-text-btn` (z-index: 10, transitions color)
  * Fill layer: `.btn-fill-layer` / `.btn-fill-layer-btn` (starts at `translateY(calc(100% + 2px))`, on hover animates to `translateY(0)` with `transition: transform 300ms cubic-bezier(0.4, 0, 1, 1)`)

### Motion, Durations & Easing Curves
* **Lenis Smooth Scroll:** `duration: 1.5`, `easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))`
* **GSAP Timings & Curves:**
  * Header slide-in: `duration: 1.2`, `ease: 'power4.out'`
  * Hero elements: `duration: 0.7 - 1.0`, `ease: 'expo.out'`
  * Card entrance / stagger: `duration: 0.8 - 0.85`, `ease: 'power3.out'`, `stagger: 0.13 - 0.15`
  * Accordion FAQ expansion: `grid-template-rows 400ms cubic-bezier(0.4, 0, 0.2, 1)`, `opacity 400ms`
  * Floating badge hover bounce: `transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1)`
  * Rotating hero words: `animation: heroWordSlide 500ms cubic-bezier(0.16, 1, 0.3, 1)`
* **Reduced Motion:** Handled globally in `src/index.css` via `@media (prefers-reduced-motion: reduce)` reducing animations to `0.01ms`, and programmatically in JS components (`matchMedia('(prefers-reduced-motion: reduce)')`).

### Dark / Light Mode Handling
* **Theme:** **Exclusively Dark Mode** (`#0a0a0a` background, `#f5f5f7` text, `#00e5ff` cyan accent).
* There is no light mode switch, no `dark:` prefix switching, and no theme toggle component. The UI is designed strictly as a high-contrast dark aesthetic.

### Fixed & Floating Elements with Exact Z-Index Hierarchy
| Element | Selector / Component | Position | Z-Index | Collision Note for Chatbot Launcher |
| :--- | :--- | :--- | :--- | :--- |
| **Custom Cursor Dot** | `CustomCursor.jsx` | Fixed top-left | `z-[9999]` | Pointer-events none, will hover over chat |
| **Scroll Progress Bar** | `ScrollProgress.jsx` | Fixed top-left (2px line) | `z-[9999]` | Pointer-events none, top of viewport |
| **Custom Cursor Ring** | `CustomCursor.jsx` | Fixed top-left | `z-[9998]` | Pointer-events none, will hover over chat |
| **Site Header (Navbar)**| `Header.jsx` | Fixed top-0 | `z-50` | Above normal content |
| **Mobile Menu Drawer** | `Header.jsx` | Fixed inset-0 | `z-40` | Fullscreen mobile drawer |
| **Floating Badge** | `FloatingBadge.jsx` | `bottom-4 left-1/2` (mobile) / `bottom-6 right-6` (desktop) | `z-40` | **DIRECT COLLISION HAZARD!** The "FOUNDING CLIENT OFFER" badge is currently pinned to `bottom-6 right-6` on desktop. If a chat launcher orb is placed at `bottom-6 right-6`, it will overlap or collide with this badge unless the badge or launcher is offset. |

---

## 3. FULL CONTENT INVENTORY

Verbatim user-visible text extracted across all pages, sections, and source files.

### A. Navigation & Header (`Header.jsx`, `navigation.js`)
* **Logo Brand:** `VASANTH SHETTY`
* **Nav Links:**
  * `Services` (href: `#services`)
  * `Work` (href: `#work`)
  * `Plans` (href: `#plans`)
  * `Why Me` (href: `#process`)
  * `FAQ` (href: `#faq`)
* **Header CTA Button (Desktop):** `CONTACT` (href: `#contact`)
* **Mobile Drawer CTA Button:** `Get in Touch` (href: `#contact`)
* **Services Dropdown definitions (`src/data/navigation.js`):**
  * `Lead Generation Websites`: "Websites designed specifically to capture leads and turn visitors into paying clients."
  * `Custom Booking Systems`: "Automated online scheduling so clients can book appointments 24/7 without phone calls."
  * `High-Converting Landing Pages`: "Single-page sites engineered to sell a specific service and maximize ad campaign ROI."
  * `Website Redesigns`: "Modernize outdated sites to build instant trust and stand out from competitors."

### B. Hero Section (`Hero.jsx`)
* **Overline & Headline:**
  * Line 1: `FREELANCE WEB`
  * Line 2: `DEVELOPER FOR GROWING BRANDS:`
  * Line 3 (Rotating cycler words):
    1. `LANDING PAGES.`
    2. `LEAD GEN SITES.`
    3. `ONLINE STORES.`
    4. `CUSTOM WEBSITES.`
* **Subtext:**
  `"I'm Vasanth Shetty, a Full-Stack Web Developer. I build fast, custom-coded websites, AI chatbots, and lead capture workflows that turn visitors into clients. No templates. No platform limitations."`
* **CTA Button:** `Start a Project` (scrolls to `#contact`)
* **Hero Image Alt Text:** `Vasanth Shetty — Web Developer`

### C. Value Proposition Section (`ValueSection.jsx`)
Section ID: `#process`
* **Card 01:**
  * Number: `01 /`
  * Badge / Stat: `More Leads` / `Higher ROI`
  * Title: `CONVERSION`
  * Description: `"Built to turn your website visitors into booked appointments and phone calls."`
* **Card 02:**
  * Number: `02 /`
  * Badge / Stat: `Mobile Optimized` / `Mobile Ready`
  * Title: `MOBILE-FIRST`
  * Description: `"The majority of your clients find you on their phones. I ensure a flawless mobile experience."`
* **Card 03:**
  * Number: `03 /`
  * Badge / Stat: `Google Search Ready` / `Rank Higher`
  * Title: `SEO FOCUSED`
  * Description: `"Built with technical SEO best practices so you naturally rank higher on Google search results."`
* **Card 04:**
  * Number: `04 /`
  * Badge / Stat: `Always Live` / `99.9% Uptime`
  * Title: `RELIABILITY`
  * Description: `"Your business runs around the clock, and your website should too. Lightning fast with zero downtime."`
* **Card 05:**
  * Number: `05 /`
  * Badge / Stat: `Zero Lock-In` / `100% Yours`
  * Title: `NO HIDDEN FEES`
  * Description: `"You own your website completely. No hostage situations, no expensive monthly platform taxes."`

### D. Services Section (`ServicesSection.jsx`, `services.js`)
Section ID: `#services`
* **Heading:** `SERVICES`
* **Item 01:**
  * Title: `Lead Generation Websites`
  * Description: `"Websites designed specifically to capture emails and phone numbers so you can turn visitors into paying clients."`
  * Features (in data): `Email Capture Forms`, `Click-To-Call Buttons`, `Mobile Friendly`
* **Item 02:**
  * Title: `Custom Booking Systems`
  * Description: `"Get clients to book appointments online automatically, saving you hours of phone calls."`
  * Features (in data): `Automated Scheduling`, `Calendar Syncing`, `SMS Reminders`
* **Item 03:**
  * Title: `High-Converting Landing Pages`
  * Description: `"A single page built to sell one specific service or product — ideal if you're running paid ads and need somewhere for that traffic to convert."`
  * Features (in data): `Persuasive Copywriting`, `A/B Testing Ready`, `Fast Loading Speeds`
* **Item 04:**
  * Title: `Website & Landing Page Redesigns`
  * Description: `"Take an old, outdated site or landing page and make it look like a premium brand. Stand out and look like the obvious choice."`
  * Features (in data): `Modern Design`, `Conversion Rate Optimization`, `SEO Optimized`

### E. Process Section (`ProcessSection.jsx`, `processSteps.js`)
Section ID: `#how-it-works`
* **Eyebrow:** `HOW WORKING TOGETHER WORKS`
* **Heading:** `Simple 4-Step Process.`
* **Subtext:** `"From initial chat to post-launch support — clear, direct, and hassle-free."`
* **Step 01:**
  * Tag: `STEP 01`
  * Title: `"What do you need?"`
  * Description: `"A short call or message to understand your business."`
* **Step 02:**
  * Tag: `STEP 02`
  * Title: `"What will it look like?"`
  * Description: `"You approve the plan and design before I build."`
* **Step 03:**
  * Tag: `STEP 03`
  * Title: `"How's it going?"`
  * Description: `"Regular updates while I build, no surprises at the end."`
* **Step 04:**
  * Tag: `STEP 04`
  * Title: `"You're live"`
  * Description: `"Site launches, and free support continues for a while after."`

### F. Pricing & Service Plans Section (`PricingSection.jsx`, `pricingData.js`)
Section ID: `#plans`
* **Eyebrow:** `SERVICE PLANS & SCOPES`
* **Heading:** `Service Plans.`
* **Subtext:** `"Three plans covering most small business needs - pick one, or tell me what you are after and I will scope it."`
* **Footnote Notice:** `"Every project receives a custom scope assessment to fit your exact business goals and timeline."`
* **Plan 1: Starter Site**
  * Tag: `Starter Tier`
  * Subtitle: `1-3 Pages - Quick Launch`
  * Popular: `false`
  * Description: `"Landing page or simple brochure site. Mobile-friendly, one contact form, basic on-page setup."`
  * Included Deliverables:
    * `- 1-3 Responsive Pages`
    * `- Mobile-Optimized Design`
    * `- 1 Contact Form Integration`
    * `- Basic On-Page SEO Setup`
  * Retainer:
    * Name: `Starter Care`
    * Label: `Optional Retainer`
    * Description: `"Minimal upkeep - occasional text/image swap, uptime check."`
  * CTA Button: `Request Custom Quote ->`
* **Plan 2: Small Business Standard**
  * Tag: `Recommended` (Pill badge: `Recommended`)
  * Subtitle: `5-8 Pages - Most Popular Choice`
  * Popular: `true`
  * Description: `"Your bread-and-butter offering. Home, About, Services, Contact, plus 1-4 more custom pages."`
  * Included Deliverables:
    * `- 5-8 Custom Pages`
    * `- Mobile & Tablet Optimization`
    * `- Local SEO Setup & Google Business Linkage`
    * `- Lead Capture Form & Analytics Setup`
  * Retainer:
    * Name: `Standard Care`
    * Label: `Optional Retainer`
    * Description: `"Regular content updates, plugin/security updates, monthly check-in."`
  * CTA Button: `Request Custom Quote ->`
* **Plan 3: Growth / Custom Site**
  * Tag: `Growth Tier`
  * Subtitle: `8-15 Pages - Advanced Features`
  * Popular: `false`
  * Description: `"Custom design (not just a themed template), blog or resources section, more integrations."`
  * Included Deliverables:
    * `- 8-15 Bespoke Custom Pages`
    * `- Blog / CMS / Resources Section`
    * `- Third-Party Integrations (Booking, Newsletter, Social)`
    * `- Advanced Technical SEO Foundation`
  * Retainer:
    * Name: `Growth Care`
    * Label: `Optional Retainer`
    * Description: `"More moving parts - integrations, blog, frequent updates, priority response."`
  * CTA Button: `Request Custom Quote ->`

### G. Projects Section (`ProjectGrid.jsx`, `projects.js`)
Section ID: `#work`
* **Heading:** `PROJECTS`
* **Project 01: AetherIntake**
  * Niche: `Clinical Intake`
  * Problem Statement: `"A concept platform exploring how AI-driven intake flows could streamline clinical onboarding. Built to demonstrate automated scheduling, secure patient portals, and intake form design — a personal exploration of healthcare UX."`
  * Tech Stack Tags: `Next.js`, `Healthcare`, `AI`, `SaaS`
  * Live URL: `https://aether-intake.vercel.app`
  * Button: `VIEW PROJECT` / `Visit Site ->`
* **Project 02: Meridian Assets**
  * Niche: `Proptech`
  * Problem Statement: `"A personal project exploring property valuation UI design — a clean, professional interface for real estate professionals and investors, built to demonstrate responsive data presentation and valuation engine design."`
  * Tech Stack Tags: `Next.js`, `Real Estate`, `Web App`
  * Live URL: `https://meridian-assets.vercel.app`
  * Button: `VIEW PROJECT` / `Visit Site ->`
* **Project 03: AXIOM Neural Interface**
  * Niche: `Neural Tech`
  * Problem Statement: `"A personal product landing page concept for AXIOM, a fictional wrist-worn neural interface. Built to explore high-tech neon aesthetic design, scroll-linked animations, and immersive product storytelling using Next.js."`
  * Tech Stack Tags: `Next.js`, `Product Design`, `Neural Tech`, `Landing Page`
  * Live URL: `https://axiom-neon-one.vercel.app`
  * Button: `VIEW PROJECT` / `Visit Site ->`
* **Project 04: Vasanth Shetty Portfolio**
  * Niche: `Engineering Portfolio`
  * Problem Statement: `"My developer portfolio — built from scratch to showcase full-stack engineering capabilities, interactive UI design systems, and production web applications. The codebase itself is the demonstration."`
  * Tech Stack Tags: `React`, `Next.js`, `Full-Stack`, `Portfolio`
  * Live URL: `https://vasanth-shetty-portfolio.vercel.app`
  * Button: `VIEW PROJECT` / `Visit Site ->`

### H. Contact Section (`ContactSection.jsx`)
Section ID: `#contact`
* **Heading:** `Work Together.`
* **Sub-headline:** `Let's build your new website.`
* **Contact Direct Channels:**
  * Email: `vasanthshetty.dev@gmail.com`
  * LinkedIn: `LinkedIn` (`https://www.linkedin.com/in/vasanth-shetty-dev`)
  * GitHub: `GitHub` (`https://github.com/vasanthshettyy`)
* **Form Placeholders & Default Text:**
  * Name field: `YOUR NAME`
  * Email field: `YOUR EMAIL`
  * Details field placeholder: `PROJECT DETAILS / PACKAGE INTEREST`
  * Default Details value: `"Hi Vasanth, I'm interested in building a custom web project for my business. Could we discuss the scope and project requirements?"`
* **Submit Button:** `SUBMIT INQUIRY`
* **Privacy Disclosure Line:**
  `"By submitting, you agree to our Privacy Policy."` (with `Privacy Policy` linking to `/privacy-policy` with `target="_blank" rel="noopener noreferrer"`).
* **SweetAlert2 Feedback Popups:**
  * Success Title: `ENQUIRY RECEIVED`
  * Success Text: `I will reach out to you shortly.`
  * Error Title: `SYSTEM ERROR`
  * Error Text: `Please contact me directly.`

### I. Footer (`Footer.jsx`)
* **Title:** `VASANTH SHETTY`
* **Tagline:** `"Building custom, high-converting websites and landing pages for service businesses."`
* **Footer Navigation Links:** `SERVICES`, `WORK`, `PLANS`, `WHY ME`, `FAQ`, `CONTACT`
* **Copyright Notice:** `© 2026 VASANTH SHETTY. ALL RIGHTS RESERVED.`
* **Footer Policy Link:** `PRIVACY POLICY` (`/privacy-policy`)

### J. Floating Badge (`FloatingBadge.jsx`)
* **Pill Text:** `FOUNDING CLIENT OFFER • LIMITED AVAILABILITY`
* **Aria Label:** `Founding client offer - Limited availability. Click to contact.`
* **Action:** Scrolls smoothly to `#contact`.

### K. 404 Page (`NotFound.jsx`)
* **Code:** `404`
* **Heading:** `Page Not Found`
* **Message:** `"The page you are looking for has been moved or does not exist."`
* **Button:** `Return to Home` (links to `/`)

### L. Other Unrendered Data in Repository
* **`src/data/techStack.js`:** Tech list with categories and descriptions (`React.js`, `Next.js`, `Tailwind CSS`, `TypeScript`, `Node.js`, `Express.js`, `PostgreSQL`, `MongoDB`, `Vercel`, `Stripe`). Note: This file is preserved in the repository but not actively rendered in any component.
* **`src/data/testimonials.js`:** 4 placeholder testimonial objects (`Placeholder Name - SaaS Startup`, `Operations Director - Logistics Firm`, `E-commerce Founder - Retail Brand`, `CTO - Fintech`). Note: Preserved in the repository but not actively rendered.
* **`public/llms.txt`:** Context document for LLMs stating location (Karnataka, India), bio, and links.

### Routes and Anchors Summary
* **Routes:**
  * `/` (Home single-page application)
  * `/index.html` (Alias to `/`)
  * `/privacy-policy` (and `/privacy-policy/`)
  * `*` (Catch-all 404 page)
* **Anchor IDs:**
  * `#hero`: Hero section
  * `#process`: Value Proposition section ("Why Me" in navigation)
  * `#services`: Services accordion section
  * `#how-it-works`: 4-step process section
  * `#plans`: Pricing & Service Plans section
  * `#work`: Projects showcase grid
  * `#faq`: Frequently Asked Questions section
  * `#contact`: Contact & Inquiry form

---

## 4. FAQ AND POLICIES

### Full Verbatim FAQ (`src/data/faqData.js`)

1. **Question:** How long does a project take?  
   **Answer:** `"It depends on what you need. A Starter Site (1-3 pages) takes 1 to 2 weeks, a Small Business Standard site (5-8 pages) takes 2 to 3 weeks, and a Growth or Custom site (8-15 pages) takes 3 to 4 weeks. You'll get an exact timeline before we start, so there are no surprises."`  
   *Tag:* TIMELINE AND SPEED

2. **Question:** How does payment work?  
   **Answer:** `"40% upfront to start the project, and the remaining 60% once it's complete and ready to hand over."`  
   *Tag:* PAYMENT TERMS

3. **Question:** What's included in the price?  
   **Answer:** `"You get a fully custom built website made just for your business, not a template. You own the complete code once it's done. Depending on your plan, you also get included revision rounds: 5 rounds for Starter Site, 10 for Small Business Standard, and 15 for Growth/Custom Site."`  
   *Tag:* SCOPE AND VALUE

4. **Question:** Will I own my website?  
   **Answer:** `"Yes, completely. Once the project is done, the code is yours. No monthly fees to me, no lock in, nothing you're renting."`  
   *Tag:* 100% OWNERSHIP

5. **Question:** Why should I work with a solo freelancer instead of an agency?  
   **Answer:** `"You get to work directly with the person actually building your site — no account managers, no handoffs between departments, no getting passed around. As a solo Full-Stack Web Developer, what I quote is what you pay, and every decision goes through one person who's fully invested in getting it right for you."`  
   *Tag:* DIRECT COLLABORATION

6. **Question:** What do you need from me to get started?  
   **Answer:** `"Not much to begin with. If you already have a logo, brand colors, or any inspiration sites you like the look of, that helps speed things up. But if you don't have any of that yet, that's completely fine too — I will guide you through it during our initial kick-off conversation."`  
   *Tag:* ONBOARDING

7. **Question:** What if I need changes after the site goes live?  
   **Answer:** `"You get free maintenance and small updates for 1 to 3 months after launch, depending on your plan. After that, or if the changes are big enough to take real time, there's a cost, but I'll always tell you upfront before starting anything that costs extra."`  
   *Tag:* POST-LAUNCH SUPPORT

8. **Question:** What if I'm not happy with the final result?  
   **Answer:** `"Most concerns get sorted through the revision rounds included in your plan — that's exactly what they're there for. If things genuinely aren't working out and you want to stop the project partway through, I'll work out a fair partial refund based on how much work was already completed, rather than an all-or-nothing outcome."`  
   *Tag:* SATISFACTION AND REFUNDS

9. **Question:** Do you offer any discounts?  
   **Answer:** `"Yes. As I'm building out initial portfolio slots, I'm offering a Founding Client rate for my first few projects. Reach out to check if a spot is currently available."`  
   *Tag:* SPECIAL OFFERS

10. **Question:** Do you handle hosting?  
    **Answer:** `"Hosting is separate and you'll pay for it directly, not through me. If you're not sure which hosting provider to pick, I'm happy to help you set up a fast, secure, and affordable option tailored to your tech stack."`  
    *Tag:* HOSTING AND INFRA

11. **Question:** Is there a contract or agreement?  
    **Answer:** `"Yes. Before any work starts, I email you a clear summary — scope, price, payment split, revisions included, and timeline. You reply confirming you're good with it, and that's our agreement. Everything's handled over email, so there's always a written record of exactly what we agreed to."`  
    *Tag:* LEGAL AND TERMS

---

### Policies Verbatim

#### Privacy Policy (`src/components/PrivacyPolicy.jsx`)
* **Route:** `/privacy-policy`
* **Last Updated:** `September 4, 2026`
* **Full Verbatim Text:**
  > "I'm Vasanth Shetty, and this is a simple explanation of what happens with your information when you use this website or get in touch with me.
  > 
  > **What I collect**  
  > When you fill out the contact form, I collect your name, email address, and whatever project details you share. That's it. I don't use tracking cookies, ad pixels, or analytics scripts that follow you around the web.
  > 
  > **What I do with it**  
  > I use your information for one reason: to reply to you and discuss your project. I don't sell it, rent it, or share it with anyone else. It doesn't get added to a marketing list or used for anything beyond the conversation you started.
  > 
  > **How long I keep it**  
  > If we end up working together, I'll keep your details for as long as needed to complete the project and for basic record-keeping afterward. If we don't end up working together, I'll delete your information within a reasonable time after our conversation ends.
  > 
  > **Your rights**  
  > You can ask me at any time to tell you what information I have about you, correct it, or delete it completely. Just email me at vasanthshetty.dev@gmail.com and I'll take care of it.
  > 
  > **Changes to this policy**  
  > If anything here changes, I'll update this page. I won't make changes that reduce your rights without saying so clearly.
  > 
  > **Questions**  
  > If you have any questions about this, email me directly at vasanthshetty.dev@gmail.com."

#### Terms of Service / Agreement
* **Status:** **NOT FOUND** as a standalone legal document or page.
* *Policy Quoted from FAQ #11:* Handled as an informal email confirmation contract:
  > "Before any work starts, I email you a clear summary — scope, price, payment split, revisions included, and timeline. You reply confirming you're good with it, and that's our agreement. Everything's handled over email, so there's always a written record of exactly what we agreed to."

#### Cookie Policy
* **Status:** **NOT FOUND** as a separate page.
* *Explicit statement from Privacy Policy:*
  > "I don't use tracking cookies, ad pixels, or analytics scripts that follow you around the web."

---

### Verbatim Pricing, Timelines, Payment & Terms Table
Defined in `src/data/pricingData.js` and `src/data/faqData.js`:

| Plan | Pages / Scope | Timeline | Included Revisions | Free Support Period |
| :--- | :--- | :--- | :--- | :--- |
| **Starter Site** | 1–3 Responsive Pages | 1 to 2 weeks | 5 rounds | 1 month |
| **Small Business Standard** | 5–8 Custom Pages | 2 to 3 weeks | 10 rounds | 2 months |
| **Growth / Custom Site** | 8–15 Bespoke Pages | 3 to 4 weeks | 15 rounds | 3 months |

#### Market Pricing Stored in `pricingData.js`:
*(Note: Pricing numbers are stored in `pricingData.js` across 6 currencies, though on the live UI, cards render the CTA button `Request Custom Quote ->` instead of displaying hardcoded prices directly).*

* **Starter Site:**
  * New Zealand (NZ): `NZ$1,100` (Care: `NZ$125/mo`)
  * Australia (AU): `A$1,000` (Care: `A$150/mo`)
  * Denmark (DK): `kr 7,900` (Care: `kr 1,200/mo`)
  * Singapore (SG): `S$1,000` (Care: `S$150/mo`)
  * Ireland / EU (IE): `EUR 625` (Care: `EUR 100/mo`)
  * India (IN): `INR 10,000` (Care: `INR 1,500/mo`)
* **Small Business Standard:**
  * New Zealand (NZ): `NZ$3,350` (Care: `NZ$215/mo`)
  * Australia (AU): `A$3,100` (Care: `A$350/mo`)
  * Denmark (DK): `kr 21,250` (Care: `kr 2,500/mo`)
  * Singapore (SG): `S$2,650` (Care: `S$300/mo`)
  * Ireland / EU (IE): `EUR 1,950` (Care: `EUR 220/mo`)
  * India (IN): `INR 28,000` (Care: `INR 3,500/mo`)
* **Growth / Custom Site:**
  * New Zealand (NZ): `NZ$6,400` (Care: `NZ$350/mo`)
  * Australia (AU): `A$5,800` (Care: `A$750/mo`)
  * Denmark (DK): `kr 39,500` (Care: `kr 5,000/mo`)
  * Singapore (SG): `S$4,900` (Care: `S$650/mo`)
  * Ireland / EU (IE): `EUR 3,600` (Care: `EUR 480/mo`)
  * India (IN): `INR 55,000` (Care: `INR 7,500/mo`)

#### Payment Terms & Refund Policy:
* **Payment Split:** `40% upfront` to initiate project; remaining `60% upon completion` prior to final handover.
* **Code Ownership:** `100% full code ownership` transferred upon final payment; no recurring platform licensing fees.
* **Hosting:** Client pays hosting provider directly; developer assists with setup.
* **Partial Refund Policy:** If a project is cancelled partway through, a fair partial refund is calculated based on work completed.
* **Discount / Founding Client Rate:** Active offer for initial portfolio slots (referenced on `FloatingBadge` and FAQ #9).

---

## 5. CONTACT AND LEAD CAPTURE

### Architecture & Workflow
1. **Frontend Component:** `src/components/ContactSection.jsx`
2. **Form State Collected:**
   * `name`: Text (client-side validation: trimmed length >= 2; server-side max 80 chars).
   * `email`: Text (validated against email regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`, max 160 chars, converted to lowercase).
   * `details`: Textarea (client-side validation: trimmed length >= 20; server-side max 2000 chars).
   * `website`: Hidden honeypot input (`tabIndex={-1}`, `autoComplete="off"`, `aria-hidden="true"`, `className="hidden"`). If filled, submission is flagged as spam.
   * `submittedAt`: Timestamp generated on mount or form reset. Minimum form fill duration of 1,500ms (`MIN_FORM_FILL_MS = 1500`) enforced server-side to reject instant bot submissions.
3. **Transmission:**
   * Client issues `fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, details, website, submittedAt }) })`.
4. **Backend Endpoint (`api/contact.js`):**
   * Checks `process.env.ALLOWED_ORIGINS`.
   * Checks honeypot and submission duration.
   * Strips control characters: `value.replace(/[\u0000-\u001F\u007F]/g, ' ')`.
   * Formats into `URLSearchParams` and forwards via server-to-server POST to `process.env.GOOGLE_SHEETS_URL`.
   * Returns `{ success: true, message: 'Lead captured successfully.' }` with status 200.
5. **Client Feedback:**
   * Dynamically loads `sweetalert2` on idle/focus/submission.
   * Displays modal: `ENQUIRY RECEIVED: I will reach out to you shortly.` (or fallback `window.alert`).
   * Resets form state to default message on success.
6. **Pre-fill Mechanism:**
   * Listens to custom window events `prefillContactQuote` and `prefillContactQuoteNoPrice`. Clicking `Request Custom Quote ->` in `PricingSection.jsx` dispatches this event and populates the details textarea automatically with: `"Hi, I'm interested in getting a custom scope & quote for the [Tier Name] tier. Could we discuss my project requirements?"`

### Complete External Links & Social Channels
* **Email:** `vasanthshetty.dev@gmail.com`
* **LinkedIn:** `https://www.linkedin.com/in/vasanth-shetty-dev`
* **GitHub:** `https://github.com/vasanthshettyy`
* **Phone Number:** **NOT FOUND** (no phone number or WhatsApp direct link is published anywhere on the website).
* **Live Concept Demos Referenced:**
  * `https://aether-intake.vercel.app`
  * `https://meridian-assets.vercel.app`
  * `https://axiom-neon-one.vercel.app`
  * `https://vasanth-shetty-portfolio.vercel.app`

---

## 6. PERFORMANCE AND SEO BASELINE

### Measured Bundle & Production Build Metrics
From production Vite build (`npm run build`):
* `dist/index.html`: `61.14 kB` (gzip: `13.14 kB`) — includes inlined critical SVG icons, initial styles, and SEO JSON-LD scripts.
* `dist/assets/vendor-react-*.js`: `198.65 kB` (gzip: `62.81 kB`) — React 19, React DOM, React Helmet.
* `dist/assets/vendor-animation-*.js`: `132.25 kB` (gzip: `50.50 kB`) — GSAP Core, ScrollTrigger, Lenis smooth scroll.
* `dist/assets/sweetalert2.all-*.js`: `78.15 kB` (gzip: `20.84 kB`) — **Dynamically code-split**; loaded strictly on idle or form interaction so it does not block first paint.
* Section chunks (Code-split with `React.lazy`):
  * `index-*.js`: `34.77 kB` (gzip: `11.20 kB`)
  * `ProcessSection-*.js`: `11.33 kB` (gzip: `3.43 kB`)
  * `ProjectGrid-*.js`: `10.61 kB` (gzip: `3.74 kB`)
  * `PricingSection-*.js`: `9.11 kB` (gzip: `3.23 kB`)
  * `FaqSection-*.js`: `9.11 kB` (gzip: `3.72 kB`)
  * `ContactSection-*.js`: `8.40 kB` (gzip: `2.84 kB`)
  * `ValueSection-*.js`: `6.22 kB` (gzip: `2.47 kB`)
  * `ServicesSection-*.js`: `5.88 kB` (gzip: `2.05 kB`)
  * `PrivacyPolicy-*.js`: `5.27 kB` (gzip: `1.55 kB`)
  * `Footer-*.js`: `2.30 kB` (gzip: `1.06 kB`)

### Image Handling & LCP Budget
* **Hero LCP Image:** `/vasanth-hero.webp` (24 KB compressed WebP).
  * Explicitly preloaded in `index.html`: `<link rel="preload" as="image" href="/vasanth-hero.webp" type="image/webp" fetchpriority="high" />`.
  * Dimensions: `520x693`, `loading="eager"`, `fetchPriority="high"`.
* **Hero Illustrated Overlay:** `/vasanth-hero-illustrated.webp` (interactive canvas mask layer).
* **Project Thumbnails:** `/projects/*.webp` (served with `loading="lazy"`, `decoding="async"`).
* **Avatar:** `/vasanth-avatar.webp` (64x64 square WebP in Header).

### Metadata & SEO Architecture (CRITICAL: Do Not Break)
Managed synchronously in `index.html` and post-hydration by `react-helmet-async` in `src/App.jsx`:
* **Title:** `Vasanth Shetty | Full-Stack Web Developer, AI Chatbots & Automations`
* **Meta Description:** `Vasanth Shetty — freelance Full-Stack Web Developer building custom websites, AI chatbots, and business automations designed to convert.` (138 characters).
* **Canonical URL:** `https://dev-vasanth.vercel.app/`
* **Google Site Verification:** `h45kDn_1ZWlQ8qCgRgDffWKyQ8djWGsowQi4uZy2n40`
* **Structured Data (`@type: "application/ld+json"` id="json-ld-schema"):**
  * `@type: "WebSite"`: name `"Vasanth Shetty"`, alternateName `["dev-vasanth", "Vasant Shetty", "Vasanth Shetty Dev"]`.
  * `@type: "Person"`: name `"Vasanth Shetty"`, jobTitle `"Full-Stack Web Developer & Automation Specialist"`, alternateName `["Vasant Shetty", "Vasanth", "dev-vasanth", "Vasanth Shetty Dev"]`, knowsAbout: `["Full-Stack Web Development", "Web Development", "React", "Next.js", "Tailwind CSS", "AI Chatbots", "Business Automation", "Lead Capture Systems"]`.
  * `@type: "ProfessionalService"`: priceRange `"$$"`, email `"vasanthshetty.dev@gmail.com"`.
  * `@type: "FAQPage"`: inlined schema for top FAQs.
* **AI Agent Manifests:**
  * `<link rel="alternate" type="text/plain" href="/llms.txt" title="AI Agent Specification" />`
  * `<link rel="ard" href="/.well-known/ard.json" title="Agent Resource Discovery Manifest" />`

---

## 7. THINKING ORBS RESEARCH

Research gathered from `https://libraries.dev/orbs`, npm package `thinking-orbs`, and author repository `github.com/Jakubantalik/thinking-orbs`.

### Overview & Specifications
* **Package Name:** `thinking-orbs`
* **Install Command:**
  ```bash
  npm i thinking-orbs
  # or
  pnpm add thinking-orbs
  ```
* **License:** **MIT License**. Confirmed **100% free for commercial and client production projects**. No pro limits, watermarks, or paid tiers.
* **Rendering Architecture:** Built purely on plain HTML5 2D Canvas arcs (`CanvasRenderingContext2D`). It does not use Three.js, WebGL, SVG filters, or external animation runtimes.
* **Bundle Size:** Ultra-lightweight (~4–6 kB minified + gzipped, zero runtime dependencies outside React peer dependency).
* **SSR / "use client" Requirements:**
  * In Next.js: Requires `"use client"` because it accesses DOM elements and canvas context during rendering.
  * In this Project (Vite React SPA): Fully client-side SPA. Can be imported directly without dynamic wrapping or SSR workarounds.
* **Reduced-Motion Support:**
  * Out of the box, it listens to `prefers-reduced-motion: reduce`. When active, it automatically halts canvas animation loops and renders a clean, static, theme-aware frame.
* **Lifecycle Resource Throttling:**
  * Automatically pauses animation when scrolled offscreen via `IntersectionObserver` or when the user switches browser tabs (`visibilitychange`), eliminating unnecessary CPU/battery consumption.
* **Component Props:**
  * `state`: String enum specifying the visual animation mode.
  * `size`: Number (pixels; hand-tuned presets: `20` for inline text, `64` for avatars).
  * `speed`: Number (multiplier, e.g., `1.0`, `1.5`).
  * `paused`: Boolean (`true` freezes current frame).
  * `aria-label`: String override for screen reader announcements.
  * Supports standard canvas attributes (`className`, `style`, `id`).

### Exact List of All 9 Available States
1. **`working`**: Particles revolving continuously on tilted circular orbits.
2. **`searching`**: A bright scanning meridian line sweeping across a revolving dotted globe.
3. **`solving`**: Dotted bands scrambling dynamically across axes before aligning and clicking into place.
4. **`listening`**: A rhythmic acoustic waveform undulating through the spherical dotted rings.
5. **`connecting`**: A constellation network actively linking nodes together across the orb sphere.
6. **`weaving`**: Three braided ribbons or strands plaiting continuously around the core.
7. **`composing`**: A fluid multi-band sash flowing smoothly across the orb.
8. **`breathing`**: A calm, subtle ring expanding and morphing slowly.
9. **`shaping`**: A geometric dotted outline mutating between geometric shapes (circle → triangle → square).

### Proposed State Mapping for Website Chatbot
Using strictly existing, real states:

| Chatbot Interaction Stage | Proposed State | Visual Rationale |
| :--- | :--- | :--- |
| **Closed Launcher (Floating button idle)** | `breathing` | Gentle, non-distracting pulse indicating that the AI assistant is alive and standby without visually shouting at the visitor. |
| **Panel Open / Waiting for User Input** | `listening` | Spherical waveform rolling through rings, signaling that the bot is listening and ready for the visitor's question. |
| **User Typing (Input field active)** | `connecting` | Constellation nodes linking together, visually echoing the visitor composing their thoughts into an inquiry. |
| **Bot Processing / Querying Knowledge** | `solving` | Scrambling bands resolving into order, indicating active synthesis of portfolio knowledge and response generation. |
| **Answer Delivered / Post-response Idle** | `breathing` | Smoothly returns to calm breathing state inside the message bubble or panel header. |

---

## 8. GAPS & MISSING CONTENT

The following questions could reasonably be asked by prospective clients, but **cannot** be answered using the current site content alone:

1. **Exact Location & Working Hours:**
   * Content states "Karnataka, India" in `llms.txt`, but this is not mentioned on the visual website. The site does not specify working timezone (e.g. IST / UTC+5:30), operating hours, or overlap availability for clients in the US, Europe, Australia, or New Zealand.
2. **Direct Booking / Instant Call Scheduling:**
   * The site sells "Custom Booking Systems", but does not have a live booking calendar (e.g., Cal.com, Calendly) for itself. The only way to talk is submitting the contact form or sending an email.
3. **Phone Number & Instant Messaging:**
   * No phone number, WhatsApp direct link, or Telegram handle exists.
4. **Specific Payment Gateways & Accepted Currencies:**
   * Pricing data includes amounts for NZD, AUD, DKK, SGD, EUR, and INR, but the site never explains *how* international clients pay (e.g. Stripe invoice, Wise transfer, wire transfer, PayPal, credit card, or local bank transfer).
5. **Technology Choice per Service Tier:**
   * Does a "Starter Site" get built with React/Vite, Next.js, Astro, or plain HTML? The site boasts "custom-coded websites, no templates, no platform limitations", but doesn't specify if the client gets a CMS (like Sanity, WordPress, or Strapi) for text edits on Starter or Standard tiers, or if changes require code commits.
6. **E-Commerce & Online Store Pricing:**
   * The Hero rotating cycler explicitly advertises `"ONLINE STORES."`, but the Service Plans section only scopes informational brochure sites, booking flows, and custom lead generation. There is no e-commerce plan or pricing for shopping carts, payment gateways, or product catalogs.
7. **Client Prerequisites / Content Creation:**
   * If the client does not have copywriting, product photography, or imagery, does Vasanth provide AI/custom copy and stock images, or must the client provide all copy before development begins?
8. **Hosting Cost Estimates:**
   * The FAQ states hosting is separate and paid directly by the client, but gives no estimated monthly or annual cost range (e.g., "$0 on Vercel free tier" vs "$20/mo on Vercel Pro").
9. **Emergency Maintenance & SLA for Care Retainers:**
   * The retainers list "Starter Care", "Standard Care", and "Growth Care", but do not specify service-level turnaround times (e.g., "updates deployed within 24 hours" vs "within 5 business days").
10. **Legal Entity & Formal Terms:**
    * No company registration number, GST/tax ID, or formal Terms and Conditions page exists (only an informal email agreement).

---

## AUDIT COMPLETION CHECKLIST & UNVERIFIABLE ITEMS

The audit was conducted strictly against the repository files and live official libraries documentation. The following items were **unable to be verified** directly from the local codebase:
* **Production Google Sheets Lead Destination:** The destination spreadsheet URL is stored in the serverless environment variable `GOOGLE_SHEETS_URL` on Vercel and is not hardcoded in the repo (`api/contact.js` references `process.env.GOOGLE_SHEETS_URL`).
* **Active Status of Founding Client Slots:** The floating badge states "FOUNDING CLIENT OFFER • LIMITED AVAILABILITY" and FAQ #9 references it, but the codebase has no counter or database check to verify how many discount spots currently remain open.
* **Client-side Currency Selector UI:** While `src/data/pricingData.js` contains a full multi-country currency matrix (`NZ`, `AU`, `DK`, `SG`, `IE`, `IN`), the current `PricingSection.jsx` does not render a currency toggle dropdown; it displays "Request Custom Quote ->" buttons instead of live price figures.

