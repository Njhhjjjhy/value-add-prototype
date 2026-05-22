# Value-add prototype + PDF: source of truth

## Project-level notes

**Chinese localization (deferred to end of project):**

By has the implementation method. This is end-of-project work. No Chinese copy is added to the source-of-truth until then.

## What this file is

The single source of truth for all copy in the value-add-prototype project and the accompanying PDF.

When copy needs to change, change it here first. Both the prototype and the PDF should match what this file says.

## How this file is built

Three inputs were merged into one:

1. **Project inventory.** The current copy in `/Users/riaan/Documents/Design Files/Code Projects/value-add-prototype/` extracted by Claude Code on 2026-05-21.
2. **Miro.** The "Value-Add" frame on the MoreHarvest board.
3. **Meetings.** Notes from meetings 1, 2, and 3.

Where the three sources agreed, the copy is shown without a flag. Where they disagreed, sections were initially marked `🚩 conflict` with each version side-by-side; Riaan resolved all eight conflicts on 2026-05-21 (see the "Conflicts resolved" section at the bottom of this file).

## What this file does not yet contain

1. **Map iframe copy (Step 6 and Step 16).** The two map prototypes live in separate folders that the project inventory pass did not read. A separate inventory pass on those folders is required to add their copy.
2. **PDF copy.** Most PDF tracks are marked `tbd` because the PDF text has not been written yet.

## How to read this file

Each step has two tracks:

- **Prototype copy.** What appears on screen in the iPad prototype.
- **PDF copy.** The longer, more detailed version that appears in the downloadable PDF.

If the PDF copy is the same as the prototype copy, the PDF section says `same as prototype`. If the PDF copy is different, the full PDF text is shown. If PDF copy hasn't been written yet, the PDF section says `tbd`.

Transition steps (the screens between content beats) are marked `transition` and show only the on-screen copy if any exists.

---

## Cast

| Role | Detail |
|---|---|
| Project | Value-add prototype |
| Audience | Singapore family offices, Taiwan capital (MediaTek-style investors) |
| Format | iPad-first, landscape |
| Total steps | 28 |
| Sections | 13 |
| Focus property | O21 (also written as Ozu-1) |
| Theme | Light mode |

---

# Act 1 — The macro thesis

## Step 1 · Opening transition

**Type:** transition.

**Prototype copy:**

- Alt text: `MoreHarvest`
- Headline: `Enter MoreHarvest world`
- Hold caption: `Hold to enter`
- Aria-label: `Hold to enter MoreHarvest world`

**PDF copy:** not applicable.

---

## Step 2 · Section 1 entry — Why Kumamoto, why now?

**Type:** content step.

**Prototype copy:**

- Headline (line 1): `Why Kumamoto,`
- Headline (line 2): `Why Now?`
- Subheadline: `Japan's fastest-rising property market`
- Fact chip 1: `Serviced apartments`
- Fact chip 2: `TSMC / JASM hub`
- Fact chip 3: `Taiwanese engineers`
- Fact chip 4 (bold): `12-15% IRR`
- Hold prompt aria-label: `Hold to enter`

**Note:** Step 2 has no body paragraph. The COVID/¥10T/47,000 content lives on Step 4 as animated counters.

**PDF copy:** tbd.

---

## Step 3 · Section 2 transition

**Type:** transition.

**Prototype copy:**

- Headline carried over from Step 2 (line 1): `Why Kumamoto,`
- Headline (line 2): `Why Now?`
- Subheadline carried over: `Japan's fastest-rising property market`

**PDF copy:** not applicable.

---

## Step 4 · Section 2 bridge — the numbers

**Type:** content step.

**Prototype copy:**

- Animated counter 1: counts `0` to `10`. Final value: `10`.
- Counter 1 aria-label (template): `${count10} trillion yen. Japan is rebuilding its chip industry.`
- Counter 1 aria-label (final): `10 trillion yen. Japan is rebuilding its chip industry.`
- Counter 1 body suffix: `trillion yen. Japan is rebuilding its chip industry.`
- Animated counter 2: counts `0` to `47,000`. Final value: `47,000`.
- Counter 2 aria-label (template): `${count47.toLocaleString()} jobs being created. Kumamoto is set to attract waves of high-income engineers.`
- Counter 2 aria-label (final): `47,000 jobs being created. Kumamoto is set to attract waves of high-income engineers.`
- Counter 2 body suffix: `jobs being created. Kumamoto is set to attract waves of high-income engineers.`
- Closing body: `High-income engineers are arriving. Housing demand will follow.`

**PDF copy:** tbd.

---

## Step 5 · Section 3 transition (ghost bridge)

