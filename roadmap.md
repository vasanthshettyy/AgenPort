# MASTER ARCHITECTURE BLUEPRINT: ROADMAP.MD
## TARGET SYSTEM: HIGH-CONVERTING INTERNATIONAL B2B PORTFOLIO

> **Agent Directive:** This document is the absolute, non-negotiable structural law for this project. Every section defines *what* to build and *why* it converts high-ticket international clients. Implementation, creative engineering, and debugging are entirely the agent's domain. Do not deviate from mandated resources. Make every interaction world-class, fluid, and premium.

---

## ARCHITECTURAL FOUNDATION & DESIGN SYSTEM

### Global Design Tokens — "AI-SaaS" Aesthetic
| Token Category | Specification |
|---|---|
| **Base Canvas** | Deep monochromatic dark (`#080B10`, `#0A0D14`) with smooth linear gradients |
| **Primary Accent** | Neon cyan/electric blue luminescence (`#00D4FF`, `#7C3AED`) |
| **Secondary Accent** | Subtle violet glow for depth and layering |
| **Surface Glass** | Frosted glassmorphism panels with `backdrop-filter: blur` |
| **Grid Overlay** | Sub-pixel containment grid + radial gradient depth backgrounds |
| **Typography** | `Inter` / `Outfit` / `Space Grotesk` — clean, optimized for digital displays |
| **Border Language** | Glowing 1px borders on interactive containers, subtle gradient strokes |
| **Motion Language** | Smooth easing curves, no abrupt transitions; 60fps at all times |

### Mandated External Resources — STRICTLY ENFORCED
> No outside design toolkits, libraries, or asset packs are permitted beyond this list.

| Purpose | Resource |
|---|---|
| Layout & Design Language | https://github.com/nextlevelbuilder/ui-ux-pro-max-skill |
| SEO Framework & Metadata | https://github.com/AgriciDaniel/claude-seo |
| Spatial Motion & Page Layouts | https://motionsites.ai |
| Component Primitives & Containers | https://skiper-ui.com |
| Tweening & Micro-interactions | https://animejs.com |
| Tooltips, Dropdowns & Overlays | https://popper.js.org/docs/ |
| Notification & Multi-state Modals | https://sweetalert2.github.io |
| Production React Components | https://21st.dev/community/components |
| Vector Assets & Geometric Grids | https://app.superdesign.dev |

---

## PHASE 1: ENVIRONMENT CONFIGURATION & PIPELINE SETUP

### Intention
Establish a zero-friction automated deployment pipeline where every code push triggers an immediate production build on Vercel. This enables real-time testing against international network latencies, diverse screen configurations, and global CDN behavior from day one.

### Tasks to Complete
- [ ] 1.1 — Initialize a clean React.js enterprise project directory with Tailwind CSS fully configured as the styling layer.
- [ ] 1.2 — Establish a private GitHub repository with `main` branch protection rules and link it directly to a Vercel project container via GitHub integration.
- [ ] 1.3 — Configure Vercel environment variables for all future production secrets (API keys, backend URLs, SMTP credentials) so no code changes are needed per environment.
- [ ] 1.4 — Create a global `tailwind.config.js` extending the default theme with all custom design tokens (colors, fonts, shadows, border radii, keyframe animations).
- [ ] 1.5 — Set up `index.css` / global stylesheet containing all CSS custom properties, reset rules, scrollbar styles, and selection highlights matching the dark AI-style palette.
- [ ] 1.6 — Install all mandated libraries: `animejs`, `@popperjs/core`, `sweetalert2`, and configure them as reusable utility hooks.
- [ ] 1.7 — Configure a root-level `/api` directory to hold independent **Native Vercel Serverless Functions** using the native Node.js `(req, res)` handler signature. Each function is a standalone file (e.g., `/api/contact.js`, `/api/health.js`). Do NOT create a persistent Express.js server instance — Vercel's Hobby tier does not support a continuously running server process. Each function must import only what it needs, keeping cold-start latency minimal.
- [ ] 1.8 — Add a `vercel.json` configuration file at the project root to define `rewrites` or `routes` that proxy `/api/*` requests to the correct serverless function files and serve the React SPA for all other routes.
- [ ] 1.9 — Create a `.env.example` file at the project root documenting every required environment key. This file must be committed to GitHub (no real credentials). The agent must read this file to know exactly which variables to configure in Vercel's Environment Variables panel before Phase 6 can function:

```bash
# Lead Routing Configuration
LEAD_STORAGE_MODE=email   # Options: email | notion | kv

# Email Provider (required when LEAD_STORAGE_MODE=email)
SENDGRID_API_KEY=
RECIPIENT_EMAIL=

# Notion Storage (required when LEAD_STORAGE_MODE=notion)
NOTION_API_KEY=
NOTION_DATABASE_ID=

# Rate Limiting & Security
RATELIMIT_MAX_REQUESTS=5

# CORS — Comma-separated allowed origins (production + preview)
ALLOWED_ORIGINS=https://yourdomain.vercel.app,https://www.youragency.com
```

### Testing Parameters
- Every `git push` to `main` must auto-trigger a Vercel production build with zero compile-time errors.
- Tailwind purge/content paths must include all JSX files; no unused CSS bloat in production.
- Backend health-check endpoint (`/api/health`) must return `200 OK` on the live Vercel URL.
- Global CSS tokens must be accessible from any component without re-importing.

### Deployment & Vercel Verification
- Execute the initial commit and confirm the Vercel dashboard shows a green "Ready" deployment state.
- Verify active SSL certification is provisioned on the default Vercel `.vercel.app` domain.
- Confirm the Vercel Functions tab shows the Node.js backend functions as active serverless endpoints.

---

## PHASE 2: CORE VALUE ENGINE — HERO SECTION

