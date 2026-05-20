# To-do for the next feature branch

Written 2026-05-20 at the close of `feature/deck-polish`. Read this when starting the next branch.

---

## Deck content work (Phase 5 of the 28-step plan)

Three items left from the original Phase 5 list. Recommended order: smallest first.

### 1. Step 14 — Current options "before" images (small)

Spec doc: `docs/step-10-section-5-current-options-flow.md`

What's needed: swap whatever placeholder imagery the current options step is using for the real "before" property photos. These are the photos that show what the property looks like before MoreHarvest renovates it — the contrast against the "after" is the whole point of this step.

Files to touch:
- `src/components/steps/step-14-section-7-current-options/index.tsx`

### 2. Step 26 — Parallel timeline copy lock-in (small)

Spec doc: `docs/step-20-section-10-exit-strategy-flow.md` (**misnamed file** — its contents are the locked copy for step 26, the parallel-timeline step. Read the body, not the filename.)

What's needed: the parallel-timeline step (Hsinchu phase → Kumamoto phase, two-phase reveal on tap) has placeholder copy. The spec doc has the final approved copy. Drop it in.

Files to touch:
- `src/components/steps/step-26-section-13-parallel-timeline/index.tsx`

### 3. Step 16 — Ozu-1 hardware walkthrough (big)

Spec doc: `docs/step-12-section-6-product-hardware-flow.md`

What's needed: integrate the actual GKTK Ozu-1 property walkthrough into the hardware step. This is the biggest piece of remaining content work — it touches the persistent property-map host (`src/components/shared/PropertyMapHost.tsx`) too, so coordinate with the map system carefully.

Files to touch:
- `src/components/steps/step-16-section-8-product-hardware/index.tsx`
- Probably `src/components/shared/PropertyMapHost.tsx` for any new map cues

### 4. Final — showcase regen

After all of the above is merged, regenerate the `showcase/` folder per `docs/showcase-prompt.md`. This is mechanical cleanup.

---

## Infrastructure follow-ups (separate from deck content)

### Vercel: connect directly to origin (5-minute config task)

Today Vercel deploys from a separate GitHub fork (`Njhhjjjhy/value-add-prototype`). After every merge to main on `RiaanMOHA/value-add-prototype`, someone has to manually run `git push vercel main` for the deploy to fire. This is fragile — easy to forget, easy to leave local and deployed out of sync.

**The fix:** connect Vercel directly to `RiaanMOHA/value-add-prototype`. Then every merge auto-deploys.

Riaan's steps (in your browser):

1. Go to **vercel.com** and log in
2. Find the **value-add-prototype** project. Click it
3. Click **Settings** (top nav)
4. In the left sidebar, click **Git**
5. You should see "Connected Git Repository: Njhhjjjhy/value-add-prototype"
6. Click **Disconnect** (Vercel will ask you to confirm — yes, disconnect)
7. Now click **Connect Git Repository**
8. Choose **GitHub**
9. Pick **RiaanMOHA/value-add-prototype** from the list
10. Confirm the **Production Branch** is **main**
11. Save

If at step 9 you don't see your `RiaanMOHA/value-add-prototype` repo in the list, you need to install the Vercel GitHub app on your `RiaanMOHA` account first — Vercel will show a button to do that. Click it, install, come back and pick the repo.

After this is done: every time a `/feature finish` merges to main, Vercel auto-deploys. No more `git push vercel main` step. The "reference: vercel deploys from a separate fork" memory I have can be deleted.

If you get stuck on any step, share a screenshot in Claude and I'll walk you through what to click.

### Map drift (recurring nuisance, not deck-blocking)

The sibling `map-prototype` project keeps pushing half-finished migration changes into this repo (deleted snapshot folders, modified `MapHost.tsx` / `PropertyMapHost.tsx`, new `src/types/map-core.d.ts`). When this happens, the local dev server breaks because it tries to import a `@moreharvest/map-core` package that isn't installed here.

**Short-term:** if the local dev server suddenly shows a blank white page, run:

```
git restore src/components/shared/MapHost.tsx src/components/shared/PropertyMapHost.tsx src/playground/manifest.ts
rm -f src/types/map-core.d.ts
git checkout HEAD -- public/playground/prototypes/
```

Then restart `pnpm dev`. That undoes the drift.

**Real fix:** sit down with the `map-prototype` repo and finish that migration properly in a dedicated effort. Until then, the drift will keep coming back.

---

## What's done already (so you don't re-do it)

- Step 20 financials: full breakdown table built from CSV — done in PR #6, merged 2026-05-20
- QA tool visible on production deploys — done in PR #6, merged 2026-05-20