**Type:** transition.

**Prototype copy:**

- Ghost caption: `SEMICONDUCTOR INVESTMENT CORRIDOR`
- Ghost stat 1: `10T`
- Ghost stat 1 label: `yen in confirmed investment`
- Ghost stat 2: `47,000`
- Ghost stat 2 label: `new jobs projected by 2030`
- Ghost body line 1: `TSMC / JASM fab complex`
- Ghost body line 2: `Sony semiconductor expansion`
- Ghost body line 3: `Government infrastructure program`
- Continue prompt: `Tap to continue`

**PDF copy:** not applicable.

---

## Step 6 · Section 3 map

**Type:** content step.

**Prototype copy:**

- Iframe title: `Kumamoto map`

**Missing:** All visible UI within this step is provided by an external map iframe at `/playground/prototypes/step-6-section-3-map/map-prototype-v1/index.html`. The copy inside the iframe is owned by a separate project and has not been inventoried yet. A separate inventory pass on that folder is required to complete this step in the source of truth.

**PDF copy:** tbd.

---

# Act 2 — The pattern

## Step 7 · Section 4 transition

**Type:** transition.

**Prototype copy:**

- Section label: `SECTION 4`
- Stat: `2005`
- Stat: `2025`
- Headline: `You've seen this movie before.`

**PDF copy:** not applicable.

---

## Step 8 · Section 4 parallel hook

**Type:** content step.

**Prototype copy:**

- Section label: `Section 4 · The macro thesis`
- Headline: `You've seen this movie before.`
- Left image caption: `Hsinchu Science Park · 2005`
- Left body: `TSMC's 12-inch fab opens.`
- Left stat: `+120%`
- Left stat caption: `Baoshan property prices, 3 years following`
- Right badge: `Now`
- Right image caption: `JASM Kumamoto · 2025`
- Right body: `JASM Fab 1 opens.`
- Right stat: `+33%`
- Right stat caption: `Ozu Town land prices, year-over-year · #1 in Japan`
- Divider line: `Same fab · Same pattern · 20 years apart`
- Closing whisper: `We'll come back to this.`

**Note:** The closing whisper `We'll come back to this.` is set up here and paid off at Step 25 (`We said we'd come back to this.`). Do not break this callback.

**PDF copy:** tbd.

---

# Act 3 — The pain

## Step 9 · Section 5 transition

**Type:** transition.

**Prototype copy:**

- Section label: `SECTION 5`
- Headline: `Pain points`
- Body: `What semiconductor families actually face in Kumamoto.`
- Caption: `Physical · Mental`

**PDF copy:** not applicable.

---

## Step 10 · Section 5 pain points

**Type:** content step.

**Prototype copy:**

- Section label: `Section 5 · Pain points`
- Headline: `What semiconductor families actually face in Kumamoto.`
- Group label: `Physical`
- Group label: `Mental`

**Physical pain points (on screen):**

1. Label `Traffic congestion` — Summary `1 to 3 hours per day lost to traffic.`
2. Label `No Chinese-speaking support` — Summary `All-Japanese admin, no language support for daily life.`
3. Label `Administrative burden` — Summary `Furniture, appliances, registration, waste disposal.`
4. Label `Housing quality anxiety` — Summary `Water quality, volcanic ash, and no property management buffer.`

**Mental pain points (on screen):**

5. Label `Limited medical access` — Summary `No interpreter for emergencies, prenatal care, or vaccinations.`
6. Label `Mental health strain` — Summary `No counseling access, no psychiatrist referrals in Chinese.`
7. Label `Children's education gaps` — Summary `KIS slots limited, curriculum alignment is a major concern.`
8. Label `Adapting to Kumamoto lifestyle` — Summary `Culture shock, daily friction, and social isolation.`

**Persona stat block:**

- Stat value: `3 to 5 million yen`
- Stat label: `estimated replacement cost per engineer who repatriates early due to family maladjustment.`

**Missing — expanded pain point fields for PDF:**

The data file `src/data/painPoints.ts` contains additional fields per pain point (`cause`, `expanded`, `companies`) that are not rendered on screen but are reserved for the PDF. These fields were not captured in the project inventory pass and need to be extracted separately. The PDF version of Step 10 should include them.

**PDF copy:** tbd. Pull from `painPoints.ts` — `cause`, `expanded`, `companies` fields per pain point.

---

# Act 4 — The persona

## Step 11 · Section 6 transition (descent and resolve)

**Type:** transition.

**Prototype copy:**

- Resolve panel headline: `3 to 5 million yen`
- Resolve panel body: `Estimated replacement cost per engineer who repatriates early due to family maladjustment.`
- Continue aria-label: `Continue`
- Continue prompt: `Tap to continue`

