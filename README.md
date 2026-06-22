# Handoff: Rieli Boldrini — Product Design Portfolio

## Overview
A single-page personal portfolio for **Rieli Boldrini — Senior Product Designer**, built in the warm, editorial **Rieli Design System** (terracotta-amber + cream, high-contrast grotesque type, floating glass pill chrome).

It has two top-level surfaces:
1. **Home** — a floating glass navbar, a **Samples mosaic** (Section 1) on a full amber field, and a **Work** list of large case cards (Section 2).
2. **Case study pages** — long-form, full-width case articles. Two exist: *Optimizing the omnichannel sales funnel* (primary) and *A gift for the business*.

Navigation is **hash-based** (`#/`, `#/about`, `#/case/omnichannel`, `#/case/gift`) so deep links and refresh work. A small dependency-free engine (`scroll-fx.js`) adds reveal-on-scroll and restrained image parallax.

> **What changed most recently (read this first):** the case-study header was replaced by a new **OnePage** component — a bordered *bento* grid (title card · dark lede+before/after card · image · metadata strip). An **About** page was added and linked in the nav. The nav links became **outlined pills** (2px border on hover/active) instead of filled. The end-of-case **results** block became a ruled **table** (`ImpactResults`) standardized across both cases. See sections 1, 5, 5a and 6 below.

---

## About the Design Files
The files in this bundle are **design references created in HTML/React-via-Babel** — prototypes that demonstrate the intended look, layout, and behavior. **They are not production code to copy verbatim.**

The task is to **recreate these designs in the target codebase's existing environment** (e.g. a real React/Next.js app, Vue, Astro, etc.) using its established routing, component, and styling patterns. If no environment exists yet, pick the most appropriate stack (a static React/Next.js or Astro site fits this content well) and implement there.

The prototype uses in-browser Babel + global components only to stay self-contained for review — a real implementation should use a proper bundler, real ES modules/imports, and the host app's component conventions.

---

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, radii, shadows, and interactions are all specified. Recreate the UI pixel-accurately. All design tokens are listed below and ship as CSS custom properties in `assets/colors_and_type.css`.

> **Fonts (canonical):** this bundle ships the design system's real webfonts (latin subset) in `assets/fonts/`, declared in `assets/fonts.css` and pulled in by `assets/colors_and_type.css`.
> - **Boldonse** (`--font-display`) — a heavy, blocky, *wide* display face that ships a **single weight (400)**. Use it ONLY for short headings (H1/H2, card titles, the wordmark, big result numbers). **Never set it to 900** (faux-bold distorts it; it already reads as black) and never use it for running text. It runs wide, so display sizes are tuned smaller with near-zero tracking.
> - **Google Sans Flex** (`--font-heading` / `--font-body` / `--font-ui`) — variable (1–1000); used for H3, nav, CTAs, labels, the lede, pull-quotes, body copy and UI. Body 400, bold 700.
>
> Exact px/weight per element live in `styles.css` (the canonical source) — the callouts below reflect the retuned values.

---

## Screens / Views

### 1. Home — Navbar (global, on every view)
- **Purpose:** brand mark + primary nav; sticky.
- **Layout:** A `position: sticky; top: 18px` centered wrapper. Inside, a **floating glass pill** `nav`: max-width 583px, height 72px, `border-radius: 50px`, padding `14px 18px 14px 34px`, `display:flex; justify-content:space-between; align-items:center`.
- **Glass effect:** `background: rgba(255,255,255,0.20)`, `backdrop-filter: blur(30px)`, `border: 1px solid rgba(255,255,255,0.24)`, `box-shadow: 0 1px 2px rgba(0,0,0,0.25)`.
- **Components:**
  - **Logo** — the brand wordmark is the text **`Rieli`**, set in the display face: `font-family: Boldonse; font-weight: 400; font-size: 27px; line-height: 1; letter-spacing: -0.005em; color: #3D2710`. Render as text, not an image. Links to `#/`.
  - **Nav links** "Work", "About", "LinkedIn" and "Resumé ⬇" — `font-family: Google Sans Flex; font-weight: 700; font-size: 20px; color: #3D2710; padding: 9px 22px; border-radius: 64px`. They are **outlined pills**: `border: 2px solid transparent` at rest; **hover** → `border-color: rgba(31,30,29,0.40)` (subtle); **active page** (`.on`) → `border-color: #3D2710` (solid brown). No background fill. "Resumé" has a trailing 18px download icon (placeholder — wire to a PDF/Google Doc); "LinkedIn" opens the profile in a new tab; "About" → `#/about`; "Work" → home/`#work`.
  - **Hamburger** (mobile ≤680px): 46px circle button, `background: rgba(255,255,255,0.40)`, shows a menu/close icon; opens a **sheet** dropdown (`background: #FAF9F5`, `border-radius: 30px`, hairline border, `box-shadow` md) holding the same links stacked full-width.
