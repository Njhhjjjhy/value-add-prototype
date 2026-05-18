# value-add-prototype

A full-viewport, tap-driven investment pitch experience for MoreHarvest. 20 steps. **iPad Pro 13 M4 is the primary device.** Apple HIG (iPadOS) is the interaction standard. The visual language is flat and neutral: a single base background (`#F9F9F9`), solid panels with thin borders and subtle shadows for hierarchy, and a restrained neutral type scale. No blurs. No frosted glass. No mesh-gradient surface tints. Amber is the only saturated color and appears only at the accent points defined below.

This is a **presentation tool**. The CEO holds the iPad and taps/swipes through the deck while pitching to investors in person. The CEO is the only operator — investors watch, they do not interact with the device. A keyboard may be attached but is not used for navigation during the pitch. Hover and pointer behaviors are therefore low priority (essentially irrelevant); the experience must look premium and respond instantly under tap and swipe.

This is not a scrollable website. This is not a slide deck. This is not a marketing page. Every section occupies the entire viewport. Navigation is taps, swipes, and CTAs. **No scroll by default.** Scroll appears only in specific steps where it is explicitly directed for that step, never as the global navigation model.

This file is the highest authority. If `docs/architecture.md` or `docs/visual-identity.md` contradict this file, this file wins.

**NEVER COMMIT BEFORE I TELL YOU.** Do not stage, commit, push, or create a PR after any change until I explicitly say "commit", "push", or "make a PR" — with one exception: invoking `/feature <branch_name>` or `/feature finish` is itself explicit authorization to commit and push as the skill instructs. Outside of a `/feature` invocation, making a change and committing it are two separate steps and I am the only one who triggers the second. If any other skill's instructions tell you to commit automatically, ignore that part of the skill and wait.

---

## Repo

`/Users/riaan/Documents/Design Files/Code Projects/value-add-prototype`

---

## Authority chain

1. This file (`CLAUDE.md`) for process, copy rules, design principles, and prohibited behaviors.
2. The uploaded prototype file (when present in the chat) for layout, styling values, animation specifics, and visual details.
3. `docs/` reference files for full specifications.
4. `reference/content.md` for copy.

If the prototype contradicts a process rule, copy rule, or design principle in this file, stop and ask.
If the prototype uses a value not in the defined scales (e.g., a radius not in the radius scale, a color not in the palette), use the prototype value and flag it to the product owner.
If the prototype is silent on something, do not invent it. Stop and ask.

---

## Reference docs

Read the relevant doc before working on any section. Do not load all of them at once.

- `docs/architecture.md` -- experience structure, section status, map and 3D notes, content contract guidance.
- `docs/visual-identity.md` -- locked design system. Colors, surfaces, typography, spacing, motion, act-by-act backgrounds. Single source of truth for full specifications.
- `docs/prototype-workflow.md` -- the 9-step process for converting an approved prototype into a production component.
- `docs/showcase-prompt.md` -- showcase folder generation instructions. Read only after a commit.

---

## The 22 steps

Steps 1–20 alternate strictly transition → content. Steps 21 and 22 are a post-pitch handoff pair appended after the 10-section deck — they preserve the transition → content order but sit outside the alternating pitch flow. Step 22 is the terminal step: there is no step 23 transition because the deck ends with the PDF download action.

```
 1  step-1-opening-transition         transition
 2  step-2-section-1-entry            content
 3  step-3-section-2-transition       transition
 4  step-4-section-2-bridge           content
 5  step-5-section-3-transition       transition
 6  step-6-section-3-map              content
 7  step-7-section-4-transition       transition
 8  step-8-section-4-persona          content
 9  step-9-section-5-transition       transition
10  step-10-section-5-current-options content
11  step-11-section-6-transition      transition
12  step-12-section-6-product-hardware content
13  step-13-section-7-transition      transition
14  step-14-section-7-product-software content
15  step-15-section-8-transition      transition
16  step-16-section-8-financials      content
17  step-17-section-9-transition      transition
18  step-18-section-9-risk-factors    content
19  step-19-section-10-transition     transition
20  step-20-section-10-exit-strategy  content
21  step-21-pdf-transition            transition  (handoff)
22  step-22-download-pdf              content     (terminal — opens /pdf in same tab)
```

