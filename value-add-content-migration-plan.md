# Value-add content migration plan

## How to use this file

This document is the historical record of the multi-branch copy migration. The migration has now completed — all 7 phases are ticked below. The file is kept in the repo (not deleted) as a permanent reference for what was done, why, and where the canonical sources live. New Claude sessions should treat this as background context; day-to-day copy work happens in `value-add-source-of-truth.md` (canonical) and `src/content/` (typed mirror), with the CLAUDE.md "Copy lockdown" rule as the active guardrail.

---

## Goal

Consolidate every piece of copy in the value-add-prototype project into one physical place — `src/content/` — and rewire both the prototype steps and the PDF pages to read from it. Lock the result down so copy cannot drift again. The single source of truth for the copy *content* is [`value-add-source-of-truth.md`](./value-add-source-of-truth.md); `src/content/` is the codified, type-safe mirror that the running app actually reads from.

---

## The 7 phases

- [x] **Phase 1 — Inventory.** Read every step component, PDF page, `src/data/` file, `reference/content.md`, and `value-add-source-of-truth.md`. Record where `src/` diverges from the source of truth.
- [x] **Phase 2 — Design the shape.** Propose folder structure for `src/content/`. Approved structure: one file per step under `src/content/steps/`, plus `types.ts`, `cast.ts`, `citations.ts`, and `index.ts` barrel.
- [x] **Phase 3 — Build the content folder.** Create `src/content/` and populate from `value-add-source-of-truth.md` (NOT from current `src/` values where they differ). This bakes the canonical copy into the codebase ahead of any wiring.
- [x] **Phase 4 — Wire up the PDF.** All 8 PDF pages now read from `src/content/`. Wired in branches `feature/pdf-financials`, `feature/pdf-risk-factors`, and `feature/content-lockdown` (executive-summary, which had been missed earlier, used `step2.pdfReserved.executiveSummary`).
- [x] **Phase 5 — Wire up the prototype.** All 28 step components read from `src/content/`. Wired in branches `feature/step-5-content-source` (steps 1–9, excluding 6 which is the map iframe) and `feature/step-11-content-source` (steps 11–28). The 7 cleanup heals from the source of truth landed alongside the wiring.
- [x] **Phase 6 — Lock it down.** Landed in `feature/content-lockdown`: CLAUDE.md "Copy lockdown" rule under "File rules" (only `src/content/` and `value-add-source-of-truth.md` may hold deck or PDF copy; no inline string literals in step components or PDF pages), CLAUDE.md "Authority chain" and file-tree updated, plus `.github/CODEOWNERS` requiring `@RiaanMOHA` review on `/value-add-source-of-truth.md` and `/src/content/`. CODEOWNERS only blocks merges if branch protection on `main` has "Require review from Code Owners" enabled in the GitHub web UI — flip that switch to activate enforcement.
- [x] **Phase 7 — Clean up.** `src/data/` (9 files) was deleted in `feature/pdf-risk-factors` once orphaned. `reference/content.md` was deleted in `feature/content-lockdown` (superseded by `value-add-source-of-truth.md`). CLAUDE.md file rules updated. This migration plan file is **kept** (not deleted) as the permanent record.

---

## What landed on `main` from the first branch (`feature/content-source`)

1. The full `src/content/` folder: 32 files, 1,364 lines, full TypeScript typecheck passes.
2. The PDF `exit-strategy.tsx` page rewired from `src/data/exitStrategy.ts` to `step24` in `src/content/`. **Visual heal:** "Two paths" + "CapitaLand REIT injection" + "Open market sale" + "Built-in optionality" → canonical "One door. Sell to other buyers with the master lease in place." plus the single Kumamoto-structural-demand paragraph (Step 24, Riaan-verified 2026-05-21).

`src/data/exitStrategy.ts` now has zero consumers. It stays on disk until Phase 7 deletes it.

---

## Follow-up branches, in order

The remaining work is split into small, individually reviewable branches. Each branch is one prompt to Claude after `/feature <branch-name>`.

### `feature/pdf-financials`

Wire `src/components/pdf/pages/financials.tsx` to read from `step20` in `src/content/`. Drop the imports from `src/data/financials.ts` and `src/data/fundTerms.ts`.

**Visual heal:** retired ¥2B / 50-50 debt-equity / bull-normal-bear matrix / Oakwater fund / CapitaLand + SFO + GP equity split → canonical ¥35,000,000 initial capital, ¥45,600,000 sale price, ¥1,884,860 net profit, 5% / 7.5% / 10% IRR, J Estate Co. Ltd. partnership.

This is the most divergent page in the entire PDF. The visual heal is dramatic.

After this branch, `src/data/financials.ts` and `src/data/fundTerms.ts` will be orphaned.

### `feature/pdf-risk-factors`