- **Responsive:** ≤680px the inline `.nav-links` hide and `.nav-burger` shows; the sheet positions absolutely under the bar (`top: 84px; left/right: 24px`).

### 2. Home — Section 1: Samples mosaic
- **Purpose:** show visually attractive samples of work; some link to case studies, others are just imagery (may be unfinished). On hover an image goes from **grayscale → full color**; if a sample is a video it autoplays muted on hover.
- **Layout:** A full **amber** (`#D48824`) field: `border-radius: 40px; margin: 14px 24px 0; padding: 26px; overflow: hidden`. A faint top-right radial white highlight (`opacity .5`) adds subtle texture.
- **Grid:** CSS Grid, `grid-template-columns: repeat(6, 1fr); gap: 16px`, with named areas:
  ```
  "pt   pt   feat feat feat feat"
  "s2   s2   s2   s3   s3   s3"
  "s4   s4   s4   s4   s4   s4"
  "s5   s5   s5   s6   s6   s6"
  ```
  Row heights are driven by per-tile **aspect-ratio** so each row's tiles align:
  - `pt` (portrait) = 1/1, radius 26px
  - `feat` = 2/1
  - `s2`, `s3`, `s5`, `s6` = 3/2
  - `s4` (wide) = 3/1
  - All tiles: `border-radius: 24px; overflow: hidden`.
- **Tiles (current content):**
  1. `pt` — portrait `assets/work-1.jpg` (Rieli). Not a link.
  2. `feat` — `assets/work-2.png` (3 teal phones, store availability). **Links → omnichannel case.**
  3. `s2` — `assets/gift-mock-1.png` (gift packaging picker).
  4. `s3` — `assets/gift-flow.png` (gift lifestyle photo).
  5. `s4` — `assets/work-3.png` (isometric exploration board). **Links → omnichannel case.**
  6. `s5` — `assets/gift-2.png` (checkout gifting flow screens).
  7. `s6` — `assets/work-4.png` (seasonal gift box PDP).
- **Media behavior:**
  - Default: `filter: grayscale(1) contrast(.96)`; transition `filter .55s ease, transform .9s ease`.
  - Hover (whole tile): media `filter: grayscale(0) contrast(1); transform: scale(1.06)`.
  - Hover (tile container): **slight tilt** `transform: rotate(-1.6deg) scale(1.012)`, alternating to `rotate(1.6deg)` on every even tile (`:nth-of-type(even)`), `z-index: 2`, plus amber glow `box-shadow` (`var(--shadow-glow-card)`); transition `transform .5s cubic-bezier(.2,.7,.2,1)`. Disabled under `prefers-reduced-motion: reduce`.
  - **Linkable tiles** (`is-link`): `cursor: pointer`, keyboard-focusable (`role="link"`, `tabIndex=0`, Enter/Space activates). On hover a **badge** fades up at bottom-left: "View case ↗" — `font: Google Sans Flex 700 13px; color: #F5EED6; background: rgba(34,34,34,0.80); border-radius: 50px; padding: 7px 14px; backdrop-filter: blur(8px)`.
  - **Video tiles** (set `video` src): `<video muted loop playsInline preload="none" poster={img}>`; a play-glyph chip shows top-right at rest and fades out on hover; `play()` on mouseenter, `pause()` on mouseleave.