### Intention
Capture international enterprise attention within the first 3 seconds of page load. The hero must communicate a premium business offer—not a developer portfolio. It speaks directly to decision-makers: CTOs, Ops Leads, and Founders who need custom digital systems that create operational scale, eliminate SaaS dependency costs, and drive measurable ROI. Every visual and copy element must scream "this person operates at a different tier."

### Tasks to Complete
- [ ] 2.1 — Build a sticky, glass-morphism navigation header with smooth scroll-based opacity transitions. Include logo placeholder on the left, navigation anchors center/right, and a glowing "Book a Call" CTA button with a pulsing border animation powered by `animejs`.
- [ ] 2.2 — Use `@popperjs/core` to wire floating dropdown tooltips on service navigation items, displaying brief service summaries on hover without layout shift.
- [ ] 2.3 — Construct the hero headline block with a multi-line, high-converting B2B value proposition. Use a typewriter or word-reveal text animation (via `animejs`) for the primary H1. Example headline direction: *"We Build the Systems That Scale Your Business — Without the SaaS Tax."*
- [ ] 2.4 — Place a primary CTA button ("Book a Discovery Call") with a radiant glow-pulse animation and a secondary anchor CTA ("View Our Work") with an underline-trace micro-interaction.
- [ ] 2.5 — Build the hero background using SVG geometric grid patterns sourced from `app.superdesign.dev`, combined with subtle ambient particle drift or radial light bloom animations.
- [ ] 2.6 — Embed a hero sub-section visual — a floating terminal/code window or a mock dashboard panel rendered as a skeleton — to demonstrate technical sophistication without requiring live data.
- [ ] 2.7 — Add a trust-signal badge strip below the CTA: client geography flags (USA, UK, AU, EU, SG), a "Trusted by Founders & CTOs" label, and an animated star-rating display.
- [ ] 2.8 — Implement smooth scroll anchoring so navigation CTA buttons scroll users to the correct section with eased momentum.

### Testing Parameters
- Hero headline must render without horizontal overflow on all viewports from 320px to 4K.
- CTA button glow animation must maintain 60fps; test with Chrome DevTools Performance tab.
- Navigation dropdown (Popper.js) must not cause layout shift (CLS score must remain < 0.1).
- Background SVG patterns must not block interactive foreground elements (z-index audit required).
- Trust badge strip must wrap gracefully on mobile without breaking the layout.

### Deployment & Vercel Verification
- Push to GitHub; inspect Vercel preview URL across Chrome, Safari, and Firefox.
- Use Chrome DevTools mobile emulation to verify layout precision at 375px (iPhone SE) and 768px (iPad).
- Confirm no Largest Contentful Paint (LCP) regressions; hero must load visual content under 2.5 seconds on the Vercel CDN.

---

## PHASE 3: BUSINESS VALUE & COMPARATIVE ARCHITECTURE DIAGRAMS

### Intention
De-commodify the service. At this scroll depth, the prospect is qualifying the offer. This section must shift their internal frame from *"I need a developer"* to *"I need a business infrastructure partner."* It demonstrates why custom-engineered systems outperform template-based or no-code solutions using concrete, visual, data-driven comparisons. This section directly addresses the ROI objection.

### Tasks to Complete
- [ ] 3.1 — Design a bento grid layout (3-4 column desktop, 1-column mobile) using component containers sourced from `skiper-ui.com`. Each bento cell must contain an independent value proposition with icon, metric, and explanation.
- [ ] 3.2 — Build a "Custom vs. Template" comparative matrix visual: a side-by-side two-column table or animated diagram highlighting performance delta, data ownership, monthly cost savings, and scalability.
- [ ] 3.3 — Embed live-style performance metric cards with animated number counters (powered by `animejs`) that trigger on scroll entry. Example metrics: "3x Faster Load Times", "Zero Monthly SaaS Fees", "100% Data Ownership".
- [ ] 3.4 — Add `@popperjs/core`-powered tooltip overlays on technical terms within the bento cells (e.g., hovering "custom DB schema" shows a brief explanation tooltip).
- [ ] 3.5 — Source section background textures and decorative vector shapes from `app.superdesign.dev` to maintain visual consistency with the hero.
- [ ] 3.6 — Add a scroll-triggered stagger animation (via `animejs`) where bento cells animate into view sequentially as the user scrolls down.
- [ ] 3.7 — Include a client-outcome testimonial strip at the bottom of this section as an animated horizontal marquee — placeholder name/company/outcome format, easy to replace with real data.

### Testing Parameters
- Bento grid must collapse into a clean single-column stack on viewports below 768px with no overlapping elements.
- Animated number counters must trigger only once on first scroll-entry using an IntersectionObserver, not loop infinitely.
- Hover tooltips (Popper.js) must not cause neighboring bento cells to shift or resize.
- Comparative matrix must be fully readable on mobile without horizontal scroll.
- Stagger animation must not degrade performance; test with Lighthouse on Vercel preview URL.

### Deployment & Vercel Verification
- Push to GitHub, confirm Vercel build completes without errors.
- Audit the Vercel preview URL using PageSpeed Insights; Total Blocking Time must remain under 300ms.
- Verify all Popper.js tooltip positions auto-flip correctly at screen edges (bottom/top/left/right fallback logic).

---

## PHASE 4: HIGH-FIDELITY CASE STUDY & PROJECTS SHELL

### Intention
Visually prove technical range and enterprise-grade execution before real project data exists. Skeleton containers must be indistinguishable in visual quality from a live, data-populated portfolio. This is a critical trust mechanism for cold B2B traffic — a poorly designed empty state destroys credibility instantly. Every skeleton must feel like a premium system waiting to be revealed.