**Note:** The source file contains vestigial `${count10}` aria-label template literals copied from Step 4's descent animation. They are not visible on screen and should be cleaned up in the prototype code. Not part of the copy inventory.

**PDF copy:** not applicable.

---

## Step 12 · Section 6 persona

**Type:** content step.

**Prototype copy:**

- Section label: `Section 6 · Demand`
- Headline: `Who lives here.`
- Persona alt text: `The semiconductor engineer — JASM / TSMC supply chain`
- Section subtitle: `TENANT PROFILE`
- Persona title: `The semiconductor engineer`
- Persona subtitle: `JASM / TSMC supply chain · rotational deployment`

**Constraints:**

1. Index `01`. Label `Proximity`. Body `10-minute drive to the fab. Non-negotiable for shift-based and emergency call-ins.`
2. Index `02`. Label `Stay length`. Body `Short business stays to mid- and long-term assignments. Months, not nights.`
3. Index `03`. Label `Group size`. Body `Small teams of 3 to 4. Travel together, work together, prefer to live together.`
4. Index `04`. Label `Logistics`. Body `Multiple cars per household. Parking is a hard requirement, not a perk.`

**Closing line:**

`A hotel room is a compromise. A studio apartment is a compromise. A 4LDK shared home is the format this tenant has been waiting for.`

**Note:** Meeting 1 explicitly required pain points before persona. The project order (Step 10 pain points → Step 11 transition → Step 12 persona) matches this. No conflict.

**PDF copy:** tbd.

---

# Act 5 — The product

## Step 13 · Section 7 transition

**Type:** transition.

**Prototype copy:**

- Headline: `So what does a real solution look like?`
- Continue prompt: `Tap to continue`
- Continue aria-label: `Tap to continue`

**PDF copy:** not applicable.

---

## Step 14 · Section 7 current options

**Type:** content step.

**Prototype copy:**

- Section label: `Section 7 · What you would find today`
- Headline: `Nothing on the market is ready.`
- Slot 1 caption: `No furniture`
- Slot 2 caption: `Before renovation`
- Slot 3 caption: `Not ready to move in`
- Image placeholder text (appears in all three slots): `Before image`

**Note:** `Before image` is the placeholder text shown before real "before" photographs are added. It is not a copy issue.

**PDF copy:** tbd.

---

## Step 15 · Section 8 transition — the investment

**Type:** transition.

**Prototype copy:**

- Caption: `THE INVESTMENT`
- Stat 1: `10 trillion yen`
- Body 1: `Total semiconductor investment committed to Kumamoto prefecture`
- Aria-label 1: `10 trillion yen. Total semiconductor investment committed to Kumamoto prefecture.`
- Stat 2: `47,000 jobs`
- Body 2: `New positions projected by 2030`
- Aria-label 2: `47,000 jobs. New positions projected by 2030.`

**PDF copy:** not applicable.

---

## Step 16 · Section 8 product hardware

**Type:** content step.

**Prototype copy:**

- Iframe title: `Kumamoto property map`

**Missing:** All visible UI within this step is provided by an external property map iframe at `/playground/prototypes/step-12-section-6-product-hardware/map-prototype-v1/index.html`. The copy inside the iframe has not been inventoried yet. A separate inventory pass is required.

**PDF copy:** tbd.

---

## Step 17 · Section 9 transition

**Type:** transition.

**Prototype copy:**

- Section label: `Section 9 · Product, software`
- Headline: `Software-defined real estate`
- Continue prompt: `Tap to continue`

**PDF copy:** not applicable.

---

## Step 18 · Section 9 product software

**Type:** content step.

**Prototype copy — main deck:**

- Section label: `Section 9 · Product, software`
- Headline: `Software-defined real estate`
- Lead body: `Taiwanese staff solve all problems, from daily logistics to language barriers. Nothing affects expected quality of life.`

**Service tiers:**

| Year | Tier name | Tag | Items |
|---|---|---|---|
| `Year 1` | `Landing` | `Included` | `Property secretary. Admin accompaniment. Maintenance.` |
| `Year 2` | `Family` | `Add-on` | `Medical navigation. Education support. Community events.` |
| `Year 3+` | `Wellness` | `Premium` | `Mental health. Health management. Golf, onsen, culture.` |

**Closing body:** `The software layer keeps growing. New modules pushed without modifying buildings.`

**Button:** `See it in action`

**Prototype copy — device demo:**

- Status bar time: `9:41`
- Status bar signal: `5G`
- Intro body: `Tap "See it in action" to begin`
- Lock-screen heading: `Software-defined real estate`
- Lock-screen body: `What your phone looks like as a MoreHarvest resident.`