- **Responsive ≤680px:** grid collapses to a single column in order `pt, feat, s2, s3, s4, s5, s6`. Portrait capped at 62% width, aspect 4/3; others ~16/11. On touch the color + badge are shown without hover (grayscale stays as the resting filter; badge `opacity:1`).

### 3. Home — Section 2: Work (case cards)
- **Purpose:** entry points into full case studies.
- **Layout:** `padding: 78px 24px 0`. A **header row**: H2 "Work" (`Boldonse 400 33px; line-height 1.08; letter-spacing -0.005em; #3D2710`) + sub "Selected case studies" (`Google Sans Flex 18px; #3D2710; opacity .7`), baseline-aligned, with a hairline bottom border (`0.5px solid rgba(31,30,29,0.40)`). Cards stack in a single column, `gap: 28px`.
- **Case card** (`.case-card`): `position: relative; border-radius: 50px; overflow: hidden; aspect-ratio: 2.35/1`. Full-bleed cover `<img>` (object-fit cover). A left-anchored **scrim**: `linear-gradient(90deg, rgba(20,16,11,.92) 0%, rgba(20,16,11,.82) 42%, rgba(20,16,11,.18) 78%, transparent 100%)`, content vertically centered, `padding: 0 56px; max-width: 560px`. Hover → `transform: translateY(-4px)` + amber glow `box-shadow`.
  - **Kicker:** `Google Sans Flex 700 14px; letter-spacing .12em; text-transform: uppercase; color: #D48824`. (e.g. "Boticário Group · 2026")
  - **Title:** `Boldonse 400 29px; line-height 1.08; letter-spacing -0.005em; color: #F5EED6; max-width: 15ch`.
  - **Desc:** `Google Sans Flex 400 18px; line-height 1.4; color: #F5EED6; opacity .92; max-width: 42ch`.
  - **CTA pill:** "View project →" — `Google Sans Flex 700 18px; background: #D48824; color: #F5EED6; border-radius: 50px; padding: 12px 28px`. Hover → `brightness(1.08)`.
  - **Current cards:** (1) *Optimizing the omnichannel sales funnel* → `#/case/omnichannel`, cover `assets/work-2.png`. (2) *A gift for the business* → `#/case/gift`, cover `assets/gift-flow.png`.
- **Responsive:** ≤880px `aspect-ratio: 1.6/1`, title 25px, scrim `max-width: 78%`. ≤680px the card de-layers — image becomes a 200px banner on top and the scrim becomes a solid `#3D2710` block below it (`border-radius: 34px`).

### 4. Home — Footer
- `display: flex; align-items: flex-end; justify-content: space-between; padding: 90px 24px 0`.
- Left: big **`./`** wordmark (`Boldonse 400 58px; letter-spacing -0.01em`). Right: meta (`Google Sans Flex 14px; #545454`): "Rieli Boldrini — Senior Product Designer / São Paulo, Brazil · rie.li" (rie.li underlined).

### 5. Case study page (template — applies to both cases)
Full-width article; body sections capped at **970px** with 24px gutters. The header is the **OnePage** bento (5a); below it come bullet sections, image bands, an optional pull quote, and the results table (6).
- **Back control:** `← Back to work` button at top (`Google Sans Flex 700 16px; #3D2710; opacity .75`).
- **Bullet sections (`.rk-cs-section`, centered):** Title-Case **H2** (`Boldonse 400 33px; line-height 1.8; letter-spacing -0.005em`) + optional framing paragraph + a left-aligned **bullet list** with the **bold lead-in label** pattern. Each `li`: `Google Sans Flex 400 19px; line-height 1.5`, `<strong>Lead:</strong> text`.
- **Image pairs (`.cs-pair`):** two images side by side, `gap: 24px; border-radius: 24px`. Single images use `.cs-img` (radius 30px).
- **Pull quote (`.rk-cs-quote`)** (gift case): `Boldonse`-adjacent display, amber `#D48824`, large, max-width ~900px.
- **Next/Back footer (`.cs-next`):** two amber pill buttons — "← All projects" and "{next case} →".
- **Responsive ≤680px:** H1/title shrink, metadata → 1 column, bento stacks (see 5a), results table reflows (see 6).