### Tasks to Complete
- [ ] 4.1 — Architect a multi-column project showcase grid (2-column desktop, 1-column mobile) with exactly **5 distinct project placeholder cards** representing high-value enterprise niches (e.g., SaaS Dashboard, Booking System, Internal Ops Tool, E-commerce Backend, API Integration Platform).
- [ ] 4.2 — Build high-fidelity shimmering skeleton states for each card:
  - Shimmer gradient animation (CSS `@keyframes`) over placeholder blocks for title, description, tags, and CTA.
  - A mock browser/app screenshot region with animated shimmer fill.
  - Technical tag chips (React, Node.js, PostgreSQL, etc.) rendered as pill skeletons.
- [ ] 4.3 — Build a standardized data model template (`ProjectData` schema) for each case study card:
  - `title`: string
  - `niche`: string
  - `problem_statement`: string
  - `technical_approach`: string[]
  - `conversion_metrics`: { metric: string, value: string }[]
  - `tech_stack`: string[]
  - `live_url`: string (optional)
  - `image_url`: string (optional)
- [ ] 4.4 — Integrate `sweetalert2` modals triggered on card click, revealing a deep-dive case study layout with: Problem → Solution → Tech Architecture → Business Outcome flow.
- [ ] 4.5 — Add a section header with a subtle animated gradient text effect and a short descriptor line positioning the work as "enterprise-grade systems, not websites."
- [ ] 4.6 — Implement scroll-triggered card entrance animations (stagger, fade-up) using `animejs` and IntersectionObserver.
- [ ] 4.7 — Ensure the `ProjectData` schema is stored in a separate `/src/data/projects.js` file so the agent or owner can populate real data without touching component logic.
- [ ] 4.8 — Initialize `/src/data/projects.js` with an array of exactly **5 pre-configured objects** using the `isSkeleton: true` flag. When `isSkeleton` is `true`, the card component must automatically render the shimmering overlay layout instead of attempting to display content. This eliminates the need for 5 separate hardcoded HTML skeleton blocks and makes the transition to real data a single field change per object:

```javascript
export const projects = [
  {
    id: "sys-01",
    isSkeleton: true, // Set to false and populate fields to reveal live project data
    title: "Enterprise SaaS Core Dashboard",
    niche: "SaaS Automation",
    problem_statement: "Placeholder for deep enterprise problem metric analysis.",
    technical_approach: ["React Architecture", "Serverless Pipeline", "State Ledger"],
    conversion_metrics: [{ label: "Data Latency Reduction", value: "0.00%" }],
    tech_stack: ["React", "Tailwind", "Node.js"],
    live_url: "#",
    image_url: ""
  },
  {
    id: "sys-02",
    isSkeleton: true,
    title: "Internal Operations Platform",
    niche: "Enterprise Tooling",
    problem_statement: "Placeholder for operational workflow problem statement.",
    technical_approach: ["Role-Based Access", "PostgreSQL Schema", "REST API Layer"],
    conversion_metrics: [{ label: "Process Efficiency Gain", value: "0.00%" }],
    tech_stack: ["Next.js", "Prisma", "PostgreSQL"],
    live_url: "#",
    image_url: ""
  },
  {
    id: "sys-03",
    isSkeleton: true,
    title: "Custom Booking & Scheduling System",
    niche: "Service Business Automation",
    problem_statement: "Placeholder for booking workflow friction analysis.",
    technical_approach: ["Calendar API Integration", "Automated Notifications", "Custom Admin Panel"],
    conversion_metrics: [{ label: "Booking Conversion Rate", value: "0.00%" }],
    tech_stack: ["React", "Node.js", "Supabase"],
    live_url: "#",
    image_url: ""
  },
  {
    id: "sys-04",
    isSkeleton: true,
    title: "E-Commerce Backend & Payments Infrastructure",
    niche: "Retail / E-Commerce",
    problem_statement: "Placeholder for SaaS-dependency and margin compression problem.",
    technical_approach: ["Stripe Integration", "Inventory API", "Custom Storefront"],
    conversion_metrics: [{ label: "Platform Fee Elimination", value: "$0.00/mo" }],
    tech_stack: ["Next.js", "Stripe", "MongoDB"],
    live_url: "#",
    image_url: ""
  },
  {
    id: "sys-05",
    isSkeleton: true,
    title: "Multi-Service API Orchestration Layer",
    niche: "Integration Infrastructure",
    problem_statement: "Placeholder for fragmented toolchain and data silo problem.",
    technical_approach: ["Webhook Pipeline", "Third-Party API Mesh", "Error Retry Logic"],
    conversion_metrics: [{ label: "Integration Uptime", value: "0.00%" }],
    tech_stack: ["Node.js", "GraphQL", "Redis"],
    live_url: "#",
    image_url: ""
  }
];
```

### Testing Parameters
- Shimmer animations must run at 60fps with zero CPU spikes; validate in Chrome's Performance tab.
- Skeleton cards must maintain correct height/width proportions when real data replaces placeholder content (no layout collapse).
- `sweetalert2` modals must be fully scrollable on mobile and must dismiss correctly on backdrop click and ESC key.
- `/data/projects.js` must export a valid array; changing any field must automatically reflect in the rendered card without component modification.
- Cards must be fully keyboard-navigable (Tab focus, Enter to open modal).

### Deployment & Vercel Verification
- Push to GitHub; confirm Vercel build is green.
- Open the live preview on a real iOS Safari and Android Chrome to verify shimmer rendering and modal behavior.
- Confirm skeleton cards render correctly with zero console errors on first load.

---

## PHASE 5: SERVICES & FULL-STACK CAPABILITIES MODULE