**Year 1 (Landing) — header strip:**

- Year label: `Year 1`
- Year sub: `Landing`
- Year tag: `Included`

**Year 1 notifications (3):**

| From | Message | Time |
|---|---|---|
| `Lin Wei-Chen` | `Your SoftBank appointment is confirmed for Thursday, 2:00 PM. I will meet you at the entrance.` | `9:41 AM` |
| `Maintenance` | `Delta AC unit in 4F serviced. Everything is running normally.` | `2:15 PM` |
| `MoreHarvest` | `Your residence guide is ready. Available in Chinese and Japanese.` | `10:00 AM` |

**Year 2 (Family) — header strip:**

- Year label: `Year 2`
- Year sub: `Family`
- Year tag: `Add-on`

**Year 2 notifications (3):**

| From | Message | Time |
|---|---|---|
| `Medical nav` | `Dr. Tanaka appointment confirmed. Chinese interpreter arranged for 10:30 AM.` | `8:20 AM` |
| `Education` | `KIS school bus: Monday pickup at Building A, 7:45 AM. Driver is Mr. Oda.` | `7:00 PM` |
| `Community` | `Lunar New Year dinner at the residents lounge, January 25. RSVP open.` | `3:30 PM` |

**Year 3+ (Wellness) — header strip:**

- Year label: `Year 3+`
- Year sub: `Wellness`
- Year tag: `Premium`

**Year 3+ notifications (3):**

| From | Message | Time |
|---|---|---|
| `Wellness` | `Your wellness check-in is Tuesday at 3:00 PM. Counselor Chen is available in Chinese.` | `11:00 AM` |
| `Concierge` | `Golf reservation confirmed. Aso Grand Vrio, Saturday 7:30 AM. Shuttle arranged.` | `6:45 PM` |
| `Culture` | `New: Kumamoto pottery workshop series. 4 sessions starting March 8.` | `9:15 AM` |

**Next button aria-label:** `Continue to next step`

**Note:** The string `Software-defined real estate` is intentionally repeated on Step 18 — once as the deck headline and once as the device lock-screen heading. The device mirrors the deck on purpose.

**PDF copy:** tbd.

---

# Act 6 — The numbers

## Step 19 · Section 10 transition — the investment case

**Type:** transition.

**Prototype copy:**

- Service row ghost: `Property secretary`
- Service row ghost: `Medical navigation`
- Service row ghost: `Education support`
- Service row ghost: `Admin support`
- Service row ghost: `Mental wellness`
- Service row ghost: `Cultural program`
- Headline: `The investment case.`
- Next button aria-label: `Continue to next step`

**PDF copy:** not applicable.

---

## Step 20 · Section 10 financials

**Type:** content step.

**Prototype copy:**

- Section label: `Section 10 · Underwriting`
- Headline: `The numbers.`

**Development phase:**

| Row | Value | Note | Party |
|---|---|---|---|
| `Initial capital` | `¥35,000,000` | `Land, building, renovation, furniture, appliances and related costs` | `J Estate Co. Ltd.` |

**Return on investment:**

| Scenario | Return |
|---|---|
| `1 unit per year` | `5.00%` |
| `1.5 units per year` | `7.50%` |
| `2 units per year` | `10.00%` |

**Rental yield:**

| Rent scenario | Yield |
|---|---|
| `Rent (high) · ¥190,000 / month` | `5.00%` |
| `Rent (average) · ¥160,000 / month` | `4.21%` |

**Sales phase — revenue:**

| Row | Value | Note |
|---|---|---|
| `Sale price` | `¥45,600,000` | `Consumption tax included` |

**Sales phase — costs:**

| Row | Value | Note | Party |
|---|---|---|---|
| `Guaranteed investor interest income` | `¥1,750,000` | `5% per annum` | — |
| `Agency commission` | `¥1,368,000` | `3% of sale price, excl. consumption tax` | `MasterHouse Real Estate` |
| `Travel expenses — sales team` | `¥300,000` | `3 trips (property introduction, contract signing, handover) · ¥100,000 per trip` | `J Estate Co. Ltd.` |
| `Travel expenses — MoreHarvest` | `¥120,000` | `1 trip (property introduction) · flights and hotel` | `MoreHarvest` |
| `Entertainment — sales team` | `¥150,000` | `Sales-related hospitality` | `J Estate Co. Ltd.` |
| `Entertainment — MoreHarvest` | `¥150,000` | `Sales-related hospitality` | `MoreHarvest` |
| `Sales-related expenses` | `¥800,000` | `Leasing agent fees, advertising, transportation and other actual costs` | `J Estate Co. Ltd.` |
| `Sales support — Taiwan` | `¥456,000` | `Briefings and backend data system · 1% of sale price` | `MoreHarvest` |
| `Sales support — Japan` | `¥501,600` | `Kumamoto-side property tours and briefings · 1% of sale price` | `J Estate Co. Ltd.` |