### 5a. OnePage — the case header bento (`.cs-hero`)
The signature header component. A single rounded, bordered grid that packs company + title, the lede, a before/after table, the hero image, and metadata into one framed unit.
- **Frame:** `margin: 24px 24px 0; border: 2px solid #3D2710; border-radius: 40px; overflow: hidden; position: relative`. It is a CSS grid with **2px gaps over a brown (`#3D2710`) background**, so the gaps render as 2px brown hairline dividers between cells.
- **Grid:** `grid-template-columns: 1fr 1fr; grid-template-rows: auto 1fr auto;` with areas:
  ```
  "title media"
  "body  media"
  "body  meta"
  ```
  So the **left** column = title card (top) over the dark body card (fills down); the **right** column = image (fills top→) over the metadata strip (bottom).
- **Quadrant 1 — title card (`.cs-hero-titlecard`):** background **cream `#F5EED6`** (the DS beige; NOT white), `padding: 46px 48px 38px`.
  - **Company kicker (`.cs-hero-company`):** `Google Sans Flex; font-weight: 300; font-size: 20px; color: #3D2710; margin-bottom: 20px`. (e.g. “Boticário Group”.)
  - **Title (`.cs-hero-title`):** `Boldonse 400 46px; line-height: 1.5; letter-spacing: -0.005em; color: #3D2710`. The `line-height` is **unitless (1.5)** on purpose — it stays proportional when the font-size drops on mobile.
- **Quadrant 2 — body card (`.cs-hero-bodycard`):** background **brown `#3D2710`**, `color: #F5EED6`, `padding: 46px 48px`, `display:flex; flex-direction:column; gap:40px`.
  - **Lede (`.cs-hero-lede`):** `Google Sans Flex 500 20px; line-height: 1.25; color: #F5EED6`.
  - **Before/After table (`.cs-compare`):** `width:100%; border-collapse:collapse; margin-top:auto`. Header row `th`: `Google Sans Flex 700 13px; letter-spacing .09em; uppercase; color: rgba(245,238,214,.5)` (“Before” / “After” columns are 130px each). Body rows: `td` `border-top: 1px solid rgba(245,238,214,.16); padding: 18px 0`. Cells: label `.cs-compare-row` (`GSF 18px; #F5EED6`), before `.cs-compare-before` (`GSF 18px; rgba(245,238,214,.55)`), after `.cs-compare-after` (`GSF 700 18px; amber #D48824`).
- **Quadrant 3 — media (`.cs-hero-media`):** `min-height: 420px; overflow:hidden; background:#0e3a33; cursor: zoom-in`. `<img>` fills with `object-fit: cover`.
  - **Hover-to-fill interaction:** a duplicate of the image (`.cs-hero-cover`, `position:absolute; inset:0; z-index:5; opacity:0; pointer-events:none`) fades in (`opacity .5s cubic-bezier(.22,.61,.36,1)`) to cover the **entire** OnePage when the image is hovered (`.cs-hero-media:hover ~ .cs-hero-cover`); its image eases from `scale(1.04)` → `scale(1)`. Disabled under `prefers-reduced-motion`.
- **Quadrant 4 — metadata strip (`.cs-hero-meta`):** a 3-column sub-grid (also 2px brown gaps), each `.cs-hero-metaitem` cream `#F5EED6`, `padding: 30px 32px`. Label `.cs-hero-metalabel` (`GSF 700 13px; letter-spacing .09em; uppercase; #545454`), value `.cs-hero-metavalue` (`GSF 18px; #3D2710`). Fields: **Year / Status / Role** (Company moved up to the kicker).
- **Responsive ≤880px:** collapses to one column, areas stacked `title → media → body → meta`, radius 28px, title 34px, lede 20px, media min-height 300px, meta → 2 columns.
- **Reusable component:** in the prototype this is `CaseHero({ company, title, lede, image, imageAlt, meta, compare })` in `cases.jsx`, shared by both cases. Model it as one component in the target codebase.

