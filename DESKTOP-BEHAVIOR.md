# Desktop Behavior & Animation Reference Catalog

> **Documentation Only** — Comprehensive catalog of every animation, micro-interaction, hover effect, scroll effect, and canvas reveal active on the desktop version of the website, structured section by section in page order.

---

## Global & Persistent Layout Elements

### 1. Custom Dual-Layer Cursor
- **Target Component**: [CustomCursor.jsx](file:///c:/Agency/agency_portfolio/v1.0/src/components/CustomCursor.jsx)
- **Triggers**: Window `mousemove`, `mouseenter`, `mouseleave`, `mousedown`, `mouseup`.
- **Visual Action**:
  - Inner 8px cyan dot (`w-2 h-2 bg-content-accent rounded-full mix-blend-difference`) tracks mouse cursor with `duration: 0.1s`.
  - Outer 40px ring follower (`w-10 h-10 border-2 border-content-accent rounded-full mix-blend-difference`) tracks cursor with smooth trailing lag (`duration: 0.3s`).
  - `mousedown`: Outer follower ring scales down to `scale: 0.5` (`duration: 0.2s`).
  - `mouseup`: Outer follower ring scales back to `scale: 1.0` (`duration: 0.2s`).
  - `mouseenter` / `mouseleave`: Fades cursor elements in (`opacity: 1`) or out (`opacity: 0`).
- **Technology**: GSAP `gsap.to()` + `mix-blend-difference`.
- **Key Parameters**:
  - Inner dot duration: `0.1s`
  - Outer follower duration: `0.3s`
  - Click scale: `scale: 0.5`, duration `0.2s`
- **Mobile / Touch Status**: Completely hidden on mobile (`hidden lg:block`).
- **Classification**: `PURELY DECORATIVE`

---

### 2. Scroll Progress Indicator Bar
- **Target Component**: [ScrollProgress.jsx](file:///c:/Agency/agency_portfolio/v1.0/src/components/ScrollProgress.jsx)
- **Triggers**: Window `scroll` and `resize` events.
- **Visual Action**:
  - Fixed 2px cyan line (`fixed top-0 left-0 w-full h-[2px] bg-content-accent z-[9999]`) anchored to top edge of viewport.
  - Dynamically scales horizontally from `scaleX(0)` (top of page) to `scaleX(1.0)` (bottom of page) based on current scroll progress ratio.
- **Technology**: Native JS `requestAnimationFrame` + `ResizeObserver` + CSS `scaleX` transform.
- **Key Parameters**:
  - Progress calculation: `Math.min(1, Math.max(0, scrollY / (scrollHeight - clientHeight)))`
  - Transform origin: `origin-left`
- **Mobile / Touch Status**: Active and 100% functional across both mobile (375px, 390px, 428px) and desktop.
- **Classification**: `PURELY DECORATIVE`

---

### 3. Interactive Floating Badge
- **Target Component**: [FloatingBadge.jsx](file:///c:/Agency/agency_portfolio/v1.0/src/components/FloatingBadge.jsx), [index.css](file:///c:/Agency/agency_portfolio/v1.0/src/index.css#L156-L170)
- **Triggers**: Hover (`mouseenter`/`mouseleave`), Click / Keypress (`Enter`/`Space`).
- **Visual Action**:
  - Fixed pill badge (`fixed bottom-6 right-6 z-40`) featuring live green pulsing dot (`animate-ping opacity-75`).
  - Desktop hover: Badge lifts up `translateY(-4px)`, scales to `1.04`, border illuminates cyan (`rgba(0, 229, 255, 0.6)`), and drops cyan glow shadow (`0 10px 30px rgba(0, 229, 255, 0.35)`). Text color transitions from white to cyan (`lg:group-hover:text-content-accent`).
  - Click / Enter: Triggers smooth scroll down to `#contact` section.
- **Technology**: Tailwind CSS animations + custom `.floating-badge-interactive` CSS transitions.
- **Key Parameters**:
  - Transition timing: `300ms cubic-bezier(0.34, 1.56, 0.64, 1)`
  - Hover transform: `translateY(-4px) scale(1.04)`
- **Mobile / Touch Status**: Positioned centered bottom (`bottom-4 left-1/2 -translate-x-1/2`). Hover effects disabled on touch (`@media (hover: hover) and (pointer: fine)`). Click scroll active on touch.
- **Classification**: `PURELY DECORATIVE`

---

### 4. Smooth Inertial Scrolling (Lenis)
- **Target Component**: [SmoothScroll.jsx](file:///c:/Agency/agency_portfolio/v1.0/src/components/SmoothScroll.jsx)
- **Triggers**: Mouse wheel, touchpad scroll, keyboard navigation.
- **Visual Action**: Smooths native page scrolling with exponential momentum decay and synchronizes GSAP ScrollTrigger ticks.
- **Technology**: `@studio-freight/lenis` + `gsap.ticker`.
- **Key Parameters**:
  - Duration: `1.5s`
  - Easing curve: `(t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))`
  - Wheel multiplier: `1`
- **Mobile / Touch Status**: Bypassed on viewports <768px (`if (isMobile) return;`) to preserve native mobile touch scroll momentum.
- **Classification**: `PURELY DECORATIVE`

---

## Page Sections (In Order of Appearance)

### Section 1: Navigation & Header
- **Section Anchor**: `<header>` / `top`

#### 1. Header Drop Entrance
- **Target Element**: Header container in [Header.jsx](file:///c:/Agency/agency_portfolio/v1.0/src/components/Header.jsx#L23-L30)
- **Trigger**: Page mount / initial render.
- **Visual Action**: Header slides down from `y: -100` to `y: 0` while fading in from `opacity: 0` to `1`.
- **Technology**: GSAP `useGSAP` (`gsap.from`).
- **Key Parameters**: Duration `1.2s`, Easing `'power4.out'`.
- **Mobile / Touch Status**: Active on initial load.
- **Classification**: `PURELY DECORATIVE`

#### 2. Navigation Link Hover Color Shift
- **Target Element**: Desktop navigation links in [Header.jsx](file:///c:/Agency/agency_portfolio/v1.0/src/components/Header.jsx#L70)
- **Trigger**: Mouse hover (`mouseenter`/`mouseleave`).
- **Visual Action**: Text color transitions from secondary gray (`#a1a1a6`) to cyan accent (`#00e5ff`).
- **Technology**: Tailwind CSS transition (`transition-colors duration-300`).
- **Key Parameters**: Duration `300ms`.
- **Mobile / Touch Status**: Hidden on mobile (`hidden md:flex`).
- **Classification**: `PURELY DECORATIVE`

#### 3. Header Contact CTA Button Fill
- **Target Element**: Header "CONTACT" button in [Header.jsx](file:///c:/Agency/agency_portfolio/v1.0/src/components/Header.jsx#L79-L91), [index.css](file:///c:/Agency/agency_portfolio/v1.0/src/index.css#L202-L237)
- **Trigger**: Mouse hover.
- **Visual Action**: Solid cyan layer fills button from bottom to top (`translateY(100%)` to `translateY(0)`), while text color flips smoothly from white to canvas black (`#0a0a0a`). Border turns cyan.
- **Technology**: CSS transitions with `.btn-fill-layer` and `.btn-fill-text`.
- **Key Parameters**:
  - Fill duration: `300ms cubic-bezier(0.4, 0, 1, 1)`
  - Text transition: `300ms cubic-bezier(0.4, 0, 1, 1)`
- **Mobile / Touch Status**: Hidden on small mobile screens (`hidden sm:block`).
- **Classification**: `PURELY DECORATIVE`

#### 4. Mobile Hamburger Morph & Mobile Drawer Slide
- **Target Element**: Mobile toggle button & mobile navigation overlay in [Header.jsx](file:///c:/Agency/agency_portfolio/v1.0/src/components/Header.jsx#L94-L149)
- **Trigger**: Click / tap on hamburger button.
- **Visual Action**:
  - Hamburger 3 bars morph into an 'X' icon (top bar `rotate-45 translate-y-2`, middle bar `opacity-0`, bottom bar `-rotate-45 -translate-y-2` over 300ms).
  - Backdrop blur menu drawer slides down from top (`translateY(-16px)` to `translateY(0)`) and fades in over 0.35s. Body scrolling is locked (`overflow: hidden`).
- **Technology**: Tailwind CSS transitions + CSS `@keyframes mobileMenuIn`.
- **Key Parameters**:
  - Menu animation: `mobileMenuIn 0.35s cubic-bezier(0.4, 0, 0.2, 1)`
- **Mobile / Touch Status**: Mobile-only interface (`md:hidden`).
- **Classification**: `REQUIRED FOR ACCESSIBILITY` (provides primary navigation on mobile devices).

---

### Section 2: Hero Section
- **Section Anchor**: `#hero`

#### 1. Staggered Entrance Animation Sequence
- **Target Element**: Headline text lines, subtext, CTAs, and image container in [Hero.jsx](file:///c:/Agency/agency_portfolio/v1.0/src/components/Hero.jsx#L21-L35)
- **Trigger**: Page load / mount.
- **Visual Action**:
  - Headline lines (`.hero-line`): Fade in and slide up from `y: 40` to `y: 0` with 0.12s stagger.
  - Subtext (`.hero-sub`): Slides up from `y: 20` to `y: 0` with 1.0s duration.
  - CTA button (`.hero-cta`): Slides up from `y: 20` to `y: 0` with 0.8s duration.
  - Image container (`.hero-image-wrap`): Slides in horizontally from `x: 60` to `x: 0` with 1.5s duration.
- **Technology**: GSAP Timeline (`gsap.timeline({ defaults: { ease: 'expo.out' } })`).
- **Key Parameters**:
  - Headline stagger: `0.12s`
  - Headline duration: `1.2s`
  - Image slide duration: `1.5s`
- **Mobile / Touch Status**: Active on mount across all viewports.
- **Classification**: `PURELY DECORATIVE`

#### 2. Interactive Illustrated Portrait Reveal Canvas
- **Target Element**: Canvas overlay in [HeroCursorReveal.jsx](file:///c:/Agency/agency_portfolio/v1.0/src/components/HeroCursorReveal.jsx)
- **Trigger**: Mouse hover & move over hero photo (`mouseenter`, `mousemove`, `mouseleave`).
- **Visual Action**:
  - Moving the cursor across the photo draws smooth white circular brush strokes on an offscreen mask canvas.
  - Displays the illustrated portrait overlay (`/vasanth-hero-illustrated.webp`) clipped strictly to the brush trail, revealing the art over the base photo.
  - Mouseleave trigger: Trail smoothly decays exponentially (`1 - Math.exp(-k * dt)`) over ~4.9 seconds while maintaining soft Gaussian edge blur (`blur(13px)`).
- **Technology**: HTML5 Canvas 2D + `requestAnimationFrame` decay loop + Gaussian blur filter.
- **Key Parameters (Locked)**:
  - `SPOT_RADIUS`: `38px`
  - `TRAIL_DURATION`: `4900ms`
  - `BLUR_PX`: `13px`
  - `REL_SCALE`: `0.58`
  - `REL_X`: `0.162`
  - `REL_Y`: `-0.143`
- **Mobile / Touch Status**: Intentionally disabled on viewports <768px (`window.innerWidth >= 768` eligibility check returns `null`). Plain photo displays safely on mobile.
- **Classification**: `PURELY DECORATIVE`

#### 3. Hero Primary CTA Button Fill & Glow
- **Target Element**: "Start a Project" button in [Hero.jsx](file:///c:/Agency/agency_portfolio/v1.0/src/components/Hero.jsx#L64-L73), [index.css](file:///c:/Agency/agency_portfolio/v1.0/src/index.css#L202-L237)
- **Trigger**: Mouse hover.
- **Visual Action**: Bottom-to-top cyan layer fill (`translateY(0)` in 300ms), text turns black, cyan shadow glow.
- **Technology**: CSS transitions with `.btn-fill-layer` and `.btn-fill-text`.
- **Key Parameters**: Duration `300ms cubic-bezier(0.4, 0, 1, 1)`.
- **Mobile / Touch Status**: Hover fill disabled on touch (`@media (hover: hover)`).
- **Classification**: `PURELY DECORATIVE`

---

### Section 3: Why Me / Value Section
- **Section Anchor**: `#process` (rendered via [ValueSection.jsx](file:///c:/Agency/agency_portfolio/v1.0/src/components/ValueSection.jsx))

#### 1. Desktop Stacking Card Pinning & Scale-Down Effect
- **Target Element**: Value cards 01–05 in [ValueSection.jsx](file:///c:/Agency/agency_portfolio/v1.0/src/components/ValueSection.jsx#L52-L84)
- **Trigger**: Page scroll through section.
- **Visual Action**:
  - Cards 1 through 4 pin at `top top` of the viewport as the user scrolls.
  - As the next card scrolls over top, the pinned card's inner content (`.value-inner`) smoothly fades out (`opacity: 0`) and scales down (`scale: 0.92`) over `scrub: 1`.
  - Card 5 (last card) scrolls naturally without pinning.
- **Technology**: GSAP `ScrollTrigger.create` (`pin: true`, `pinSpacing: false`, `scrub: 1`).
- **Key Parameters**:
  - Pinning range: `top top` to `bottom top`
  - Scale offset: `scale: 0.92`
  - Scrub smoothing: `1`
- **Mobile / Touch Status**: Bypassed on viewports <1024px (`isMobile` check returns early).
- **Classification**: `PURELY DECORATIVE`

#### 2. Mobile Card Scroll Entrance Fade-Up
- **Target Element**: Value cards on mobile viewports in [ValueSection.jsx](file:///c:/Agency/agency_portfolio/v1.0/src/components/ValueSection.jsx#L87-L111)
- **Trigger**: Scroll into view (`start: 'top 80%'`).
- **Visual Action**: Cards fade in from `opacity: 0` and slide up from `y: 40` to `y: 0`.
- **Technology**: GSAP `ScrollTrigger` (`fromTo`).
- **Key Parameters**: Duration `0.9s`, Easing `'power3.out'`.
- **Mobile / Touch Status**: Mobile-only (<1024px viewports).
- **Classification**: `PURELY DECORATIVE`

---

### Section 4: Services Section
- **Section Anchor**: `#services` (rendered via [ServicesSection.jsx](file:///c:/Agency/agency_portfolio/v1.0/src/components/ServicesSection.jsx))

#### 1. Services Row Entrance Slide-Up
- **Target Element**: Service row items in [ServicesSection.jsx](file:///c:/Agency/agency_portfolio/v1.0/src/components/ServicesSection.jsx#L19-L35)
- **Trigger**: Scroll into view (`start: 'top 88%'`).
- **Visual Action**: Rows fade in from `opacity: 0` and slide up from `y: 40` to `y: 0`.
- **Technology**: GSAP `ScrollTrigger` (`fromTo`).
- **Key Parameters**: Duration `1.0s`, Easing `'power3.out'`.
- **Mobile / Touch Status**: Active across all viewports.
- **Classification**: `PURELY DECORATIVE`

#### 2. Interactive Left-to-Right Hover Wipe & Content Reveal
- **Target Element**: Service row hover elements in [ServicesSection.jsx](file:///c:/Agency/agency_portfolio/v1.0/src/components/ServicesSection.jsx#L38-L82)
- **Trigger**: Mouse hover (`mouseenter`/`mouseleave`).
- **Visual Action**:
  - `mouseenter`: Cyan background fill wipes in from left (`scaleX: 1` in 0.6s), bottom cyan line wipes in (`scaleX: 1` in 0.5s with 0.05s delay), service title shifts 8px right and turns white (`x: 8`, color `#fff` in 0.5s), description slides in & reveals (`opacity: 1`, `x: 0` in 0.5s).
  - `mouseleave`: Reverses all elements back to start states (`scaleX: 0`, title `x: 0` color `#888`, description `opacity: 0, x: -16`).
- **Technology**: GSAP context & event listeners.
- **Key Parameters**:
  - Fill wipe duration: `0.6s power2.out`
  - Title shift: `x: 8px`
  - Description slide: `x: -16px` to `0`
- **Mobile / Touch Status**: Gated on touch (`matchMedia('(hover: hover) and (pointer: fine)')`). On touch devices, decorative hover fills remain off, title is kept white (`#fff`), and service descriptions remain permanently visible (`opacity: 1, x: 0`).
- **Classification**: `REQUIRED FOR ACCESSIBILITY` on desktop (description is hidden until hover), but safely accessible on mobile (permanently visible).

---

### Section 5: Process Section
- **Section Anchor**: `#how-it-works` (rendered via [ProcessSection.jsx](file:///c:/Agency/agency_portfolio/v1.0/src/components/ProcessSection.jsx))

#### 1. Process Cards Entrance Stagger
- **Target Element**: Process cards in [ProcessSection.jsx](file:///c:/Agency/agency_portfolio/v1.0/src/components/ProcessSection.jsx#L39-L54)
- **Trigger**: Scroll into view (`start: 'top 75%'`).
- **Visual Action**: Cards fade in and slide up from `y: 30` to `y: 0` with 0.15s stagger between cards.
- **Technology**: GSAP `ScrollTrigger` (`fromTo`).
- **Key Parameters**: Duration `0.8s`, Stagger `0.15s`, Easing `'power3.out'`.
- **Mobile / Touch Status**: Active across all viewports.
- **Classification**: `PURELY DECORATIVE`

#### 2. Active Step Scroll Tracking & Pulse Glow Border
- **Target Element**: Process card border & badge in [ProcessSection.jsx](file:///c:/Agency/agency_portfolio/v1.0/src/components/ProcessSection.jsx#L60-L85), CSS `@keyframes activeBorderPulse`
- **Trigger**: Page scroll position.
- **Visual Action**: As user scrolls through the section (`top 60%` to `bottom 40%`), the active step (0 -> 1 -> 2 -> 3) updates sequentially. Active card gets gradient border rim, `scale-[1.02]`, cyan badge fill, icon cyan tint, and an infinite glowing cyan pulse animation (`activeBorderPulse 2.5s ease-in-out infinite`).
- **Technology**: GSAP `matchMedia` + `ScrollTrigger` + CSS `@keyframes activeBorderPulse`.
- **Key Parameters**:
  - Pulse duration: `2.5s ease-in-out infinite`
  - Active scale: `scale-[1.02]`
- **Mobile / Touch Status**: On mobile/tablet (<1024px), each card activates individually as it passes `top 65%` to `bottom 35%` of screen.
- **Classification**: `PURELY DECORATIVE`

#### 3. Revolving Conic-Gradient Laser Border Rim on Hover
- **Target Element**: `.process-glow` in [ProcessSection.jsx](file:///c:/Agency/agency_portfolio/v1.0/src/components/ProcessSection.jsx#L95-L103, L173-L180)
- **Trigger**: Mouse hover over process card (`lg:group-hover`).
- **Visual Action**: Conic gradient background rotates 360° continuously. Hovering card triggers `opacity: 1` and `animation-play-state: running`, rendering a revolving cyan laser border rim around the card.
- **Technology**: CSS `@keyframes processGlowRotate 4s linear infinite` + Tailwind `lg:group-hover:opacity-100`.
- **Key Parameters**: Rotation duration `4s linear infinite`.
- **Mobile / Touch Status**: Disabled on touch (`@media (hover: hover)`).
- **Classification**: `PURELY DECORATIVE`

---

### Section 6: Plans & Pricing Section
- **Section Anchor**: `#plans` (rendered via [PricingSection.jsx](file:///c:/Agency/agency_portfolio/v1.0/src/components/PricingSection.jsx))

#### 1. Card 3D Lift & Cyan Shadow Hover
- **Target Element**: Pricing cards in [PricingSection.jsx](file:///c:/Agency/agency_portfolio/v1.0/src/components/PricingSection.jsx#L54-L58), [index.css](file:///c:/Agency/agency_portfolio/v1.0/src/index.css#L116-L135)
- **Trigger**: Mouse hover.
- **Visual Action**:
  - Recommended card hover: Lifts `translateY(-8px)`, scales to `1.03`, border illuminates cyan (`rgba(0, 229, 255, 0.6)`), and drops cyan shadow (`0 24px 60px rgba(0, 229, 255, 0.25)`).
  - Standard cards hover: Lifts `translateY(-8px)`, scales to `1.025`, border illuminates cyan (`rgba(0, 229, 255, 0.5)`), and drops cyan shadow (`0 20px 50px rgba(0, 229, 255, 0.1)`).
- **Technology**: CSS transitions (`.pricing-card-hover`, `.pricing-card-hover-std`).
- **Key Parameters**: Duration `300ms ease-out`.
- **Mobile / Touch Status**: Lift disabled on touch (`@media (hover: hover)`). Active tap feedback via `active:scale-[0.98]`.
- **Classification**: `PURELY DECORATIVE`

#### 2. Recommended Badge Tilt & Scale Micro-Interaction
- **Target Element**: "Recommended" badge in [PricingSection.jsx](file:///c:/Agency/agency_portfolio/v1.0/src/components/PricingSection.jsx#L61-L65)
- **Trigger**: Mouse hover over Recommended pricing card.
- **Visual Action**: Top badge tilts 3° clockwise (`rotate-[3deg]`) and scales up `1.05x`.
- **Technology**: Tailwind CSS transition (`transition-transform duration-300 ease-out origin-left lg:group-hover:rotate-[3deg] lg:group-hover:scale-105`).
- **Key Parameters**: Duration `300ms ease-out`.
- **Mobile / Touch Status**: Disabled on mobile (`lg:group-hover`).
- **Classification**: `PURELY DECORATIVE`

#### 3. Deliverable Item Right-Shift Hover
- **Target Element**: Included deliverable rows in [PricingSection.jsx](file:///c:/Agency/agency_portfolio/v1.0/src/components/PricingSection.jsx#L89-L96)
- **Trigger**: Mouse hover over individual deliverable item.
- **Visual Action**: Row shifts 1.5px right (`translate-x-1.5`), bullet hyphen turns cyan, text brightens to white.
- **Technology**: Tailwind CSS transition (`transition-transform duration-200 ease-out lg:hover:translate-x-1.5`).
- **Key Parameters**: Duration `200ms ease-out`.
- **Mobile / Touch Status**: Disabled on mobile (`lg:hover`).
- **Classification**: `PURELY DECORATIVE`

#### 4. Request Quote CTA Button Fill & Shine Sweep
- **Target Element**: Card CTA buttons in [PricingSection.jsx](file:///c:/Agency/agency_portfolio/v1.0/src/components/PricingSection.jsx#L116-L140), [index.css](file:///c:/Agency/agency_portfolio/v1.0/src/index.css#L202-L237)
- **Trigger**: Mouse hover over CTA button.
- **Visual Action**:
  - Bottom-to-top layer fill wipes in (300ms ease-in), text color flips, arrow `->` shifts right (`translate-x-1`).
  - Diagonal white shine sweep gradient glides across button from left to right (`-translate-x-full` to `translate-x-full` over 700ms).
- **Technology**: CSS transitions + CSS shine sweep gradient.
- **Key Parameters**:
  - Wipe fill: `300ms ease-in`
  - Shine sweep: `700ms ease-in-out`
- **Mobile / Touch Status**: Active tap feedback via `active:scale-[0.98]`.
- **Classification**: `PURELY DECORATIVE`

---

### Section 7: Work / Projects Section
- **Section Anchor**: `#work` (rendered via [ProjectGrid.jsx](file:///c:/Agency/agency_portfolio/v1.0/src/components/ProjectGrid.jsx))

#### 1. Desktop Parallax Image Scroll & Text Slide-In
- **Target Element**: Project items in [ProjectGrid.jsx](file:///c:/Agency/agency_portfolio/v1.0/src/components/ProjectGrid.jsx#L101-L132)
- **Trigger**: Scroll into view (`start: 'top bottom'` to `bottom top`).
- **Visual Action**:
  - Project preview image container parallax-scrolls upward (`y: -100` with `scrub: 1.5`).
  - Text column slides in horizontally from alternating sides (even cards from right `x: 100`, odd cards from left `x: -100`) while fading in from `opacity: 0` to `1`.
- **Technology**: GSAP `ScrollTrigger` (`scrub: 1.5` for parallax, `from` for text).
- **Key Parameters**:
  - Image parallax offset: `y: -100`, `scrub: 1.5`
  - Text horizontal slide: `x: 100` / `-100`, duration `1.5s`
- **Mobile / Touch Status**: Bypassed on viewports <1024px (`isMobile` check returns early). Mobile uses simple scroll fade-up (`opacity: 0, y: 50` -> `opacity: 1, y: 0`, duration 0.9s).
- **Classification**: `PURELY DECORATIVE`

#### 2. Project Card Overlay Fade & Button Fill
- **Target Element**: Project card image overlay in [ProjectGrid.jsx](file:///c:/Agency/agency_portfolio/v1.0/src/components/ProjectGrid.jsx#L176-L184)
- **Trigger**: Mouse hover over project card.
- **Visual Action**: Dark overlay fades in (`opacity: 1`), revealing centered "VIEW PROJECT" pill button. Hovering button triggers bottom-to-top cyan layer fill.
- **Technology**: Tailwind CSS transition (`transition-opacity duration-500`) + `.btn-fill-layer-btn`.
- **Key Parameters**: Overlay fade `500ms`.
- **Mobile / Touch Status**: On mobile, dark overlay is permanently visible (`opacity-100`).
- **Classification**: `REQUIRED FOR ACCESSIBILITY` on desktop if button was hidden, but safely accessible on mobile (permanently visible).

#### 3. Project Title Color & "Visit Site ->" Arrow Slide
- **Target Element**: Project title header in [ProjectGrid.jsx](file:///c:/Agency/agency_portfolio/v1.0/src/components/ProjectGrid.jsx#L190-L195)
- **Trigger**: Mouse hover over project card.
- **Visual Action**: Title text turns cyan (`lg:group-hover/card:text-content-accent`), "Visit Site ->" label fades in from 0 to 100% opacity and slides into place (`translate-x-2` to `translate-x-0`).
- **Technology**: Tailwind CSS transitions (`transition-colors duration-300`, `transition-all duration-300 transform`).
- **Key Parameters**: Duration `300ms`.
- **Mobile / Touch Status**: On mobile, "Visit Site ->" label is permanently visible (`opacity-100 translate-x-0`).
- **Classification**: `PURELY DECORATIVE`

---

### Section 8: FAQ Section
- **Section Anchor**: `#faq` (rendered via [FaqSection.jsx](file:///c:/Agency/agency_portfolio/v1.0/src/components/FaqSection.jsx))

#### 1. CSS Grid Accordion Expand / Collapse
- **Target Element**: FAQ answer container in [FaqSection.jsx](file:///c:/Agency/agency_portfolio/v1.0/src/components/FaqSection.jsx#L82-L99), [index.css](file:///c:/Agency/agency_portfolio/v1.0/src/index.css#L138-L153)
- **Trigger**: Click / tap on question row.
- **Visual Action**: Toggles `.is-open` class. CSS Grid transitions from `grid-template-rows: 0fr` (`opacity: 0`) to `grid-template-rows: 1fr` (`opacity: 1`), while answer text slides down (`-translate-y-2` to `translate-y-0` in 500ms ease-out).
- **Technology**: Pure CSS Grid animation (`.faq-grid-accordion`).
- **Key Parameters**:
  - Accordion transition: `grid-template-rows 400ms cubic-bezier(0.4, 0, 0.2, 1), opacity 400ms`
  - Text slide: `500ms ease-out`
- **Mobile / Touch Status**: Active and 100% functional on mobile and desktop.
- **Classification**: `REQUIRED FOR ACCESSIBILITY` (allows users to reveal/hide FAQ answers on demand).

#### 2. Vector SVG Plus/Minus Cross Morph & Container Glow
- **Target Element**: FAQ circle toggle icon in [FaqSection.jsx](file:///c:/Agency/agency_portfolio/v1.0/src/components/FaqSection.jsx#L71-L93)
- **Trigger**: Mouse hover over question row & Click / tap.
- **Visual Action**:
  - Closed state: Shows crisp vector `+` icon. Hovering row highlights question text and icon border (`group-hover:border-content-accent/60`).
  - Open state (`isOpen === true`): Circle container turns cyan with glow (`border-content-accent bg-content-accent/10 shadow-[0_0_15px_rgba(0,229,255,0.25)] scale-105`), SVG rotates 180°, and vertical line rotates 90° & scales down to 0 opacity (`opacity-0 scale-0 rotate-90`), smoothly morphing `+` into `−`.
- **Technology**: SVG CSS transitions (`transition-transform duration-500 ease-out`, `transition-all duration-500 origin-center`).
- **Key Parameters**: Duration `500ms ease-out`.
- **Mobile / Touch Status**: Active on touch tap toggle.
- **Classification**: `PURELY DECORATIVE`

#### 3. "See All Questions" Button Fill & Arrow Flip
- **Target Element**: See All button in [FaqSection.jsx](file:///c:/Agency/agency_portfolio/v1.0/src/components/FaqSection.jsx#L107-L125), [index.css](file:///c:/Agency/agency_portfolio/v1.0/src/index.css#L202-L237)
- **Trigger**: Mouse hover & Click / tap.
- **Visual Action**: Hovering button triggers bottom-to-top cyan layer fill and text color flip. Clicking toggles `showAll` state, revealing remaining FAQ items, and flips dropdown arrow 180° (`rotate-180`).
- **Technology**: CSS transitions with `.btn-fill-layer` and `.btn-fill-text` + SVG rotation (`transition-transform duration-300`).
- **Key Parameters**: Duration `300ms`.
- **Mobile / Touch Status**: Click toggle active on mobile; hover fill disabled on touch.
- **Classification**: `REQUIRED FOR ACCESSIBILITY` (reveals remaining 6 hidden FAQ items).

---

### Section 9: Contact Section
- **Section Anchor**: `#contact` (rendered via [ContactSection.jsx](file:///c:/Agency/agency_portfolio/v1.0/src/components/ContactSection.jsx))

#### 1. Input Underline Focus Expansion & Hover Highlight
- **Target Element**: Input fields & textarea in [ContactSection.jsx](file:///c:/Agency/agency_portfolio/v1.0/src/components/ContactSection.jsx#L171-L205)
- **Trigger**: Mouse hover & Input focus (`group-focus-within`).
- **Visual Action**:
  - Hovering input row highlights bottom border (`hover:border-content-secondary/60`).
  - Focusing input expands cyan accent bar from 0 width to 100% width (`group-focus-within:w-full` in 500ms ease-out) and turns bottom border cyan (`focus:border-content-accent`).
- **Technology**: Tailwind CSS transitions (`transition-all duration-500 ease-out`).
- **Key Parameters**: Expansion duration `500ms ease-out`.
- **Mobile / Touch Status**: Active on mobile focus & touch tap.
- **Classification**: `PURELY DECORATIVE`

#### 2. Submit Inquiry Button Fill & Cyan Glow
- **Target Element**: Submit button in [ContactSection.jsx](file:///c:/Agency/agency_portfolio/v1.0/src/components/ContactSection.jsx#L210-L225), [index.css](file:///c:/Agency/agency_portfolio/v1.0/src/index.css#L202-L237)
- **Trigger**: Mouse hover.
- **Visual Action**: Bottom-to-top cyan layer fill wipes in (300ms), text turns canvas black (`group-hover:text-canvas`), border turns cyan, and outer cyan glow shadow activates (`hover:shadow-[0_0_30px_rgba(0,229,255,0.25)]`).
- **Technology**: CSS transitions with `.btn-fill-layer` and `.btn-fill-text` + cyan glow shadow.
- **Key Parameters**: Duration `300ms`.
- **Mobile / Touch Status**: Submit click active on touch.
- **Classification**: `PURELY DECORATIVE`

#### 3. Submitting Spinner & SweetAlert2 Modal
- **Target Element**: Submit state spinner & alert dialog in [ContactSection.jsx](file:///c:/Agency/agency_portfolio/v1.0/src/components/ContactSection.jsx#L107-L129, L218-L222)
- **Trigger**: Form submission (`onSubmit`).
- **Visual Action**: Sets `isSubmitting: true`, hides button text, reveals centered cyan spinner (`animate-spin`). On API response, triggers dark-themed modal popup (`#0a0a0a` background, `#f5f5f7` text, `#00e5ff` button).
- **Technology**: CSS `animate-spin` + SweetAlert2 (`Swal.fire`).
- **Key Parameters**: Spinner rotation `infinite`.
- **Mobile / Touch Status**: Active and 100% functional across mobile and desktop.
- **Classification**: `REQUIRED FOR ACCESSIBILITY` (provides critical user feedback on form submission state).

---

### Section 10: Footer
- **Section Anchor**: `<footer>` (rendered via [Footer.jsx](file:///c:/Agency/agency_portfolio/v1.0/src/components/Footer.jsx))

#### 1. Footer Nav Link & Privacy Policy Hover Accent
- **Target Element**: Footer links in [Footer.jsx](file:///c:/Agency/agency_portfolio/v1.0/src/components/Footer.jsx#L43-L54, L62)
- **Trigger**: Mouse hover.
- **Visual Action**: Text color transitions from secondary gray (`text-content-secondary`) to cyan accent (`lg:hover:text-content-accent`). Privacy Policy link transitions to white (`lg:hover:text-content-primary`). Internal links trigger smooth scroll.
- **Technology**: Tailwind CSS transitions (`transition-colors`).
- **Key Parameters**: Duration `300ms`.
- **Mobile / Touch Status**: Touch targets `min-h-[44px]`, hover color transitions disabled on mobile (`lg:hover`).
- **Classification**: `PURELY DECORATIVE`

---

### Page 11: Privacy Policy Page
- **Page Route**: `/privacy-policy` (rendered via [PrivacyPolicy.jsx](file:///c:/Agency/agency_portfolio/v1.0/src/components/PrivacyPolicy.jsx))

#### 1. "← Back to Home" Link Hover Accent
- **Target Element**: Back link in [PrivacyPolicy.jsx](file:///c:/Agency/agency_portfolio/v1.0/src/components/PrivacyPolicy.jsx#L13-L18)
- **Trigger**: Mouse hover.
- **Visual Action**: Text color transitions from secondary gray to cyan accent (`hover:text-content-accent`).
- **Technology**: Tailwind CSS transition (`transition-colors`).
- **Key Parameters**: Duration `300ms`.
- **Mobile / Touch Status**: Active link on mobile.
- **Classification**: `PURELY DECORATIVE`

#### 2. Inline Email Mailto Links Hover Underline Accent
- **Target Element**: Email links in [PrivacyPolicy.jsx](file:///c:/Agency/agency_portfolio/v1.0/src/components/PrivacyPolicy.jsx#L65-L67, L87-L89)
- **Trigger**: Mouse hover.
- **Visual Action**: Text color transitions from cyan accent to white (`hover:text-content-primary`).
- **Technology**: Tailwind CSS transition (`transition-colors`).
- **Key Parameters**: Duration `300ms`.
- **Mobile / Touch Status**: Active mailto link on mobile.
- **Classification**: `PURELY DECORATIVE`