### Intention
Leave zero ambiguity about what is built and for whom. This module must convert interest into intent. International B2B prospects need to see precisely scoped service tracks to understand whether this agency can serve their specific operational needs. The layout must feel like a SaaS pricing/features page — structured, confident, and technically sophisticated.

### Tasks to Complete
- [ ] 5.1 — Design an interactive service grid with **3 clearly defined service tracks**:
  - **Track 1: Custom Core Applications** — Full-stack web applications, SaaS MVPs, client-facing portals.
  - **Track 2: Internal Enterprise Tools** — Admin dashboards, internal operations platforms, data management systems.
  - **Track 3: Automated Integration Infrastructures** — API orchestration, webhook pipelines, third-party integration architectures.
- [ ] 5.2 — Source component containers and layout cards from `skiper-ui.com` and `21st.dev/community/components`.
- [ ] 5.3 — Build a **Tech Stack Proficiency Strip** using animated chip/badge components:
  - Frontend: React.js, Next.js, Tailwind CSS, TypeScript
  - Backend: Node.js, Express.js, REST APIs, GraphQL
  - Database: PostgreSQL, MongoDB, Prisma ORM, Supabase
  - DevOps: Vercel, GitHub Actions, Docker
  - Integrations: Stripe, Twilio, SendGrid, custom API layers
- [ ] 5.4 — Add `animejs`-powered container scale transitions on hover for each service track card (subtle lift + glow border intensification).
- [ ] 5.5 — Integrate `@popperjs/core` tooltips on each tech chip, revealing a brief description of how that technology is used in real client projects.
- [ ] 5.6 — Add a "Process Flow" sub-section visualizing the 4-step engagement model: Discovery → Architecture → Build → Deploy + Support. Use an animated horizontal stepper or timeline component.
- [ ] 5.7 — Include a subtle "Currently Accepting New Clients" availability badge with a pulsing green status indicator to create urgency.

### Testing Parameters
- All 3 service track cards must be fully accessible via keyboard navigation (Tab + Enter).
- Tech chip tooltips must not overflow the viewport at extreme screen edges (Popper.js auto-flip must be active).
- Hover animations must not cause layout reflow; use `transform` and `opacity` only (no `width`/`height` animations).
- "Currently Accepting" badge must be visually prominent on both mobile and desktop.
- Process flow stepper must render in a vertical layout on mobile without element overlap.

### Deployment & Vercel Verification
- Push to GitHub; confirm zero build warnings.
- Test on Vercel preview URL in both light-mode OS and dark-mode OS to ensure the dark palette dominates regardless of system preference.
- Inspect Vercel Functions to confirm no unintentional serverless function calls are triggered on this static section.

---

## PHASE 6: INTERACTIVE CONTACT & BOOKING MODULE

### Intention
Convert qualified interest into a booked discovery call. This is the revenue action of the entire website. The form must feel premium, be functionally bulletproof, and handle international formatting gracefully (phone numbers, time zones, company names). Every form submission must trigger a confirmation response that reinforces professionalism and sets next-step expectations.

### Tasks to Complete
- [ ] 6.1 — Build a two-column section layout: left panel with re-stated value proposition + availability signal; right panel containing the contact form.
- [ ] 6.2 — Contact form fields (all required unless noted):
  - Full Name
  - Business Email
  - Company Name
  - Country / Region (dropdown with international options)
  - Project Type (dropdown: New Application / Dashboard Tool / API Integration / Other)
  - Budget Range (dropdown: $2K–$5K / $5K–$15K / $15K+ / Not Sure)
  - Project Description (textarea, max 500 chars with live counter)
  - Preferred Contact Method (radio: Email / Video Call)
- [ ] 6.3 — Wire the form submission to the Node.js backend endpoint (`/api/contact`) which must:
  - Validate all required fields server-side.
  - Send a confirmation email to the prospect via a transactional email service (SMTP/SendGrid).
  - Send an internal notification email to the agency owner.
  - Return a structured JSON response `{ success: boolean, message: string }`.
- [ ] 6.4 — On successful submission, trigger a `sweetalert2` success modal with a premium animation, a confirmation message, and a next-steps summary.
- [ ] 6.5 — On submission error, trigger a `sweetalert2` error modal with a graceful error message and retry guidance.
- [ ] 6.6 — Implement client-side form validation with real-time inline error states using animated `animejs` shake effects on invalid fields.
- [ ] 6.7 — Add a Calendly embed option (or placeholder anchor) below the form as an alternative booking method.
- [ ] 6.8 — Style all input fields to match the dark AI aesthetic: dark surface, glowing focus-ring border, smooth label-float animations.

### Testing Parameters
- Submit the form with all fields empty; every required field must show an inline error without page reload.
- Submit with an invalid email format; email field must reject submission with an animated error state.
- Submit a valid form; the backend endpoint must return `200 OK` with the correct JSON structure.
- Verify `sweetalert2` modals render correctly on iOS Safari (known modal positioning issues on WebKit).
- Test international phone number inputs for formatting acceptance (no strict numeric-only restrictions).
- Confirm the backend endpoint does NOT expose sensitive credentials (email passwords, API keys) in any client-side response.

### Deployment & Vercel Verification
- Push to GitHub; confirm Vercel builds the Node.js serverless function at `/api/contact`.
- Perform a live end-to-end form submission test on the Vercel production URL.
- Verify the Vercel Functions log shows the request was received and processed without runtime errors.
- Confirm environment variables (SMTP credentials, recipient email) are correctly loaded in the production Vercel environment.

---

## PHASE 7: SEO ARCHITECTURE & METADATA INFRASTRUCTURE

### Intention
Ensure the website is discoverable by international B2B decision-makers who are actively searching for custom development partners. This is not optional — organic search compounds the paid/referral traffic strategy and builds long-term authority for the agency brand in high-intent international markets.