Wire `src/components/pdf/pages/risk-factors.tsx` to read from `step22` (Beat 5 — 5-risk framework) and `step26` (Hsinchu and Kumamoto parallel timelines + `pdfReserved.mohaIntelLine`). Drop the imports from `src/data/riskPanels.ts` and `src/data/timeline.ts`.

**Visual heal:** the old 6-FAQ block (TSMC slowdown, JPY volatility, construction, GK-TK tax, hotel chains, TK governance) → canonical 5-risk framework (liquidity/exit, demand concentration, infrastructure timing, tenant concentration, renovation/execution). Also: Hsinchu/Kumamoto metrics align with the Step 26 source-of-truth values (+180% / +60% on Hsinchu, +40–80% / 0 existing on Kumamoto, replacing the old +1.7x / +33.3% / ~2x / +120% set).

The PDF should include the longer Moha Intel sentence from `step26.pdfReserved.mohaIntelLine` (which is intentionally not rendered on the prototype).

After this branch, `src/data/riskPanels.ts` and `src/data/timeline.ts` will be orphaned.

### `feature/pdf-rest`

Wire the remaining 6 PDF pages, bundled in one branch because each is a smaller heal:

1. `executive-summary.tsx` ← `step2` + `step4` (PDF copy is `'tbd'` in source of truth; use the prototype track copy as the working version). Drop legacy COVID/¥10T paragraph.
2. `market-context.tsx` ← `step6` (PDF copy is `'tbd'`; use prototype track + the 4-pillar stat tiles). Drop `src/data/mapSteps.ts` import.
3. `target-tenant.tsx` ← `step12` (persona) + `step10` + `step10.pdfReserved` (pain points with expanded copy). Drop `src/data/painPoints.ts` import — the obsolete `PERSONA_HEADING / PERSONA_CONCEPT / PERSONA_MESSAGE` constants must NOT be reused. **Visual heal:** "47,000 engineers need a home" → "Who lives here." / "The semiconductor engineer" persona.
4. `current-options.tsx` ← `step14` (PDF copy is `'tbd'`; use prototype track). Drop `src/data/dealStructure.ts` import. The 42-unit Kusunoki + "Closest competitor" copy is retired.
5. `product-hardware.tsx` ← `step16` (PDF copy is `'tbd'`). Drop `src/data/productSpecs.ts` HARDWARE_SPECS / INVESTMENT_PROPERTIES / VIRTUAL_TOUR_ROOMS imports. The deck features one property called Ozu-1; the old Site 1–5 / Hanke HEPA / Delta EV / 100 units / 1,000 tsubo content is retired.
6. `product-software.tsx` ← `step18` (PDF copy is `'tbd'`; use prototype track — both the 3-tier deck strip Landing/Family/Wellness and the 9-notification phone demo). Drop `src/data/productSpecs.ts` SERVICE_TIERS / PHONE_FRAMES imports. The retired 4-tier Essential/Family/Lifestyle/Beyond model + vaccination scenario is dropped.

After this branch, all `src/data/*.ts` files are orphaned.

### `feature/prototype-content-wiring`

Wire prototype step components 1 through 10 to read from `src/content/`. Each step component opens its own `src/components/steps/step-N-.../index.tsx` and replaces inline string literals with `step${N}.prototype.*` references.