**Net result:**

| Row | Value | Note | Party |
|---|---|---|---|
| `Profit (pre-tax)` | `¥5,004,400` | — | — |
| `Corporate tax` | `¥1,751,540` | `Japan corporate tax` | — |
| `Property warranty` | `¥1,368,000` | `10-year property warranty · 3% of base price` | `J Estate Co. Ltd.` |
| `Net profit` | `¥1,884,860` | `Shared between J Estate Co. Ltd. and MoreHarvest` | — |

**IRR closing paragraphs:**

1. `This strategy focuses on acquiring existing properties for renovation, with a typical construction period of 1 to 2 months. Sales can be initiated during the renovation phase, effectively shortening capital deployment time.`
2. `Compared to ground-up development projects, the investment cycle is significantly shorter. Under normal conditions, two full cycles (acquisition, renovation, sale) can be completed within a year, enhancing capital efficiency.`
3. `Overall, this is a short-cycle, lower-risk, and high-efficiency investment model.`

**Note:** Step 20's underwriting numbers (5% / 7.5% / 10% IRR, ¥35M initial capital, ¥1.88M net profit) are canonical. The different ghost figures previously shown on Step 21 (18.4% IRR, 2.1x multiple, etc.) are placeholder decoration and should be removed from the prototype code.

**PDF copy:** tbd.

---

# Act 7 — The risk

## Step 21 · Section 11 transition — ghost financials and resolve

**Type:** transition.

**Prototype copy:**

- Resolve panel section label: `Section 11`
- Resolve panel headline: `Every investment carries risk.`
- Resolve panel body: `Here is how this one is structured to mitigate them.`
- Next button aria-label: `Continue to next step`

**Note:** The earlier ghost financials block (`Financial projections` headline, 18.4% IRR, 2.1x multiple, 8.7% cash-on-cash, 5.2 yrs payback, 4.8% exit cap rate, 48.2M JPY NOI) has been ruled placeholder decoration and should be removed from the prototype code. It is not canonical copy.

**PDF copy:** not applicable.

---

## Step 22 · Section 11 risk factors

**Type:** content step.

**Beat 1 — thesis:**

- Continue aria-label (while beat < 5): `Tap to continue`
- Caption: `Kumamoto semiconductor corridor, 2024 to 2035`
- Thesis headline: `Entering in 2025 is the equivalent of acquiring land in Zhubei in 2007.`

**Beat 2 — key data points (6 stats):**

| Stat | Label | Sub |
|---|---|---|
| `1.7x` | `Land prices since 2020` | `Prefecture-wide` |
| `33.3%` | `Annual gain, #1 in Japan` | `Site 1, 2024` |
| `$20B+` | `Combined fab investment` | `JASM Fab 1 and Fab 2` |
| `4T` | `Yen economic impact` | `10-year estimate` |
| `44` | `Companies drawn` | `By TSMC to Kumamoto` |
| `~2x` | `Zhubei 5-year growth` | `Hsinchu precedent` |

**Beat 2 caption label:** `Key data points`

**Beat 3 — strategic timing (timeline):**

**Beat 3 caption label:** `Strategic timing`

| Year | Title | Detail |
|---|---|---|
| `2024-2025` | `Fab 1 opens` | `Engineers arrive. Supply gap. No premium developer.` |
| `2026-2028` | `Fab 2 operational` | `Supply chain clusters. Investment exceeds $20B.` |
| `2029-2032` | `Developer competition` | `Major developers enter. Early-mover advantage locks.` |
| `2033-2035` | `Exit window` | `REIT threshold. Institutional acquisition.` |

**Beat 4 — Moha Intel:**

- Heading: `Moha Intel`
- Body: `We bring what no developer brought to Hsinchu then: Moha Intel, an AI-native platform that turns every asset into a data-generating node, compounding both NOI and proprietary market intelligence across the portfolio.`

**Beat 5 — risks and hedges:**

- Caption: `Risk factors`

**Risk 1 — Liquidity and exit (exit liquidity)**

- Risk: `If market liquidity declines, the speed or price of sale may be affected.`
- Hedge 1: `Choose products with dual demand for "owner-occupier + investment" to expand the buyer pool.`
- Hedge 2: `Keep the total price per unit within a market-acceptable range.`
- Hedge 3: `Maintain stable leases to increase investor willingness to take over (yield play).`