#### Case A — Optimizing the omnichannel sales funnel (primary)
- OnePage: company **Boticário Group**, title **“Opnichannel optimization”**, meta Year **2026** / Status **In production** / Role **Senior Product Designer (Lead)**, image `assets/work-2.png`. Before/After table: Conversion (Baseline→Boosted), Checkout drop-off (High→Reduced), Average ticket (—→Maintained), Brand perception (Complaints→Improved).
- Lede: “I enabled Click & Collect customers to identify when a product is not available at the closest store: a simple visual solution, but one that addresses a complex logistics problem.”
- Sections: *Context and problem* (User Frustration / Business Impact / Data Evidence), *Strategy & Solution* (The Toggle Filter / Situational Clarity / Positive Communication). Image pair: `assets/work-3.png`, `assets/work-4.png`.
- **Results table (outcome variant):** Friction Reduction, Conversion Boost, Revenue Protection, Brand Perception (icon + area title + description per row).

#### Case B — A gift for the business (secondary)
- OnePage: company **Boticário Group**, title **“A gift for the business”**, meta Year **2024** / Status **In production** / Role **Senior Product Designer**, image `assets/gift-flow.png`. Before/After table uses real numbers: Revenue (Baseline→**+81%**), Wrapped orders (—→**87,000**), Order share (—→**25%**), Complaints (**50**→**~0**).
- Sections: *The Initial Solution*, *Leading the Transformation*, pull quote, *Building the Solution*. Mid image `assets/gift-2.png`; pair `assets/gift-mock-1.png`, `assets/gift-mock-2.png`.
- **Results table (metric variant):** +81% revenue captured · 87,000 wrapped orders · 25% share of orders · ~0 complaints (was 50).

### 6. Results component (`ImpactResults`, end of every case)
A standardized dark panel holding a ruled table — **one component, two modes**, shared by both cases (`ImpactResults({ title, items })` in `cases.jsx`).
- **Panel (`.cs-results`):** contained to the same **970px** column (`.cs-results-wrap{max-width:970px; margin:56px auto 0; padding:0 24px}`), background brown `#3D2710`, `color:#F5EED6; border-radius:40px; padding:64px`. Optional title `.cs-results-title` (`Boldonse 400`, H2 size, cream).
- **Table (`.ir-table`):** `width:100%; border-collapse:collapse`. Rows separated by `1px solid rgba(245,238,214,.16)` **between items only** — there is **no divider before the first row or after the last** (`.ir-table tr:first-child td{border-top:none}`, and no bottom border on the last). `td` padding `26px 0`.
- **Outcome mode (`.is-outcome`, omnichannel):** 3 cells/row — amber **flat icon** (`.ir-c-ico`, 30px), bold area title (`.ir-c-area`, `GSF 700 20px; #F5EED6`), description (`.ir-c-out`, `GSF 18px; #F5EED6; opacity .84`). Cells are **top-aligned** (`vertical-align: top`) and the icon is vertically centered to the title line (`.ir-ico{height:26px; align-items:center}`) so the amber glyph sits level with its title.
- **Metric mode (gift):** 2 cells/row — big amber value (`.ir-c-num`, `Boldonse 400 46px; #D48824`) + label (`.ir-c-lab`, `GSF 700 20px; #F5EED6`).
- **Icons (flat/filled, amber):** funnel, trendUp (bars), shieldFlat, heart, giftBox, pie — inlined SVG in `components.jsx`. Brand ships no icons; these are a documented substitution.
- **Responsive ≤680px:** panel padding shrinks; outcome rows stack icon/title/description vertically.

