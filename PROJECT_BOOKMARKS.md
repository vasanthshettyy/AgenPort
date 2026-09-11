# Agency Portfolio — Project Bookmarks & Development Milestones

**Current Status**: ~90% Complete  
**Branch**: `main`  
**Repository**: `vasanthshettyy/AgenPort`

---

## 📌 Key Feature & Component Bookmarks

### 1. Work / Projects Section (`ProjectGrid.jsx`)
- **Instagram Stories-Style Progress Bar**: Redesigned the project preview indicator into a segmented progress bar. Active segment fills smoothly with cyan (`#00E5FF`) over the 2.8s cycle duration powered by `requestAnimationFrame`.
- **Hover-Pause Mechanism**: Hovering over any project card pauses the progress bar fill at its exact percentage (`isHovered`), resuming smoothly upon unhovering.
- **Manual Segment Navigation**: Clickable segment pills allow jumping directly to any slide while preventing card link redirection (`e.stopPropagation()`).
- **Aspect Ratio & Parallax Bounds**: Overhang set to `h-[106%] -top-[3%]` with bounded percentage scrub (`yPercent: 3 -> -3`) on desktop, preventing empty black container bottom exposures during scroll.
- **12 Live Production Screenshots**: 3 distinct, high-res 1280x800 screenshots tracked in Git for AetherIntake, Meridian Assets, AXIOM Neural Interface, and Vasanth Shetty Portfolio.

### 2. Smooth Scroll Engine (`SmoothScroll.jsx` & `index.css`)
- **Lenis Smooth Scroll Integration**: Custom RAF loop syncing `@studio-freight/lenis` with GSAP ScrollTrigger.
- **Scroll Conflict Fix**: Scoped `html { scroll-behavior: auto; }` on desktop to prevent native browser CSS smooth scrolling from fighting Lenis RAF `window.scrollTo()` calls, eliminating stuck scroll bugs.
- **Mobile Touch Native Scroll**: Kept `html { scroll-behavior: smooth; }` scoped to mobile (`< 768px`) where Lenis is disabled.

### 3. Process Section ("How It Works") (`ProcessSection.jsx`)
- **3D Parallax Tilt**: Interactive card tilt using mouse coordinates on desktop and touch coordinates on mobile/tablet (`< 1024px`).
- **Radial Touch Spotlight**: Floating gradient spotlight following cursor/finger touch position across step cards.
- **Typography & Glow Transitions**: Smooth transitions to pure white (`#ffffff`) for titles and subtext paragraphs on active hover or touch.

### 4. Services Section (`ServicesSection.jsx`)
- **Desktop Pointer Hover Fill**: Scale-X fill animations (`scaleX: 0 -> 1`) on card hover with accent border lines.
- **Mobile Touch Animation**: Touch-start/touch-end handlers providing high-contrast text shadow glows (`0 0 16px rgba(0, 229, 255, 0.45)`) for touchscreens without hover capabilities.

### 5. Value Section ("Why Me") (`ValueSection.jsx`)
- **Desktop Card Stacking**: GSAP ScrollTrigger pinning (`pin: true, pinSpacing: false`) creating overlapping card depth on desktop scroll.
- **Mobile 3D Touch Tilt**: Gyroscopic tilt and scale response on mobile cards with giant translucent background numbers (`01` through `05`).

### 6. Header & Mobile Nav Drawer (`Header.jsx`)
- **Scroll-Lock Safety**: `document.body.style.overflow = 'hidden'` and `touchAction = 'none'` applied strictly when mobile drawer is open, cleanly reverting when closed.
- **Smooth Anchor Links**: Instant scroll-to-view navigation for section targets (`#work`, `#services`, `#process`, `#pricing`, `#faq`, `#contact`).

---

## 📜 Recent Git Commit History

| Commit | Scope | Description |
| :--- | :--- | :--- |
| `6a3c5e0` | `feat(projects)` | Add all 12 distinct project screenshot images for live deployment |
| `b1561c1` | `chore` | Update `.gitignore` to unignore `public/projects/*.png` |
| `ec0b791` | `feat(projects)` | Redesign screenshot indicator into Instagram Stories progress bar with hover-pause |
| `23d2fca` | `fix(scroll)` | Scope `html` `scroll-behavior` to prevent Lenis smooth scroll conflict on desktop |
| `5d4c88b` | `feat(work)` | Implement screenshot cycle preview for project cards |
| `763865c` | `feat(mobile)` | Add 3D parallax tilt and touch spotlight to Process section cards |
| `1f2d163` | `style(process)` | Smooth card hover and touch scale transitions |
| `596730a` | `style(process)` | Transition card subtext description to pure white on hover or touch |
| `781f899` | `fix(mobile)` | Ensure subtext paragraph inherits color for crisp white transition |
| `5b0507b` | `style(mobile)` | Transition service description subtexts to clean pure white on touch |
| `b868f19` | `feat(mobile)` | Add mobile touch swipe animation and text glow to Services section |
| `3ffec86` | `feat(mobile)` | Refine value section capsule wording and add touch glow effects |
| `0c13799` | `feat(mobile)` | Redesign Why Me section cards with giant background numerals and 3D touch tilt |