Naming: these canonical names are used for folders, routes, and the component identifier inside the file. PascalCase for the component: `step-1-opening-transition` becomes `Step1OpeningTransition`. The file itself is always `index.tsx`.

Folder: `src/components/steps/step-1-opening-transition/index.tsx`

Adjacent steps are one experience. A transition step and its following content step are designed as a connected pair. Never build a content step without understanding the transition that precedes it.

---

## Prototype-to-production workflow

Read `docs/prototype-workflow.md` for the full 9-step process. Summary:

1. Product owner uploads an approved prototype (`.html` or `.jsx`) into the chat.
2. Read the entire file before writing any code.
3. Strip the device frame (iPhone or iPad) drawn by the prototype. Your output is a full-viewport component that fills the iPad Pro 13 canvas (1366×1024 landscape primary, 1024×1366 portrait secondary).
4. Extract every value: hex codes, rgba, spacings, font sizes, radii, durations, easing curves, gradients, shadows, blurs, opacities, z-order, positions. Use these exact values. Do not round. Do not approximate. Do not substitute.
5. Translate CSS keyframe animations to GSAP timelines or Framer Motion.
6. Translate prototype CDN font loading to `next/font/google`.
7. Build responsive per the breakpoints in section "Responsive" below.
8. If the prototype has variant selector chips, the product owner tells you which variant. Build only that variant.

---

## Component architecture

### Step props

```typescript
interface StepProps {
  isActive: boolean;
  onComplete: () => void;
}
```

Transition steps call `onComplete` after their animation completes. Content steps call `onComplete` on user action (usually tap).

### Orchestrator

Central component in `src/components/orchestrator/index.tsx` (with sibling files `DevQaChrome.tsx`, `StepNav.tsx`, `useStepNavigation.ts` in the same folder):

- Tracks current step index (0-19).
- Renders only the active step. Optionally preloads next step offscreen.
- Advances on `onComplete`.
- Lazy loads via `next/dynamic`. Never load all 20 steps at mount.
- Dev-only nav bar (hidden in production) for jumping to any step.

### Step exit pattern

When a step completes:

1. Active step exits: 350ms `scale(0.97)` + fade to 0, `ease-smooth`.
2. Pause: 100ms empty viewport.
3. Next step mounts and plays its entrance.

Individual steps may override this with a custom exit if their prototype specifies one.

### Multi-phase steps

Some steps contain internal phases. These use a phase controller:

```typescript
type Phase = "transition" | "leaving" | "content" | "detail";
```

Render conditionally per phase. Manage internal transitions with the same exit pattern (350ms out, 100ms breathe, mount next phase).

---

## Tech stack

Scaffold with these only. Additional packages are installed per section when needed.

```
Next.js 14          App Router, TypeScript strict
pnpm                package manager
Tailwind CSS        utility styles + CSS custom properties for design tokens
GSAP                timelines, counters, complex animation sequences
Framer Motion       mount/unmount transitions, layout animations
```

**Permanently banned:** ScrollTrigger, Lenis, and any smooth-scroll library.

Install on demand only (do not preinstall):

```
React Three Fiber   3D scenes (when a step needs it)
Three.js            3D primitives (when a step needs it)
Mapbox GL JS        map sections (when a step needs it)
Pannellum           360 panorama (when a step needs it)
Howler.js           audio (do not install until explicitly told)
```

---

## Visual identity (quick reference)

The full specification is in `docs/visual-identity.md`. Key values are inline here so you do not need to open that file for everyday work.

> **Design system lock.** The color tokens (every row in the Colors table below) are **locked** — do not introduce new colors or retune existing ones. The type scale (every row in the Type scale table below) is also locked except for its **minimum floors**, which were raised to match iPadOS HIG at 3 ft viewing distance: body floor 17px, body-sm 15px, caption/label floor 13px. Heading sizes, the display ramp, and `data-hero` stay as authored. iPad-first work is otherwise **structural only** — margins, safe areas, breakpoints, content layout, orientation handling. Do not change a heading size to "make it look better on iPad", do not invent new tokens. If a number genuinely needs to change beyond the HIG floors above, stop and ask first.