**Visual heals on the deployed deck:**
- Step 5 line 154: "47,000 new jobs projected by 2027" → "2030" (cleanup item #1).
- Step 10 line 171: "What semiconductor families face in Kumamoto." → "What semiconductor families actually face in Kumamoto." (cleanup item #2).
- Step 18 line 786: curly typographic quotes around "See it in action" → straight quotes.

### `feature/prototype-content-wiring-2`

Wire prototype step components 11 through 20. No visual heals expected — these steps are already clean per Phase 1 inventory.

### `feature/prototype-content-wiring-3`

Wire prototype step components 21 through 28.

**Visual heals on the deployed deck:**
- Step 21: remove the placeholder ghost financials block (18.4% IRR, 2.1x multiple, 8.7% cash-on-cash, 5.2 yrs payback, 4.8% exit cap rate, 48.2M JPY NOI) — cleanup item #4.
- Step 22 Beat 5: 6-FAQ block → 5-risk framework — cleanup item #5.
- Step 23: ghost echoes need to be replaced with ghosts of the new 5-risk framework, or dropped — cleanup item #6.
- Step 26: closing paragraph trimmed to the core callback line only ("Entering in 2025 is the equivalent of acquiring land in Zhubei in 2007.") — cleanup item #7. The longer Moha Intel sentence stays in the PDF via `step26.pdfReserved.mohaIntelLine`.

After this branch, every prototype step component reads its visible copy from `src/content/` and the 7 known cleanup items in `value-add-source-of-truth.md` are all healed.

### `feature/content-lockdown` ✅ landed

Final structural pass. All items done in this branch:

1. ✅ Added to CLAUDE.md under "File rules" a "Copy lockdown" bullet stating `src/content/` and `value-add-source-of-truth.md` are the only homes for deck or PDF copy, and that step components and PDF pages may only READ from `@/content`.
2. ✅ Dropped the legacy "`src/data/painPoints.ts` is the authoritative source" line. CLAUDE.md "Authority chain" and the file-tree block also updated to point at `value-add-source-of-truth.md` and `src/content/` instead of the retired `reference/content.md`.
3. ✅ Added `.github/CODEOWNERS` requiring `@RiaanMOHA` review on `/value-add-source-of-truth.md` and `/src/content/`. Enforcement requires GitHub branch protection on `main` with "Require review from Code Owners" enabled — flip that switch in the GitHub web UI to activate.
4. ✅ `src/data/` folder was already deleted in the earlier `feature/pdf-risk-factors` branch once the last PDF page stopped importing from it. Verified zero importers remain.
5. ✅ Deleted `reference/content.md` (orphaned; superseded by `value-add-source-of-truth.md`). No code imported from it.
6. ✅ This branch also wired the previously-missed PDF executive-summary page to `step2.pdfReserved.executiveSummary` (heading, subheading, two body paragraphs, three stats — the retired Ozu-1-era "100 units" stat box was dropped).
7. ✅ This branch ALSO closed the audit gap on "PDF book parts" (cover, back page, 9 section dividers) that Phase 3 decision #4 had previously left as chrome. A new `src/content/pdf-chrome.ts` module owns all three; `cover.tsx`, `back-page.tsx`, and `InvestmentMemo.tsx` now read from it. Source-of-truth has a new "PDF book parts" section documenting them. Phase 3 decision #4 is therefore superseded: nothing in the codebase outside of `src/content/` holds user-visible copy now.
7. ↔️ **Migration plan file kept, not deleted** (Riaan decision, 2026-05-22). This file stays in the repo as the permanent record of the migration. Future sessions reading this file should treat it as historical context, not an active task list.

---

## Key decisions made during Phase 3, do not relitigate

1. **`pdfReserved` is an optional field on the `Step` type** for draft PDF copy that exists in code but has not yet been canonicalized in `value-add-source-of-truth.md`. Currently used on `step10` (pain-point `expanded` / `cause` / `companies`) and `step26` (`mohaIntelLine`). When the source of truth gets the copy formally, move each block from `pdfReserved` into the `pdf` track and remove the `pdfReserved` field.
2. **Em-dashes in the Moha Intel sentence (`— Moha Intel —`)** were normalized to commas (`, Moha Intel,`) per CLAUDE.md's "No emdashes" copy rule. The `step26.pdfReserved.mohaIntelLine` value matches the Step 22 Beat 4 word order ("Moha Intel, an AI-native platform that turns...") not the Step 26 note variant in the source of truth.
3. **The obsolete `PERSONA_HEADING / PERSONA_CONCEPT / PERSONA_MESSAGE` constants** from `src/data/painPoints.ts` are NOT migrated. They are retired by the new Step 12 persona content ("Who lives here." / "The semiconductor engineer").
4. **PDF-internal section labels** (e.g. "09 | Exit strategy", "01 Executive summary") stay in `InvestmentMemo.tsx` / `section-divider.tsx` for now. They are PDF chrome, not deck copy. If a future branch wants to centralize them, that's a separate decision.
5. **Map iframe copy (Steps 6 and 16)** is deferred. Both iframes live in the sibling `map-prototype` project. A separate inventory pass on that folder is required before their copy can be added to `value-add-source-of-truth.md` or `src/content/`.

---

## Visual verification

The PDF is rendered at `http://localhost:3000/pdf`. To check a PDF page after a wiring branch:

1. `pnpm dev`
2. Open `http://localhost:3000/pdf` in a browser.
3. Authenticate with Basic auth: any username + password `moreharvest2026` (the password is set in `src/middleware.ts`).
4. Scroll to the page that was changed and confirm the visible copy matches the canonical text in `src/content/`.

The prototype deck is rendered at `http://localhost:3000`. The orchestrator's floating step navigation (in dev and production) lets you jump to any of the 28 steps for verification.

---

## Pattern for each wiring branch

For every PDF page or step component in this migration:

1. Read the current file to find every literal string the user sees.
2. Identify which `step${N}` in `src/content/` it corresponds to.
3. Replace the inline string with `step${N}.prototype.<field>` (or `step${N}.pdfReserved.<field>` for PDF-only draft copy).
4. Delete the old `src/data/*.ts` import. Do not delete the `src/data/*.ts` file itself — Phase 7 (the lockdown branch) does that.
5. Run `pnpm exec tsc --noEmit` and confirm zero errors.
6. Verify visually per the previous section.
7. Pause for Riaan's approval before moving on to the next page or step.