### 7. About page (`#/about`)
- **Header:** amber kicker “About” (`GSF 700 14px; letter-spacing .12em; uppercase; #D48824`) + H1 (`.cs-h1`, Boldonse, brown).
- **Intro (`.about-intro`):** 2-column grid — a rounded portrait (`assets/work-1.jpg`, `aspect-ratio 4/5; border-radius 30px`) beside an intro column with a lede and a 2-col `.about-meta` (Based in / Role / Focus) over a hairline top border.
- **Sections:** reuses the case `Section` component (“How I work”, “What I focus on”) with the bold lead-in bullet pattern.
- **CTAs (`.about-cta`):** amber pill “Connect on LinkedIn ↗” + two ghost pills (“Download resumé ⬇”, “See the work →”). Ghost = transparent with `inset 0 0 0 1.5px rgba(61,39,16,.3)`.
- **Responsive ≤680px:** intro + meta stack; portrait `aspect-ratio 4/3; max-width 74%`.
- Component: `About({ onWork, onResume })` in `cases.jsx`.

---

## Interactions & Behavior
- **Routing:** hash router. `#/` = home; `#/case/omnichannel` and `#/case/gift` = case pages. On `hashchange`, re-render and `window.scrollTo(0,0)`. Unknown hashes fall back to home. In a real app use the framework router (Next.js routes `/`, `/work/[slug]`, etc.).
- **Samples hover:** grayscale→color (`.55s`), media zoom to 1.06 (`.9s`), tile tilt ±1.6° + amber glow (`.5s cubic-bezier(.2,.7,.2,1)`), alternating tilt direction per tile, link badge fade-up (`.3s`). All motion gated by `prefers-reduced-motion`.
- **Video samples:** play on mouseenter (reset `currentTime=0`), pause on mouseleave; muted + loop + playsInline; image poster fallback.
- **Case cards:** lift `translateY(-4px)` + glow on hover; CTA brightens.
- **Buttons/CTAs:** hover `filter: brightness(1.06–1.08)`; press `transform: scale(0.97)`.
- **Nav (mobile):** hamburger toggles the sheet; any link click closes it.
- **Keyboard/a11y:** linkable samples are focusable and activate on Enter/Space; nav `aria-expanded`; images have alt text; decorative images use empty alt.

## State Management
Minimal. In the prototype a single `App` holds `route` (`{name:'home'}` or `{name:'case', id}`), derived from `window.location.hash`, updated via a `hashchange` listener; `Navbar` holds local `open` boolean for the mobile sheet; each video sample holds a `ref` to its `<video>`. No data fetching — content is static. In a real app, model cases as data (array of `{id, title, kicker, cover, meta, lede, sections, results}`) and render the case template from it.

## Design Tokens
All shipped as CSS custom properties in **`assets/colors_and_type.css`** (the canonical source). Key values:

> **Design-system primitives & components.** The live Rieli Design System ships, alongside these tokens, a set of ready-made CSS primitive classes — `.ds-cta` (amber pill button), `.ds-glass` (the navbar glassmorphism), `.ds-tag` (dark pill tag), and `.ds-h1/.ds-h2/.ds-h3/.ds-body/.ds-label/.ds-caption` (type) — plus a compiled React component bundle (`Navbar`, `Hero`, `ProjectCard`/`WorkGrid`, `Footer`, `CaseStudy` and case primitives `MetaItem`/`Section`/`PullQuote`/`ResultsGrid`). This portfolio composes against the **tokens and `.ds-*` primitives**; its Section 1 samples mosaic, the mobile **hamburger** nav, and the **omnichannel** case page are bespoke extensions the stock component set doesn't cover, so they're hand-built on the same tokens. When implementing in a real codebase, prefer the design system's own components/primitives where they map, and keep the bespoke pieces token-driven.

**Colors**
- Brown (text/headings/logo): `#3D2710`
- Amber (hero bg, CTAs, accents): `#D48824`
- Cream (page bg, text-on-dark): `#F5EED6`
- Cream-light (secondary surface): `#FAF9F5`
- Gray-light (disabled): `#F7F7F7`
- Gray-medium (secondary text): `#545454`
- Near-black (utility): `#141413`
- Amber-glow (shadows): `#D97757`
- Dark scrim/badge: `rgba(34,34,34,0.80)`
- Glass fill `rgba(255,255,255,0.20)`; glass border `rgba(255,255,255,0.24)`; hover fills `0.40`/`0.48`
- Divider: `0.5px solid rgba(31,30,29,0.40)`