### Tasks to Complete
- [ ] 7.1 — Implement the complete SEO framework derived from `https://github.com/AgriciDaniel/claude-seo`:
  - Meta title: ≤ 60 characters, keyword-optimized for target markets.
  - Meta description: ≤ 160 characters, conversion-focused with geographic intent.
  - Canonical URL tags on all pages.
- [ ] 7.2 — Build structured data markup (JSON-LD) for:
  - `Organization` schema (name, URL, logo, contact, social profiles).
  - `Service` schema for each of the 3 service tracks.
  - `FAQPage` schema for common prospect questions (add 5 FAQ entries).
- [ ] 7.3 — Implement Open Graph and Twitter Card metadata for social sharing previews.
- [ ] 7.4 — Generate a `sitemap.xml` and `robots.txt` and configure them at the Vercel root.
- [ ] 7.5 — Ensure all images use descriptive `alt` attributes; all interactive elements have ARIA labels.
- [ ] 7.6 — Set `lang="en"` on the HTML root and add `hreflang` annotations for primary target markets (US, UK, AU).
- [ ] 7.7 — Audit heading hierarchy: one `H1` per page, logical `H2`/`H3` sub-hierarchy throughout all sections.

### Testing Parameters
- Run the live Vercel URL through Google's Rich Results Test; structured data must validate without errors.
- Verify Open Graph preview using `https://opengraph.xyz` — image, title, and description must all render correctly.
- Confirm `sitemap.xml` is reachable at `/sitemap.xml` and lists all canonical page URLs.
- Lighthouse SEO score on Vercel production URL must reach ≥ 95.
- All images must have non-empty `alt` text; validate with Chrome Accessibility audit.

### Deployment & Vercel Verification
- Push and confirm `robots.txt` and `sitemap.xml` are served correctly by Vercel's static asset pipeline.
- Verify meta tags render in page source (not just in React component tree) — requires proper SSR or React Helmet/react-seo configuration.

---

## PHASE 8: PERFORMANCE OPTIMIZATION & PRODUCTION HARDENING

### Intention
International enterprise clients load this website from diverse network conditions across the USA, UK, Singapore, and Australia. Every kilobyte of bloat and every render-blocking script is a conversion killer. This phase ensures the site performs at the highest tier globally — reinforcing the "premium partner" perception through sheer technical execution quality.

### Tasks to Complete
- [ ] 8.1 — Implement React code-splitting with `React.lazy()` and `Suspense` boundaries on all non-critical sections (Phase 3–6 sections load lazily).
- [ ] 8.2 — Optimize all SVG assets from `app.superdesign.dev` — inline critical SVGs, lazy-load decorative ones.
- [ ] 8.3 — Configure `animejs` animations to respect `prefers-reduced-motion` media query (disable animations for accessibility).
- [ ] 8.4 — Implement image optimization: use `WebP` format for all raster images, add `loading="lazy"` and explicit `width`/`height` attributes.
- [ ] 8.5 — Audit and remove all unused Tailwind classes via `purge` configuration (production builds must not include dev utilities).
- [ ] 8.6 — Configure HTTP caching headers via `vercel.json` for static assets (fonts, images, SVGs) with long cache TTLs.
- [ ] 8.7 — Add error boundary components around all dynamic sections so a data error in one section does not crash the entire page.
- [ ] 8.8 — Implement a custom 404 page matching the full dark AI aesthetic.