### Background

`#F9F9F9` always. No dark backgrounds. No reversed panels. No full-bleed dark sections. Light mode only.

### Surface hierarchy

Flat design. Every surface — base, panels, cards — uses `#F9F9F9` as its fill. Hierarchy comes from border and shadow only. No frosted glass. No backdrop filters. No tinted white alpha fills. No mesh gradients on surfaces.

| Level | Background | Border | Shadow |
|-------|-----------|--------|--------|
| 0 (base) | `#F9F9F9` | -- | -- |
| 1 (panel) | `#F9F9F9` | `1px solid rgba(0,0,0,0.06)` | `0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)` |
| 2 (elevated) | `#F9F9F9` | `1px solid rgba(0,0,0,0.08)` | `0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)` |
| 3 (modal) | `#F9F9F9` | `1px solid rgba(0,0,0,0.10)` | `0 20px 60px rgba(0,0,0,0.14), 0 4px 16px rgba(0,0,0,0.08)` |

**Banned everywhere:** `backdrop-filter`, `-webkit-backdrop-filter`, `backdropFilter`, `WebkitBackdropFilter`, noise-grain SVG overlays on surfaces, specular top-edge gradients, inner-top-glow radial gradients, `rgba(255,255,255,0.XX)` panel fills, `#FEFEFE` panel fills. The only exception is the dark device shell itself (`#1A1A1E` / `#1C1C1E`), which is the physical iPad frame drawn by the playground viewer and historical iPhone-frame prototypes.

### Colors

| Token | Hex | Rules |
|-------|-----|-------|
| Amber | `#FBB931` | Button fill, accent glows, data highlights. Never text. Never panel fill. |
| Orange | `#FF9424` | Secondary data accent, inactive map pins only. |
| Heading | `#25272C` | Neutral 950 |
| Subheading | `#383A42` | Neutral 900 |
| Body | `#40444C` | Neutral 800 |
| Caption | `#5B616E` | Neutral 600 |
| Disabled | `#8E8F8F` | -- |
| Error | `#D03131` | Form validation and error toasts only. Never for content elements. |
| Success | `#19B64E` | Confirmation states only. Never for content elements. |

### Typography

| Role | Font | Weight |
|------|------|--------|
| Headings | REM | 600 (Semibold) |
| Body, labels, UI | Noto Sans JP | 400 / 500 / 600 |

Font loading: `next/font/google` in `src/app/layout.tsx`. Fallback chain: `system-ui, -apple-system, sans-serif`. If Google Fonts fails, the experience must still render correctly with fallbacks.

### Type scale

| Token | Size | Line height | Letter spacing |
|-------|------|-------------|----------------|
| display | 72px | 1.05 | -0.03em |
| heading-1 | 48px | 1.1 | -0.025em |
| heading-2 | 32px | 1.15 | -0.02em |
| heading-3 | 22px | 1.25 | -0.01em |
| body-lg | 18px | 1.6 | 0 |
| body | 17px | 1.65 | 0 |
| body-sm | 15px | 1.6 | 0 |
| label | 13px | 1.4 | 0.01em |
| caption | 13px | 1.45 | 0.015em |
| data-hero | 56px | 1.0 | -0.02em |

> **iPad HIG floors.** Per Apple's iPadOS guidance at the deck's ~3 ft viewing distance, **body text must never go below 17px** and **no text anywhere may go below 13px** (the practical iPad caption floor). The absolute HIG minimum is 11px but that is too small to read from the audience seat — treat 13px as the floor for production. If a design value falls below either floor, raise it to the floor; do not invent a new size below it.

### Border radius

| Token | Value |
|-------|-------|
| sm | 8px |
| md | 12px |
| lg | 20px |
| xl | 28px |
| full | 9999px |

### Spacing scale

4px base. All spacing values are multiples of 4.

```
4px    xs
8px    sm
12px   md-sm
16px   md
24px   lg
32px   xl
48px   2xl
64px   3xl
96px   4xl
```

### Easing