**Type**
- Display (short headings only): **Boldonse** — single weight **400**, wide & heavy, near-zero tracking. Never 900, never body copy.
- Headings/nav/CTA/labels + lede/quote + body + UI: **Google Sans Flex** (variable; body 400, bold 700).
- Token scale (`colors_and_type.css`): H1 46px, H2 33px, H3 22px, body 18px, label/caption 12px. As used here: case H1 44px, work title / section H2 31–33px, card title 29px, result number 52px. Tight line-heights (~1.04–1.12) and near-zero/slightly-negative tracking on display.

**Spacing** (4px base): 4, 8, 10, 16, 20, 24, 28, 32, 40, 50, 72, 80.

**Radii:** sm 8 · md 12 · lg 15 · xl 30 · 2xl/pill 50 · 3xl 64 · circle 50%.

**Shadows:** sm `0 1px 2px rgba(0,0,0,0.25)`; md layered with 1px white ring; glow-card `0 40px 80px rgba(217,119,87,.24), 0 4px 14px rgba(217,119,87,.24)`; glow-inset (amber, see CSS).

**Effects:** glass blur `blur(30px)`. **Layout:** content max-width 970px; nav 583×72 (spec 86).

## Assets
All in `assets/` (real imagery from the design system; Boticário client work skews green/teal — that is client brand, not Rieli's amber brand):
- `work-1.jpg` — Rieli portrait.
- `work-2.png` — 3 teal phones, Click & Collect store availability (omnichannel hero + sample + work card cover).
- `work-3.png` — isometric exploration board of pickup states.
- `work-4.png` — seasonal gift box PDP (dark).
- `gift-hero.png`, `gift-flow.png` — gifting lifestyle photos.
- `gift-2.png` — legacy gifting checkout flow (4 screens).
- `gift-mock-1.png` (green), `gift-mock-2.png` (wine) — redesigned packaging picker.
- `colors_and_type.css` — the design tokens + semantic type/primitive classes (canonical).
- **Icons:** thin rounded-stroke, Lucide-style, hand-inlined as SVG in `components.jsx` (`Icon` component): menu, close, download, arrowRight, arrowLeft, arrowUpRight, play, dollar, megaphone, bag, shield. The brand ships **no** icon set — this is a documented Lucide substitution; in your codebase use `lucide-react` (or equivalent) with ~1.8–2.2px stroke.

## Files
Design source (in this bundle):
- `Portfolio.html` — entry shell + hash router (`#/`, `#/about`, `#/case/*`) + React mount; loads React + Babel from CDN, then `components.jsx`, `cases.jsx`, `scroll-fx.js`.
- `components.jsx` — `Icon` (inline SVGs incl. flat result glyphs), `Navbar` (+hamburger, About link, outlined pills), `Samples`/`SampleCell` (mosaic), `WorkGrid`/`CaseCard`, `Footer`; plus the `SAMPLES` and `CASES` data arrays.
- `cases.jsx` — `CaseHero` (the **OnePage** bento), `MetaItem`, `Section`, `ResultsGrid`, `ImpactResults` (results table), `CaseShell`, `CaseOmnichannel`, `CaseGift`, and `About`.
- `styles.css` — all layout/component styles (mosaic, hover/tilt, cards, OnePage bento `.cs-hero*`, results table `.ir-*`, About, responsive). **Canonical source for exact px/weights.**
- `scroll-fx.js` — dependency-free reveal-on-scroll + image parallax engine.
- `assets/colors_and_type.css` (+ `fonts.css`, `fonts/`) — design tokens (CSS custom properties) + semantic classes + the real webfonts.
- `assets/*` — imagery listed above.

To preview the reference: open `Portfolio.html` in a browser (it loads React + Babel from a CDN).
