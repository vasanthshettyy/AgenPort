# Implementation Plan — Add Animated Pricing Catalog to Agency Portfolio

Design and integrate a high-converting, localized, and animated `PricingSection` component into the `agency_portfolio/v1.0` React app, using GSAP micro-animations, multi-country currency toggling, and Tailwind styling.

---

## User Review Required

> [!IMPORTANT]
> **Key Interactive Features:**
> 1. **5-Country / Currency Switcher:** 🇦🇺 AUD (Australia), 🇩🇰 DKK (Denmark), 🇸🇬 SGD (Singapore), 🇪🇺 EUR (Ireland/EU), 🇮🇳 INR (India) with smooth animated tab indicator.
> 2. **Build vs Build + Retainer Combo Toggle:** Interactive switch allowing clients to view one-time build prices or one-click Build + Retainer bundles.
> 3. **GSAP Scroll & Micro-Animations:** ScrollTrigger stagger reveal on cards, price counter morphing on currency switch, and magnetic hover glow effects.
> 4. **Pre-filled Contact CTA:** Clicking "Select Plan" smoothly scrolls to `#contact` and pre-populates the project inquiry message with the selected package.

---

## Proposed Changes

### Data & Components (`agency_portfolio/v1.0`)

#### [NEW] [pricingData.js](file:///c:/Agency/agency_portfolio/v1.0/src/data/pricingData.js)
- Contains structured plan definitions for Starter Site, Small Business Standard, and Growth / Custom Site with localized prices (AUD, DKK, SGD, EUR, INR), deliverables, and optional retainer add-ons.

#### [NEW] [PricingSection.jsx](file:///c:/Agency/agency_portfolio/v1.0/src/components/PricingSection.jsx)
- **Component Architecture:**
  - Header: Section title, description, and Country Market tabs (AUD / DKK / SGD / EUR / INR).
  - Billing Toggle: "One-Time Build" vs "Build + Retainer Combo" switch.
  - Card Grid: 3 responsive cards for Plan 1, Plan 2 (Highlighted/Popular badge), and Plan 3.
  - GSAP animations: Staggered entry, price number transition, hover glassmorphism glow.
  - CTA Button: Pre-selects package and scrolls to Contact form.

#### [MODIFY] [Header.jsx](file:///c:/Agency/agency_portfolio/v1.0/src/components/Header.jsx)
- Add "Pricing" navigation link pointing to `#pricing`.

#### [MODIFY] [App.jsx](file:///c:/Agency/agency_portfolio/v1.0/src/App.jsx)
- Lazy load `PricingSection.jsx` and render it right above `ProjectGrid.jsx` / `ContactSection.jsx`.

---

## Verification Plan

### Automated Build Verification
- Run `npm run build` in `c:/Agency/agency_portfolio/v1.0` to verify zero JSX or Vite bundling errors.

### Manual Verification
- Test country switcher tabs: confirm price amounts update instantly for all 5 markets (AUD, DKK, SGD, EUR, INR).
- Test retainer combo toggle: confirm retainer pricing is added dynamically with smooth UI feedback.
- Test scroll & GSAP animations: confirm smooth scroll animations and card hover effects.