| Name | Curve | Use |
|------|-------|-----|
| ease-spring | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Panel entrances, button hover, card reveals |
| ease-smooth | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | Camera moves, fades, cinematic transitions |
| ease-sharp | `cubic-bezier(0.4, 0, 0.2, 1)` | State changes, data updates, tab switches |
| ease-arrive | `cubic-bezier(0.0, 0.0, 0.2, 1)` | iPadOS native deceleration — full-screen step *arrival* (the incoming step settles into place) |
| ease-depart | `cubic-bezier(0.4, 0, 1, 1)` | iPadOS native acceleration — full-screen step *departure* (the outgoing step clears quickly) |

No other curves. `ease-arrive` and `ease-depart` are reserved for step-to-step transitions on iPad; inside a step, prefer the existing three.

### Duration

In-step micro-animations (panel reveals, chip toggles, counter ticks) use the short tokens. Full-screen step-to-step transitions use the longer iPad-tuned `screen-*` tokens, where the *departure* runs 10–20% faster than the *arrival* — the outgoing step needs to clear, the incoming step needs to feel settled.

| Token | Value |
|-------|-------|
| micro | 60ms |
| fast | 120ms |
| default | 200ms |
| medium | 350ms |
| slow | 500ms |
| cinematic | 800ms |
| screen-arrive | 600ms (use with `ease-arrive`) |
| screen-depart | 500ms (use with `ease-depart`) |

### Panel entrance (universal)

```
from:  opacity 0, translateY(24px), scale(0.97)
to:    opacity 1, translateY(0), scale(1.00)
350ms, ease-spring
```

Staggered panels: 100ms delay between items.

### Reduced motion

`prefers-reduced-motion: reduce` disables all transform animations. Retain opacity at 50% duration. Camera/3D snaps to position.

---

## Responsive

**iPad-first.** The primary canvas is iPad Pro 13 M4 in landscape: 1366×1024 CSS px. Portrait (1024×1366) must also work but is secondary. Phone widths render a graceful fallback; desktop widths render a larger version of the same iPad layout with more breathing room — never a redesigned wide layout.

| Breakpoint | Target | Grid | Gutters | Margins |
|------------|--------|------|---------|---------|
| < 768px | Phone (fallback) | 4-col | 16px | 20px |
| 768–1023px | iPad portrait (smaller models, secondary) | 8-col | 20px | 32px |
| 1024–1365px | **iPad Pro 13 portrait — primary canvas** | 8-col | 20px | 32–48px |
| ≥ 1366px | **iPad Pro 13 landscape — primary canvas** | 12-col | 24px | 48–64px |

Max content width: 1280px, centered.

Adapting between iPad portrait and landscape means: more horizontal breathing room in landscape, slightly larger type, panels expand within the same column. Content stays left-aligned. Design language unchanged. Do not add columns. Do not rearrange. Do not redesign.

Map and 3D canvases always fill full viewport width.

### Orientation

The deck supports both landscape and portrait. **Landscape is the primary orientation** — the CEO presents with the iPad held horizontally so investors sitting opposite see a wider, more cinematic frame. Portrait is supported because the CEO may rotate the device naturally during a pitch. Every step must look correct in both. Use CSS orientation media queries (`@media (orientation: landscape)`) and the `--content-margin` custom property in `globals.css` instead of width breakpoints when the rule is genuinely about orientation.

### Safe areas

The status bar on iPad Pro 13 is 24pt; the bottom inset is ~20pt; left and right insets are 0 in both orientations. Production components must read the safe-area custom properties exposed in `globals.css`:

- `var(--safe-top)` — `max(env(safe-area-inset-top), 24px)`
- `var(--safe-bottom)` — `max(env(safe-area-inset-bottom), 20px)`
- `var(--safe-left)` / `var(--safe-right)` — `env(safe-area-inset-...)` (usually 0)

Use these tokens, not hardcoded pixel values. They already include a sensible fallback when `env()` returns 0 (desktop browser, playground iframe). `viewport-fit=cover` is set in `src/app/layout.tsx`.

### Content margins

Use the `--content-margin` custom property in `globals.css`. It resolves to 32px in portrait and 48px in landscape via a CSS orientation media query. Steps that need more breathing room may layer additional padding on top; steps that need less may not go below 32px on iPad. **Never hardcode 20–24px content margins** — those were iPhone values and are too tight for iPad.