**Risk 2 — Demand concentration**

- Risk: `If TSMC's expansion slows or the semiconductor cycle turns down, this may affect expat housing and supply chain accommodation demand.`
- Hedge 1: `Tenants are not limited to TSMC, but also include Japan's local supply chain and related industries (Sony, equipment manufacturers, etc.).`
- Hedge 2: `Choose areas with established living amenities to ensure properties can fall back on the general Japanese rental market.`
- Hedge 3: `Adopt convertible products (can shift from corporate dormitory to standard family rental).`

**Risk 3 — Infrastructure timing**

- Risk: `If construction progress on the Daiku Airport and surrounding infrastructure is delayed, this may affect regional appeal and rental growth.`
- Hedge 1: `Only deploy in mature areas that already have basic living amenities.`
- Hedge 2: `Build on "existing demand" rather than relying entirely on future expectations.`
- Hedge 3: `Control holding costs and investment cycles to reduce time-based risk exposure.`

**Risk 4 — Tenant concentration**

- Risk: `If overly reliant on corporate tenants or a single leaseholder, vacancy or negotiation pressure may arise.`
- Hedge 1: `Diversify across multiple small units (multiple supply chain firms) rather than a single enterprise.`
- Hedge 2: `Maintain product versatility to serve both expat staff and general tenants simultaneously.`
- Hedge 3: `Furnished single-family homes are currently a highly scarce property type in the area.`

**Risk 5 — Renovation and cost control (execution risk)**

- Risk: `Cost overruns or schedule delays in renovation will affect IRR and turnover efficiency.`
- Hedge 1: `Control scope of work (avoid over-customisation).`
- Hedge 2: `Adopt a short-cycle strategy (1–2 months) to reduce variables.`

**Back button aria-label:** `Go back`
**Next button aria-label:** `Continue to next step`

**Note:** The previous 6-FAQ block (TSMC slowdown, JPY, construction, GK-TK tax, hotel chains, TK governance) has been replaced by the 5-risk framework above. The FAQ copy is no longer canonical and should be removed from the prototype code.

**PDF copy:** tbd.

---

# Act 8 — The exit

## Step 23 · Section 12 transition — risk to exit

**Type:** transition.

**Prototype copy:**

- Continue aria-label: `Tap to continue`
- Section ghost caption: `Risk factors`
- Risk ghost (echo of Step 22): `Liquidity and exit (exit liquidity)`
- Risk ghost: `Demand concentration`
- Risk ghost: `Infrastructure timing`
- Risk ghost: `Tenant concentration`
- Risk ghost: `Renovation and cost control (execution risk)`
- Resolve panel section label: `Section 12`
- Resolve panel headline: `Exit strategy`
- Continue prompt: `Tap to continue`

**PDF copy:** not applicable.

---

## Step 24 · Section 12 exit strategy

**Type:** content step.

**Verified by Riaan on 2026-05-21 as the correct version.**

**Prototype copy:**

- Section label: `Section 12 · Exit strategy`
- Headline: `One door.`
- Subheadline: `Sell to other buyers with the master lease in place.`
- Body: `Kumamoto's housing demand is structural, not cyclical. The same engineer migration that drove Hsinchu for two decades is just starting here. When the time comes to exit, the buyers are there: owner-occupiers, yield investors, or institutional vehicles taking on a portfolio with a stable lease already attached.`

**PDF copy:** tbd.

---

# Act 9 — The payoff

## Step 25 · Section 13 transition — the callback

**Type:** transition.

**Prototype copy:**

- Callback line: `We said we'd come back to this.`
- Section label: `SECTION 13`
- Headline: `Parallel timeline`

**Note:** This callback pays off the setup on Step 8 (`We'll come back to this.`). Do not break.

**PDF copy:** not applicable.

---

## Step 26 · Section 13 parallel timeline

**Type:** content step.

**Prototype copy — left column (Hsinchu):**

- Section label: `Section 13 · Parallel timeline`
- Headline (phase = hsinchu): `Hsinchu Science Park`
- Caption: `Zhubei · Hsinchu Corridor`
- Badge: `2005 — 2018 · Verified outcome`

**Hsinchu timeline:**

| Years | Title | Detail |
|---|---|---|
| `2004 – 2006` | `TSMC 12-inch fab expansion` | `Engineer population surpassed 100,000; inbound migration accelerated across Hsinchu County` |
| `2007 – 2009` | `Acute residential supply gap` | `Zhubei land prices rose over 60% in 3 years; senior engineers housed in hotels for lack of alternatives` |
| `2010 – 2012` | `Institutional developers enter` | `Far Glory, Cathay Real Estate begin land acquisition; early movers had already locked the best sites` |
| `2013 – 2018` | `Market maturity · rental premium locks in` | `Premium apartments sustain 2–3× rental premium; Zhubei established as Taiwan's benchmark tech cluster` |