### Testing Parameters
- Lighthouse Performance score on Vercel production URL must reach ≥ 90 on both mobile and desktop profiles.
- First Contentful Paint (FCP) ≤ 1.5 seconds on a simulated Fast 3G connection.
- Cumulative Layout Shift (CLS) ≤ 0.1 — no skeleton animations may cause layout shift during load.
- Total bundle size must be < 300KB gzipped (audit with Webpack Bundle Analyzer or Vite's `rollup-plugin-visualizer`).
- All `animejs` animations must freeze gracefully when `prefers-reduced-motion: reduce` is detected.

### Deployment & Vercel Verification
- Run PageSpeed Insights on the live Vercel URL from both US and Asia-Pacific server locations.
- Confirm Vercel Edge Network is active and CDN caching is functioning for static assets.
- Verify the custom 404 page is served correctly by navigating to a non-existent route on the live domain.

---

## GLOBAL AGENT DIRECTIVES & NON-NEGOTIABLE STANDARDS

> These rules apply unconditionally across every phase. Violating any directive constitutes an incomplete build.

1. **World-Class Aesthetics Are Non-Negotiable.** If any section looks generic, flat, or basic — it is wrong. Every pixel must feel like it belongs on a premium SaaS product landing page.
2. **Dark Mode Is the Default and Primary Mode.** There is no light mode. The entire palette must be engineered for dark-first rendering.
3. **Mobile Responsiveness Is Mandatory.** Every section must be pixel-perfect at 320px, 375px, 768px, 1280px, and 1920px widths.
4. **Animations Must Serve Conversion.** Every motion must guide the user's attention toward a CTA or value point — no decorative-only animations.
5. **Data Separation Is Mandatory.** All placeholder content (project data, testimonials, service descriptions) must live in isolated `/data/*.js` files, never hardcoded into components.
6. **Zero Console Errors on Production.** The live Vercel deployment must load with a completely clean browser console.
7. **Accessibility Is a Hard Requirement.** All interactive elements must be keyboard-navigable and screen-reader compatible. ARIA labels are mandatory on all icon-only buttons.
8. **No Unauthorized Libraries.** If a library is not listed in the Mandated External Resources section, it must not be used without explicit re-specification in this document.
9. **Every Phase Has a Verifiable End-State.** A phase is not complete until all testing parameters pass and the Vercel deployment verification steps are confirmed.
10. **The Site Must Book Calls.** Every design, copy, animation, and layout decision must serve the singular business objective: converting cold international B2B traffic into booked discovery calls.

---

## PHASE 6 (EXTENDED): BACKEND DATA ORCHESTRATION & INBOUND CONVERSION ENGINE

### Intention
Establish a hardened, asynchronous backend layer that captures every inbound lead with zero data loss. When a high-ticket prospect from London, Sydney, or Singapore submits the contact form at 2AM local time, the system must process, validate, store, and notify — without any human intervention. This is the revenue infrastructure backbone of the entire portfolio.

### Tasks to Complete
- [ ] 6E.1 — Initialize the Node.js serverless function runtime on Vercel (`/api/contact.js`) following Vercel Serverless Functions architecture standards.
- [ ] 6E.2 — Build an asynchronous data extraction and validation module that parses the full inbound payload: Full Name, Corporate Email, Company Name, Country/Region (ISO 3166), Project Type (enum), Budget Range (enum), Project Description (10–500 chars), Preferred Contact Method (enum: `email` | `video_call`).
- [ ] 6E.3 — Implement server-side sanitization on all string inputs to strip XSS vectors and SQL-injection patterns before any downstream processing.
- [ ] 6E.4 — Connect Vercel environment variables to route processed lead data to: **Option A (Email):** SendGrid or Nodemailer SMTP — fire a branded confirmation to the prospect + internal alert to agency owner. **Option B (Storage):** Append lead record to Notion DB, Airtable, or Vercel KV — controlled via env var flag `LEAD_STORAGE_MODE`.
- [ ] 6E.5 — Structure the API response as `{ "success": true|false, "message": "string", "reference_id": "UUID-v4" }`.
- [ ] 6E.6 — Wire `sweetalert2` on the frontend to consume the response: ✅ Success modal with `reference_id` + next-steps. ⚠️ Validation Error modal with field-specific errors. ❌ Server Error modal with fallback `mailto:` link.
- [ ] 6E.7 — Implement rate limiting: max 5 submissions per IP per hour. Return `429 Too Many Requests` with a friendly `sweetalert2` warning modal.
- [ ] 6E.8 — Log all inbound requests (timestamp, country, project type, budget tier) to Vercel Function logs for manual audit capability.
- [ ] 6E.11 — Implement an **Origin Verification Check** at the top of every serverless function handler. Before processing any request body, read `req.headers.origin` and validate it against the `ALLOWED_ORIGINS` environment variable (a comma-separated list of permitted domains). If the origin is absent or not in the allowlist, immediately return `403 Forbidden` with no body. This prevents third-party automated scripts and international bots from abusing the endpoint outside your Vercel deployment domain:

```javascript
// Origin verification — place at the top of every /api/*.js handler
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "").split(",").map(o => o.trim());
const origin = req.headers.origin || "";
if (!ALLOWED_ORIGINS.includes(origin)) {
  return res.status(403).json({ success: false, message: "Forbidden" });
}
// Set CORS headers for the verified origin only
res.setHeader("Access-Control-Allow-Origin", origin);
res.setHeader("Access-Control-Allow-Methods", "POST");
res.setHeader("Access-Control-Allow-Headers", "Content-Type");
```

### Testing Parameters
- Simulate 10 concurrent submissions; all must receive correct `200 OK` or `429` responses with no server crashes.
- Inject `<script>alert(1)</script>` into all string fields; backend must return `400 Bad Request`, never execute the script.
- Submit with a missing required field; API must return `422 Unprocessable Entity` with the exact failing field name.
- Trigger rate limiter by submitting 6 times rapidly; 6th must return `429` and the frontend must display the SweetAlert2 rate-limit modal.
- Verify confirmation email lands in the prospect's inbox within 30 seconds of a valid submission.

### Deployment & Vercel Verification
- Push to GitHub; confirm Vercel Functions tab shows `/api/contact` as an active serverless endpoint.
- Execute a live end-to-end submission test on the production URL; inspect raw API response in the browser network panel.
- Verify all environment variables (SMTP credentials, API keys, `LEAD_STORAGE_MODE`) are loaded correctly in Vercel's production environment settings panel.
- Inspect Vercel Function logs to confirm each submission is logged with the correct metadata.

---

## PHASE 7 (EXTENDED): GLOBAL DISCOVERY ARCHITECTURE & SEMANTIC SEO INFRASTRUCTURE

### Intention
Ensure every search engine crawler can fully parse, understand, and correctly index this portfolio for the highest-intent international B2B search queries. Perfect technical SEO is the compounding multiplier on all other traffic strategies — it builds passive, high-quality lead flow over time.

### Tasks to Complete
- [ ] 7E.1 — Implement the complete SEO framework from `https://github.com/AgriciDaniel/claude-seo`. Install and configure `react-helmet-async` for dynamic `<head>` injection. Set global default metadata in the root `App.jsx`.
- [ ] 7E.2 — Configure meta tags: `<title>` ≤ 60 chars (geo-targeted, e.g. *"Custom Full-Stack Development Agency | USA, UK, AU"*), `<meta name="description">` ≤ 160 chars, canonical tag, `robots: index, follow`.
- [ ] 7E.3 — Inject JSON-LD structured data via `<script type="application/ld+json">` for: **Organization** (name, url, logo, sameAs, contactPoint, areaServed: US/GB/AU/SG/EU), **Service** (one per service track), **FAQPage** (min 6 Q&A pairs covering pricing, timeline, tech stack, communication, ownership, revisions), **WebSite** (SearchAction stub).
- [ ] 7E.4 — Configure Open Graph: `og:title`, `og:description`, `og:image` (1200×630px branded card), `og:url`, `og:type: website`, `og:locale: en_US`.
- [ ] 7E.5 — Configure Twitter Cards: `twitter:card: summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image`.
- [ ] 7E.6 — Auto-generate `sitemap.xml` on each production build with `<lastmod>`, `<changefreq>`, `<priority>`. Expose at `/sitemap.xml`.
- [ ] 7E.7 — Create `robots.txt`: allow all well-behaved crawlers, disallow `/api/*`, declare `Sitemap:` directive.
- [ ] 7E.8 — Add `hreflang` for `en-US`, `en-GB`, `en-AU` pointing to the canonical URL.
- [ ] 7E.9 — Enforce semantic HTML: `<html lang="en">`, `<header>`, `<main>`, `<footer>`, `<section aria-labelledby="[id]">`. One `<h1>` per page; strict `<h2>` → `<h3>` hierarchy.
- [ ] 7E.10 — All images must have descriptive keyword-relevant `alt` attributes. All icon-only buttons must have `aria-label` attributes.

### Testing Parameters
- Submit live URL to Google Rich Results Test; all 4 structured data types must validate with zero errors.
- Verify Open Graph preview at `https://opengraph.xyz` — image, title, description must all render.
- Confirm `sitemap.xml` is accessible and valid XML; confirm `robots.txt` correctly blocks `/api/*`.
- Lighthouse SEO score on live URL must reach ≥ 95.
- Run `axe-core` audit; zero critical or serious ARIA violations.
- Verify `react-helmet-async` renders meta tags in the actual page HTML source — critical for crawler parsing.

### Deployment & Vercel Verification
- Push to GitHub; confirm `robots.txt` and `sitemap.xml` are served as static files (`Content-Type: text/xml` / `text/plain`).
- Inspect raw page source (`Ctrl+U`) on the production URL to confirm all meta tags and JSON-LD blocks are present in `<head>`.
- Verify zero meta tag duplication (e.g., no double `<title>` tags) in the raw HTML after React hydration.

---

## PHASE 8 (EXTENDED): PERFORMANCE COMPLIANCE & INTERNATIONAL LOAD ASSURANCE

### Intention
A portfolio that takes 4 seconds to load on a Singapore mobile network is invisible. Every millisecond is a micro-conversion killer. This phase eliminates all performance debt so the site loads fast and *feels* faster — reinforcing the premium engineering identity through the performance of the site itself.

### Tasks to Complete
- [ ] 8E.1 — Implement React code-splitting with `React.lazy()` and `<Suspense fallback={<SkeletonLoader />}>` on all section components below the hero fold.
- [ ] 8E.2 — Configure build optimizations: `terser` JS minification, Tailwind CSS purge in production, individual chunks < 150KB.
- [ ] 8E.3 — Optimize all raster images: convert to `WebP` (AVIF fallback), `loading="lazy"` on all below-fold images, explicit `width` and `height` on every `<img>` to eliminate CLS.
- [ ] 8E.4 — Inline all critical above-fold CSS to eliminate render-blocking stylesheet requests.
- [ ] 8E.5 — Preload critical fonts using `<link rel="preload" as="font" crossorigin>` in `<head>`.
- [ ] 8E.6 — Configure Vercel `headers` in `vercel.json`: static assets → `Cache-Control: public, max-age=31536000, immutable`; HTML → `Cache-Control: no-cache`.
- [ ] 8E.7 — Load all third-party libs (`animejs`, `sweetalert2`, `@popperjs/core`) via `npm` bundles, never CDN `<script>` tags, to ensure tree-shaking.
- [ ] 8E.8 — Implement `prefers-reduced-motion` detection: when active, all `animejs` tween durations set to `0`, all looping particle effects disabled.
- [ ] 8E.9 — Wrap every major section component in a React Error Boundary. Error fallback UI must match the dark aesthetic — no unhandled white crash screens.
- [ ] 8E.10 — Build a custom `404.jsx` page matching the full dark AI aesthetic with navigation back to home.

### Testing Parameters
- Lighthouse Performance ≥ 90 on **both** mobile (simulated Moto G4, Fast 3G) and desktop profiles.
- FCP ≤ 1.5s, LCP ≤ 2.5s, CLS ≤ 0.1, TBT ≤ 200ms on Fast 3G.
- Total gzipped bundle < 300KB (validate with `vite-bundle-visualizer`).
- With `prefers-reduced-motion: reduce` active, all section animations must freeze or complete instantly with no exceptions.
- Navigate to `/this-does-not-exist`; the custom 404 page must render — not Vercel's default error screen.

### Deployment & Vercel Verification
- Run PageSpeed Insights on live URL from US East Coast and Singapore server locations.
- Confirm `x-vercel-cache: HIT` header on repeated static asset requests (CDN caching active).
- Inspect Vercel build log output to confirm final bundle sizes and that no chunk exceeds 150KB.
- Navigate to an invalid route on the live production domain to confirm the custom 404 renders.

---

## PHASE 9: END-TO-END PRODUCTION VALIDATION & PRE-FLIGHT LAUNCH VERIFICATION

### Intention
Before a single prospect sees this URL, the entire system must be verified as flawless. One broken form, one misaligned mobile layout, or one console error on a prospect's machine ends the conversion permanently. This is a systematic go/no-go quality gate — every box must be checked before launch.

### Tasks to Complete

#### 9.1 — Visual & Layout Audit
- [ ] Test the live URL in Chrome (Chromium), Firefox (Gecko), and Safari (WebKit) — all sections must render identically.
- [ ] Test all 5 breakpoints: 320px, 375px, 768px, 1280px, 1920px — zero overflow, no broken grids, no clipped text.
- [ ] Verify the sticky navigation header remains usable during scroll on all screen sizes.
- [ ] Confirm all `skiper-ui.com` and `21st.dev` components render without CSS conflicts against Tailwind.

#### 9.2 — Animation & Motion Audit
- [ ] Verify all `animejs` scroll-triggered animations fire exactly once on first IntersectionObserver entry.
- [ ] Confirm hero background SVG animations run at consistent 60fps (Chrome DevTools Performance panel — record 5 seconds).
- [ ] Verify animated number counters (Phase 3) trigger correctly and display correct final values.
- [ ] Confirm `motionsites.ai`-inspired section transitions are smooth with no frame drops on mid-range hardware.

#### 9.3 — Interactivity & CTA Audit
- [ ] Click every navigation anchor; confirm smooth scroll to the correct section with no offset errors.
- [ ] Click all 5 project placeholder cards; confirm `sweetalert2` modals open, scroll correctly on mobile, and dismiss on backdrop click and ESC key.
- [ ] Hover all `@popperjs/core` tooltip triggers; confirm correct positioning and no viewport clipping.
- [ ] Tab through the entire page using keyboard only; every interactive element must receive a visible focus ring.

#### 9.4 — Form & Backend Audit
- [ ] Submit the contact form with all valid data; confirm `200 OK`, success modal, both prospect and owner emails delivered.
- [ ] Submit with all fields empty; confirm all inline validation error states appear without page reload.
- [ ] Submit with an invalid email; confirm the field error state triggers.
- [ ] Submit 6 times rapidly; confirm rate-limiting triggers and the SweetAlert2 rate-limit modal displays on the 6th attempt.
- [ ] Open DevTools console; confirm **zero errors and zero warnings** across the full page lifecycle.

#### 9.5 — SEO & Metadata Final Audit
- [ ] Inspect page source (`Ctrl+U`); confirm all meta tags, Open Graph, Twitter Card, and JSON-LD blocks are present.
- [ ] Verify `sitemap.xml` returns valid XML at the live URL.
- [ ] Verify `robots.txt` returns correct directives at the live URL.
- [ ] Submit live URL to Google Search Console URL Inspection; confirm "Page is eligible to be indexed."

#### 9.6 — Performance Final Audit
- [ ] PageSpeed Insights: Performance ≥ 90 mobile, ≥ 95 desktop.
- [ ] Lighthouse Accessibility ≥ 90, Best Practices ≥ 95, SEO ≥ 95.
- [ ] WebPageTest from a US East location: fully loaded time < 3 seconds.

#### 9.7 — Security Final Audit
- [ ] Confirm no sensitive data (API keys, SMTP passwords, DB credentials) appears in any client-side JS bundle.
- [ ] Verify `/api/contact` returns `405 Method Not Allowed` for GET, PUT, DELETE requests (POST only).
- [ ] Confirm Content Security Policy (CSP) header is configured to block unauthorized external script injection.
- [ ] Verify Vercel environment variables are not logged to the client-facing console.

### Deployment & Vercel Verification
- **Final push:** Merge all verified branches into `main`; confirm Vercel completes the production build with zero errors.
- **SSL Verification:** Confirm the padlock icon is active and the certificate is valid for the correct domain.
- **Go/No-Go:** All 9 phases and all checklist items must be complete before the URL is shared with any prospect or promoted through any channel.

---

## APPENDIX A: QUICK REFERENCE — MANDATED RESOURCES

| Resource | URL | Primary Use |
|---|---|---|
| UI/UX Design Language | https://github.com/nextlevelbuilder/ui-ux-pro-max-skill | Layout patterns, design principles |
| SEO Framework | https://github.com/AgriciDaniel/claude-seo | Metadata, structured data, semantic HTML |
| Motion & Layout | https://motionsites.ai | Page layout inspiration, spatial motion |
| Component Library | https://skiper-ui.com | UI component containers, primitives |
| Micro-interactions | https://animejs.com | All JS-driven tweening and animation |
| Tooltip & Overlay | https://popper.js.org/docs/ | Positioning tooltips, dropdowns, overlays |
| Modals & Alerts | https://sweetalert2.github.io | Multi-state popup modals, notifications |
| React Components | https://21st.dev/community/components | Community production-ready React components |
| Vector Assets | https://app.superdesign.dev | SVG backgrounds, geometric grid assets |

---

## APPENDIX B: TARGET MARKET PROFILES

| Market | Primary Prospect Type | Key Pain Points to Address |
|---|---|---|
| 🇺🇸 USA | SaaS Founders, Series-A Startups | Speed to market, scalable architecture, no vendor lock-in |
| 🇬🇧 UK | Operations Directors, Digital Agencies | GDPR compliance, data ownership, EU hosting options |
| 🇦🇺 Australia | SMB Owners, Retail/E-commerce | Cost of Shopify Plus, custom integrations, local timezone support |
| 🇸🇬 Singapore | Fintech Startups, Enterprise Teams | API integrations, compliance-ready backends, regional scalability |
| 🇪🇺 Europe | B2B SaaS, Professional Services | GDPR, multilingual capability, performance at scale |

---

## APPENDIX C: DATA FILE LOCATIONS

All placeholder content must live in isolated files — never hardcoded into components.

| Data Type | File Path |
|---|---|
| Project case studies | `/src/data/projects.js` |
| Testimonials / social proof | `/src/data/testimonials.js` |
| Service track descriptions | `/src/data/services.js` |
| Tech stack chips | `/src/data/techStack.js` |
| FAQ entries | `/src/data/faq.js` |
| Process flow steps | `/src/data/processSteps.js` |
| Navigation links | `/src/data/navigation.js` |

---

> **Final Agent Directive:** This website is the first impression a $20,000 client will have of this business. Build it to a standard that makes them feel they would be *lucky* to work with you. Every section, every animation, every pixel must reinforce one message: *"This is an elite operator."*