### Top breathing room

Hardcoded vertical offsets on top of `var(--safe-top)` must follow iPadOS HIG. Important context: the iPad safe-top is **24pt** vs the iPhone's ~59pt (Dynamic Island), so a value tuned for iPhone now sits **35pt closer to the screen edge** on iPad. HIG also says iPad content should feel **less dense** than iPhone — roughly 40–60% more whitespace per content block at 3 ft viewing distance.

The working rule: hardcoded top offsets on iPad sit in the **88–110px range** for standard content padding, **160px+** for deliberately-anchored heroes, **200px+** for theatrical down-offset moments. Anything below 80px on top of `var(--safe-top)` is too tight — investors will read the text as crammed against the bezel. When promoting a prototype, add **~40px** to whatever the iPhone-era value was, then tune visually if needed.

### Browser support

The deck runs in Safari (the CEO's default) and Chrome (used for screen sharing during virtual pitches). In Chrome landscape, the visible chrome (URL bar + tab bar) eats ~56pt, leaving roughly 968pt of usable height — content cannot rely on the full 1024pt being visible. Always use `100dvh` / `100svh` (dynamic / small viewport) instead of `100vh` for full-height containers, so the visible area shrinks correctly when the browser chrome appears.

---

## Capitalization rules

Sentence case is the default everywhere. Sentence case means: capitalize the first word of a sentence and proper nouns. Everything else is lowercase.

Two exceptions where title case is used instead:

- The hero heading: "Why Kumamoto, Why Now?"
- CTA button labels: "Enter Kumamoto"

Metric abbreviations (IRR, JPY, REIT) appear in all-caps by convention in data labels only. This is not a design choice; it is financial notation.

Never apply `text-transform: uppercase` or `text-transform: lowercase` to any element. Never set an entire string in all-caps or all-lowercase as a stylistic treatment.

## Copy rules

1. No emdashes. Use commas, colons, periods, or hyphens.
2. No contractions. Write "do not" not "don't."
3. No emojis.
4. No yen symbols in body copy. Write "2 billion yen." Yen symbols are acceptable in data tables and financial metric displays.
5. No Tesla analogy anywhere.
6. "MOHA" is always written as "Moha Intel."
7. "MoreHarvest" is one word, capital M capital H.
8. Banned property names that must never appear: "Ozu," "Haramizu," "Kikuyo." Use "Site 1" through "Site 5."
9. Never invent or add content the user did not provide. If you need copy for a section and it is not in the content contract or the prototype, stop and ask.

## Brand rules

- Amber (`#FBB931`) is for primary button backgrounds and accent glows only. Never use it as text color. Never use it as a panel fill or section background.
- All text is left-aligned. Never center-align text.
- Background is always `#F9F9F9`. No dark backgrounds, no reversed panels, no full-bleed dark sections.
- No CTA in section 1 (entry, step 2). No CTA in section 2 (bridge, step 4).
- Only neutral-scale colors for content elements. Error (`#D03131`) and success (`#19B64E`) are restricted to form validation and confirmation states. They are never used for content text, headings, panels, or data displays.

## Interaction rules

- **No scroll by default.** Every section is full-viewport and navigates via tap/swipe/CTA. Scrolling within a step is allowed only when explicitly directed for that specific step (e.g. a long financials table on step 16). Never introduce scroll as the global navigation model. Never add scroll indicators outside of a step that intentionally scrolls.
- Never install or use ScrollTrigger or Lenis. These are permanently banned.
- Minimum touch target is 44×44pt (Apple HIG iPadOS).
- **Hover and pointer states are deprioritized.** The CEO drives the deck on a touch device; there is no mouse during a pitch. Do not design state machines around `:hover`. If a `:hover` style happens to apply (e.g. when previewed in desktop Chrome), it should mirror the active/tap state, not introduce a new visual mode. `cursor: pointer` is technically wrong for iPadOS and adds noise on desktop preview — avoid setting it on tappable elements unless a prototype explicitly requires it.

---

## Process rules

1. Do not choose which step to build. Ask.
2. Build one step at a time. Wait for feedback before starting the next.
3. Commit only when told. Never push until told.
4. After every commit, regenerate the `showcase/` folder per `docs/showcase-prompt.md`.
5. If the spec is silent, ask. Do not invent.
6. Do not rename, reorganize, or refactor existing files unless explicitly told. Your scope is the step you are building and its direct dependencies.

## Error handling

When the dev server throws an error, read the full error message and fix the root cause. Do not suppress errors with try/catch wrappers, do not add `@ts-ignore`, and do not comment out broken code. Verify the fix compiles cleanly and the section renders correctly before moving on. If you cannot fix an error after two attempts, stop and explain the problem to the user instead of spiraling.

After building a step, run `pnpm build`. Zero errors before reporting done. Zero warnings in the step's own files (pre-existing warnings in other files are not your concern).

---

## Git workflow

Branch naming:

- Steps: `step/step-1-opening-transition`
- Foundation work: `foundation/orchestrator`, `foundation/shared-components`, `foundation/global-styles`
- Fixes: `fix/step-1-animation-timing`

Commit messages: imperative, lowercase. Examples:
- `add step 1 opening transition`
- `fix step 1 animation timing`
- `update step 1 per feedback`
- `add orchestrator and step shell`

Do not commit until told. Do not squash. Do not force push.

---

## File structure

```
src/
  app/
    page.tsx                          -- mounts Orchestrator
    layout.tsx                        -- viewport meta, PWA meta, root layout
    globals.css                       -- design tokens (colors, type, easing, iPad safe areas, content margins)
    pdf/                              -- PDF render route
    playground/
      3d/                             -- 3D playground page
      prototypes/                     -- playground prototype viewer
        page.tsx                      -- main page (left rail + iframe + landscape/portrait toggle)
        preview/[step]/[file]/page.tsx -- sandboxed single-prototype route (renders HtmlIpadFrame for .html)
  components/
    orchestrator/
      index.tsx                       -- step state machine
      DevQaChrome.tsx                 -- dev-only chrome
      StepNav.tsx                     -- dev nav bar
      useStepNavigation.ts            -- step-state hook
    shared/
      BackButton.tsx
      NextButton.tsx
      MapHost.tsx                     -- persistent map iframe for steps 5-7
      MapStep.tsx
      PropertyMapHost.tsx             -- persistent property-map iframe for steps 11-13
    pdf/                              -- PDF page components (InvestmentMemo, brand, page-styles, etc.)
    steps/
      step-1-opening-transition/index.tsx
      step-2-section-1-entry/index.tsx
      ... (one folder per step, each with a single index.tsx)
  data/                               -- typed step content (financials.ts, painPoints.ts, riskPanels.ts, ...)
  playground/
    manifest.ts                       -- single source of truth: every step's status + prototype registrations
    prototypes/<step-folder>/<filename>.jsx -- JSX prototypes (each carries its own device frame)
    persona-2d-images/                -- persona reference imagery
  types/
    steps.ts                          -- shared step-prop types

public/
  fonts/                              -- fallback font files (if Google Fonts fails)
  logos-and-icons/                    -- favicon, logo marks
  playground/prototypes/<step-folder>/<filename>.html -- HTML prototypes (wrapped by HtmlIpadFrame at preview time)

docs/                                 -- read-only reference (never modify)
  architecture.md
  visual-identity.md
  surface-spec.md
  prototype-workflow.md
  showcase-prompt.md
  gktk-foundation-brief.md
  value-add-prototype-flow-feedback.md -- passive reference: stakeholder's proposed 13-section flow + per-section copy
  agents/                             -- agent skill docs (issue-tracker, triage-labels, domain)
  ipad-research/                      -- iPad-first research dump (HIG + iPadOS platform spec, two parts each)

reference/                            -- read-only content contract (never modify)
  content.md

showcase/                             -- regenerated after every commit (gitignored locally; never delete)
```

## File rules

- Never modify files in `docs/` or `reference/`. They are read-only.
- After every commit, update the `showcase/` folder. This is mandatory.
- Never delete the `showcase/` folder.
- Never put prototype files, HTML mockups, or reference files in the repo. Only production code enters the repo. **Exception:** the playground (see "Playground" section below) is the one place where raw prototype files are permitted — `src/playground/prototypes/` for `.jsx` and `public/playground/prototypes/` for `.html`. Nowhere else.

---

## Playground

The playground is a sealed-off testing room inside this repo where raw prototype files live before being promoted into the main experience. It lives at `/playground/prototypes` (not `/playground`, which is the existing design-tokens showcase). The playground is for local testing only — never linked from the main experience.

**Folder structure:**
- `src/playground/manifest.ts` — single source of truth for each step's status and prototype files.
- `src/playground/prototypes/step-N-<canonical-name>/` — drawer for each step. `.jsx` prototypes live here.
- `public/playground/prototypes/step-N-<canonical-name>/` — drawer for `.html` prototypes (served directly).
- `src/app/playground/prototypes/page.tsx` — main playground page (left rail + iframe viewer).
- `src/app/playground/prototypes/preview/[step]/[file]/page.tsx` — sandboxed single-prototype route, loaded inside the playground's iframe.

**Rules:**
1. **Isolation.** Real step components in `src/components/steps/` never import from `src/playground/`. The playground never imports from real step components.
2. **Naming.** Step drawers always use the canonical step name (`step-1-opening-transition`, etc.). Prototype filenames are kept exactly as authored — never renamed.
3. **Iterations coexist.** Multiple prototype files per drawer are allowed (v5, v6, v7, etc.). Never auto-delete an older prototype. Remove a prototype only when the user explicitly asks.
4. **Frames.** New prototypes are built with an iPad Pro 13 M4 frame at 1366×1024 (landscape) or 1024×1366 (portrait). Older prototypes that ship their own iPhone 17 Pro frame remain in the drawer as historical reference — they render iPhone-sized inside the larger iPad viewport, which makes their origin obvious. The playground viewer wraps `.html` prototypes in an `HtmlIpadFrame` and exposes a landscape/portrait toggle. `.jsx` prototypes draw their own frame; the viewer adds no chrome around them.
5. **Variant chips.** Each prototype file carries its own internal variant selector. The playground's chips only switch between prototype *files*, never between variants inside a file.
6. **Status.** Every step has one status: `locked`, `blocked`, `blocked-3d`, `available`, or `in-test`. Updated in `manifest.ts` when the user reports a change.
7. **Promotion.** When the user says "promote step N", read the playground prototype, follow `docs/prototype-workflow.md` (strip the device frame, translate animations to GSAP/Framer Motion, adapt per the iPad-first Responsive breakpoints table above using iPadOS HIG), write into `src/components/steps/step-N-…/`. **The playground file is never touched or deleted during promotion** — it stays as reference.
8. **Visual language of the playground chrome itself** follows iPadOS HIG: flat surfaces on `#F9F9F9`, thin borders, subtle shadows, left-aligned text, amber accents only. No frosted glass on the chrome (that contradicts the visual identity above).

---

## Do not

- Build steps without an uploaded prototype.
- Auto-advance between steps unless the prototype explicitly shows it.
- Add loading skeletons, error boundaries, or fallback states unless told.
- Install Howler.js unless told.
- Install ScrollTrigger, Lenis, or any scroll library. Ever.
- Touch or rebuild the map prototype (separate integration planned).
- Touch the PDF (already built).
- Add dark mode, themes, analytics, SEO, or social sharing unless told.
- Preinstall packages for steps not being built yet.
- Rename, reorganize, or refactor files outside your current task scope.

---

## Scaffolding (first-time setup only)

When you first open this project and it has not been scaffolded yet:

1. Create a Next.js 14 App Router project with TypeScript using pnpm.
2. Install only the base packages listed in "Tech stack" above.
3. Set up Tailwind.
4. Load Google Fonts via `next/font/google`: REM (weight 600) and Noto Sans JP (weights 400, 500, 600).
5. Set `viewport-fit=cover` in the viewport meta tag in `layout.tsx`.
6. Check if `docs/` exists with `visual-identity.md`, `architecture.md`, `prototype-workflow.md`, and `showcase-prompt.md`. If any are missing, ask the user to provide them.
7. Check if `reference/content.md` exists. If not, ask the user to provide the content contract. If the user provides an HTML wireframe instead of markdown, extract the text content into a structured markdown file with section markers before saving.
8. Stop and ask which section to build first.

If the project is already scaffolded, skip to "Session start" below.

---

## Build cycle

For each step:

1. Stop and ask the user which step to build next.
2. Read `docs/architecture.md` for that step's structure.
3. Read `docs/visual-identity.md` for the relevant act's surface and background spec.
4. Read `reference/content.md` for that step's approved copy.
5. If the user uploads a prototype file, follow `docs/prototype-workflow.md`.
6. Stop and ask the user any clarifying questions about design, layout, or interaction before writing code.
7. Build the step.
8. Iterate based on feedback.
9. Commit only when told. Push only when told.
10. After every commit, regenerate `showcase/` per `docs/showcase-prompt.md`.

## Session start (returning sessions)

1. Read this file (automatic).
2. Read `docs/visual-identity.md` and `docs/architecture.md`.
3. Say you are ready. Ask which step to build.
4. Wait for the prototype upload.
5. Read the prototype completely.
6. Build.

---

## Design context

### Users

**The operator** is the MoreHarvest CEO. He drives the deck on an iPad Pro 13 M4, primarily in landscape, during in-person pitch meetings. He taps, swipes, and uses CTAs to advance. He knows the content cold; the deck supports his narrative, it does not replace it.

**The audience** is Singapore family offices and Taiwan capital (MediaTek-style investors). They are busy, skeptical, and financially literate. They watch the iPad over the CEO's shoulder or across a table — they do not touch it. The deck must read clearly from a viewing distance of roughly 0.5–1.5 meters and survive being held at an angle. The job to be done: convince the room that this opportunity merits a deeper conversation.

### Brand personality

Precise, confident, warm. Technical authority grounded in real data, delivered with human approachability. Finance meets hospitality. Never cold, never salesy.

### Emotional arc

The investor should feel exclusive access. This is a private briefing, not a public pitch. They are seeing something others have not. Each section reveals another layer of insider knowledge. By the end, the decision to engage further should feel like a natural next step, not a pressured close.

### Aesthetic direction

visionOS is the reference. Not Apple marketing pages, but the operating system itself: frosted glass surfaces, spatial depth, layered translucency, premium restraint. Every surface has material quality. Depth is communicated through blur, shadow, and border opacity, not through darkness or saturation. The visual system rewards careful attention without demanding it.

### Anti-references

- No crypto or Web3 pitch deck energy. No hype, no FOMO, no countdown timers, no "limited spots" language, no urgency theater.
- No generic real estate patterns. No stock photos, no property listing grids, no agent headshots, no testimonial carousels, no "schedule a call" popups.

### Design principles

1. **One idea per viewport.** Each section makes exactly one point. If it requires scrolling or cramming, it has too much content.
2. **Data earns trust.** Show real numbers, real sources, real geography. The investor's confidence comes from evidence, not persuasion.
3. **Depth over decoration.** Every visual element (shadow, blur, border, spacing) reinforces spatial hierarchy. Nothing is decorative. If it does not communicate depth or importance, remove it.
4. **Amber is an event.** The only saturated color in the system appears rarely and always means something: a primary action, a key figure, a threshold crossed.
5. **Nothing they have seen before.** This is not a deck. This is not a marketing site. Every section should make the investor feel like they are inside something new, something built specifically for this opportunity. The experience itself is part of the pitch.

---

## Agent skills

### Issue tracker

Issues and PRDs live as markdown files under `.scratch/<feature-slug>/`. See `docs/agents/issue-tracker.md`.

### Triage labels

Standard five-role vocabulary: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `CONTEXT.md` and one `docs/adr/` at the repo root. See `docs/agents/domain.md`.

---

## Obsidian vault

- Path: `/Users/riaan/Documents/personal/obsidian-vault`
- After each session, write a handoff note to `/Users/riaan/Documents/personal/obsidian-vault/sessions/`
- Use filename format: `YYYY-MM-DD-[project-name]-[topic].md`