**Hsinchu metrics:**

| Stat | Label | Sub |
|---|---|---|
| `+180%` | `Zhubei premium rent growth` | `2006–2015 cumulative` |
| `+60%` | `Zhubei land price appreciation` | `2007–2010 · 3-year window` |

**Prototype copy — right column (Kumamoto):**

- Headline (phase = kumamoto): `Kumamoto Semiconductor Corridor`
- Caption: `Kikuyo · Ozu · Kumamoto City`
- Badge: `2024 — 2035 · In progress`

**Kumamoto timeline:**

| Years | Title | Detail |
|---|---|---|
| `2024 – 2025` | `JASM Fab 1 opens · Taiwanese engineers arrive` | `3,000–5,000 TSMC-dispatched engineers relocating; Kikuyo-cho land prices already up 40–80%` |
| (callout, prefixed `→ `) | — | `Now: residential supply gap, no premium developer has entered` |
| `2026 – 2028` | `Fab 2 confirmed · supply chain clusters form` | `Tier-2 suppliers land nearby; engineer families settle long-term, driving demand for family housing` |
| `2029 – 2032` | `Developer competition · land price peak` | `Major Japanese developers enter; early-mover land cost advantage becomes unreplicable` |
| `2033 – 2035` | `J-REIT exit window opens` | `Portfolio reaches REIT threshold; institutional acquisition or listed-vehicle exit` |

**Kumamoto metrics:**

| Stat | Label | Sub |
|---|---|---|
| `+40–80%` | `Kikuyo-cho land appreciation` | `2022–2024` |
| `0` | `Existing Taiwan-grade premium residential supply in market` | `MoreHarvest` |

**Closing line (prototype, core only):**

`Entering in 2025 is the equivalent of acquiring land in Zhubei in 2007.`

**Note:** The longer Moha Intel sentence (`We bring what no developer brought to Hsinchu then: an AI-native platform — Moha Intel — that turns every asset into a data-generating node, compounding both NOI and proprietary market intelligence across the portfolio.`) is **not shown on the prototype** to keep Step 26 visually tight. It moves to the PDF. The callback line itself intentionally repeats on Step 22 beat 1 and Step 26 closing — that repetition is the payoff.

**PDF copy:** tbd. The PDF closing should include both the callback line and the longer Moha Intel sentence above, plus the full timeline and source citations (see citations table at the bottom of this file).

**Proposed update from meeting 4 (2026-05-22):**

1. Hsinchu historical timeline alongside projected growth.
2. Visual effect showing continuous line extending into future.
3. Demonstrate market growth and investment opportunities for exit strategy.

Status: proposed. Awaiting Riaan's review.

---

# Act 10 — The ask

## Step 27 · PDF transition

**Type:** transition. No copy in source.

**PDF copy:** not applicable.

---

## Step 28 · Download PDF

**Type:** content step.

**Prototype copy:**

- Headline: `The full picture.`
- Body: `The memo behind everything you just saw. Per-unit underwriting, comparables, exit analysis, and the parallel timeline in detail.`
- Button: `Download PDF`

**PDF copy:** not applicable. (This step exists only in the prototype.)

---

# PDF book parts

PDF-only copy that is not tied to any of the 28 deck steps. Lives in `src/content/pdf-chrome.ts`. When this copy changes, change it here first.

**Cover page headline** (rendered as three stacked lines):

1. `Kumamoto`
2. `semiconductor corridor`
3. `serviced apartments.`

**Back page** (last page of the PDF):

- Company name: `MoreHarvest`
- Email: `Hello@moreharvest.com`
- Website: `www.moreharvest.com`
- Disclaimer: `Confidential. For qualified investors only.`

**Section divider tab pages** (9 total — match the 9 PDF sections, not the 28 deck steps):

| Number | Title |
|---|---|
| `01` | `Executive summary` |
| `02` | `Market context` |
| `03` | `Target tenant` |
| `04` | `Current options` |
| `05` | `Product: hardware` |
| `06` | `Product: software` |
| `07` | `Financial projections` |
| `08` | `Risk factors` |
| `09` | `Exit strategy` |

---

# What's still missing from this file

This source of truth covers every string captured in the project inventory. It does not yet cover:

1. **Map iframe copy (Step 6).** Lives in `/playground/prototypes/step-6-section-3-map/map-prototype-v1/index.html`. Needs a separate inventory pass.
2. **Property map iframe copy (Step 16).** Lives in `/playground/prototypes/step-12-section-6-product-hardware/map-prototype-v1/index.html`. Needs a separate inventory pass.
3. **Pain points expanded fields (Step 10 → PDF).** The `cause`, `expanded`, and `companies` fields are reserved in `src/content/steps/step-10-section-5-pain-points.ts` under `pdfReserved`. They are not yet promoted to the canonical `pdf` track and are still flagged as not formally written here.
4. **PDF copy for every step.** Most PDF tracks above are marked `tbd`.

---

# Source citations to preserve in PDF references to these data points

| Data point | Source |
|---|---|
| Hsinchu Science Park employment, household income | Hsinchu Science Park Bureau Statistics; Ministry of Finance income tax data 2022 |
| Zhubei housing prices, 5-year doubling | 591 Real Price Registry, 10-year analysis; industry surveys 2021–2025 |
| Baoshan (TSMC zone) +120% over 3 years | Sinyi Realty TSMC zone tracking, 5-year survey 2025 |
| Hsinchu County 10-year +60% | Ministry of the Interior Real Estate Information Center, 10-year index |
| TSMC drew 44+ companies to Kumamoto | Brookings Institution, "Japan's Semiconductor Industry Revival," June 2024 |
| Kumamoto prefecture land +1.7x since 2020 | Development Bank of Japan (DBJ) economic impact report, January 2026 |
| ¥4 trillion 10-year economic impact for Kumamoto | WealthPark / JASM joint statement; TrendForce February 2024 |
| Ozu Town +33.3% annual gain, #1 in Japan | Bloomberg, "TSMC factories drive Japan's largest land price increase," September 2024; MLIT annual land price survey |

---

# Conflicts resolved (2026-05-21)

All eight conflicts from the original inventory have been resolved by Riaan. Decisions:

1. **Step 2.** Keep project as-is — no body paragraph on Step 2. COVID/¥10T/47,000 stays as animated counters on Step 4.
2. **Step 5 and Step 15.** 47,000 jobs projected by 2030. Both steps aligned.
3. **Step 9 vs Step 10.** Pain points headline reads `What semiconductor families actually face in Kumamoto.` Both steps aligned with `actually`.
4. **Step 11.** Descent aria-label strings are vestigial. Removed from inventory; cleanup pending in prototype code.
5. **Step 18.** Duplicate `Software-defined real estate` heading is intentional — device mirrors deck.
6. **Step 20 vs Step 21.** Step 21's ghost financials are placeholder decoration. Removed from inventory; cleanup pending in prototype code.
7. **Step 22 framework.** Replaced 6 FAQs with Miro's 5-risk framework (liquidity/exit, demand concentration, infrastructure timing, tenant concentration, renovation/execution). FAQ copy removed; cleanup pending in prototype code.
8. **Step 22 beat 4 vs Step 26 closing.** Platform is `Moha Intel`. Phrase is `proprietary market intelligence`. Callback line `Entering in 2025 is the equivalent of acquiring land in Zhubei in 2007.` intentionally repeats on Step 22 beat 1 and Step 26 closing. Step 26 closing trimmed to the core callback line for the prototype; the longer Moha Intel sentence moves to the PDF.

# Downstream cleanup needed in the prototype code

All seven cleanup items have been healed in the deployed deck.

1. ~~**Step 5.** Update `47,000 new jobs projected by 2027` to `47,000 new jobs projected by 2030`.~~ Done.
2. ~~**Step 10.** Update headline `What semiconductor families face in Kumamoto.` to `What semiconductor families actually face in Kumamoto.`.~~ Done.
3. ~~**Step 11.** Remove vestigial `${count10}` descent aria-label template literals.~~ Done.
4. ~~**Step 21.** Remove the placeholder ghost financials block (`Financial projections`, 18.4% IRR, 2.1x multiple, 8.7% cash-on-cash, 5.2 yrs payback, 4.8% exit cap rate, 48.2M JPY NOI).~~ Done.
5. ~~**Step 22 beat 5.** Replace the 6 FAQ Q&A pairs with the 5-risk framework above.~~ Done.
6. ~~**Step 23.** The transition currently echoes the 6 FAQ ghost lines from Step 22; once Step 22's FAQs are removed these ghost echoes will need to be replaced with ghosts of the new 5-risk framework, or dropped.~~ Done — ghosts now show the 5-risk names.
7. ~~**Step 26.** Trim closing paragraph to the core callback line only; move the longer Moha Intel sentence to the PDF.~~ Done.
