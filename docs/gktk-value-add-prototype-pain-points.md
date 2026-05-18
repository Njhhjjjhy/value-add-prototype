# Pain point data — value-add-prototype

## Authority

This file is the single authoritative source for all pain point copy and data in the value-add-prototype. It overrides any other file. Do not invent, infer, or alter any field value. Use every string verbatim.

---

## Where to put this data

Create a dedicated data file at:

```
src/data/painPoints.ts
```

Do not inline this data inside the component file. Do not create a separate file per group. One file, one export.

---

## The complete data constant

Copy this exactly into `src/data/painPoints.ts`. Do not split it. Do not reorder entries. Do not rename fields.

```typescript
export const PAIN_POINTS = [
  // Physical pain points — render first, in this order
  {
    id: "traffic-congestion",
    group: "physical" as const,
    label: "Traffic congestion",
    cause: "Fab locations are remote, but workers live wherever they can find housing.",
    summary: "1 to 3 hours per day lost to traffic.",
    expanded:
      "Senior managers commuting from Kumamoto City to the fab corridor face up to 3 hours daily. Land prices within the JASM corridor have surged 40 to 80%, pushing workers further from their worksite.",
    companies: ["Topco", "Marketech", "Wholetech"],
  },
  {
    id: "no-chinese-support",
    group: "physical" as const,
    label: "No Chinese-speaking support",
    cause: "Relocated engineers are foreign nationals in an all-Japanese system.",
    summary: "All-Japanese admin, no language support for daily life.",
    expanded:
      "Expatriates face Japanese-only property management, requiring 2 to 3 weeks to activate utilities, gas, and internet. Budgets of 200,000 to 300,000 yen find almost no furnished options with Chinese-language support.",
    companies: ["JASM", "ASE", "Elan Microelectronics"],
  },
  {
    id: "administrative-burden",
    group: "physical" as const,
    label: "Administrative burden",
    cause: "Short-term assignments mean constant move-in, move-out cycles for HR.",
    summary: "Furniture, appliances, registration, waste disposal.",
    expanded:
      "HR departments must handle guarantor requirements, waste disposal procedures, furniture procurement, utility setup, and resident registration. The Japanese rental market is unfriendly to foreign nationals and nothing is turnkey.",
    companies: ["UIS", "G2C Alliance"],
  },
  {
    id: "housing-quality-anxiety",
    group: "physical" as const,
    label: "Housing quality anxiety",
    cause: "Standard Japanese rentals were not designed for foreign family occupancy.",
    summary: "Water quality, volcanic ash, and no property management buffer.",
    expanded:
      "Dependents commonly report anxiety about water quality (skin issues) and Mt. Aso volcanic ash cleanup. No professional property management buffer means frequent daily-life disputes including garbage sorting and noise.",
    companies: ["G2C Alliance"],
  },

  // Mental pain points — render second, in this order
  {
    id: "limited-medical-access",
    group: "mental" as const,
    label: "Limited medical access",
    cause: "Semiconductor work schedules leave no room for navigating a foreign healthcare system.",
    summary: "No interpreter for emergencies, prenatal care, or vaccinations.",
    expanded:
      "There are almost no Chinese-speaking medical services in the Kumamoto corridor. Families face emergencies without an interpreter, prenatal checkups with no language support, and childhood vaccination schedules they cannot navigate alone.",
    companies: ["Topco", "MA-tek"],
  },
  {
    id: "mental-health-strain",
    group: "mental" as const,
    label: "Mental health strain",
    cause: "High-pressure fab work combined with family instability creates compounding stress.",
    summary: "No counseling access, no psychiatrist referrals in Chinese.",
    expanded:
      "Engineers report compounding stress from demanding fab schedules and family adjustment issues. There are no Chinese-language mental health services in Kumamoto. Spouses experiencing isolation have no professional support system available.",
    companies: ["JASM", "MA-tek", "LCY"],
  },
  {
    id: "education-gaps",
    group: "mental" as const,
    label: "Children's education gaps",
    cause: "Assignments last 2 to 5 years, but children cannot fall behind in Taiwan's curriculum.",
    summary: "KIS slots limited, curriculum alignment is a major concern.",
    expanded:
      "Families worry their children cannot keep up with Japanese schools or will not be able to reintegrate into Taiwan's curriculum upon return. Kumamoto International School slots are extremely limited in 2026. No dedicated school buses serve the corridor.",
    companies: ["Topco", "MA-tek", "LCY"],
  },
  {
    id: "kumamoto-lifestyle",
    group: "mental" as const,
    label: "Adapting to Kumamoto lifestyle",
    cause: "Engineers and families are uprooted to a rural Japanese city with no transition support.",
    summary: "Culture shock, daily friction, and social isolation.",
    expanded:
      "Dependents living in standard Japanese housing lack social interaction and Chinese-language support. Highly educated spouses without a social life often pressure employees to repatriate early.",
    companies: ["JASM", "MA-tek", "LCY", "G2C Alliance"],
  },
] satisfies PainPoint[];

export type PainPoint = {
  id: string;
  group: "physical" | "mental";
  label: string;
  cause: string;
  summary: string;
  expanded: string;
  companies: string[];
};

export const PHYSICAL_PAIN_POINTS = PAIN_POINTS.filter((p) => p.group === "physical");
export const MENTAL_PAIN_POINTS = PAIN_POINTS.filter((p) => p.group === "mental");
```

---

## Field reference

| Field | Type | Purpose | Display rules |
|---|---|---|---|
| `id` | `string` | Stable key for DOM refs, animation targets, GSAP labels, and React state. Never rename. | Never render directly. |
| `group` | `"physical" \| "mental"` | Determines render group. Physical renders before mental. | Use for group heading logic only. |
| `label` | `string` | Primary display name for the pain point. | Render as the main heading or card title. Sentence case. Never title-case. |
| `cause` | `string` | One sentence describing the structural reason this pain point exists. | Render as a secondary line beneath `label`. Plain text only. Not a link. Not a heading. |
| `summary` | `string` | Compact description for default or collapsed state. | Use when space is constrained or the item has not been expanded. |
| `expanded` | `string` | Full explanation for expanded or detail state. | Use in tooltips, drawers, or full-card states. |
| `companies` | `string[]` | Companies affected. Reference data only. | Do not render unless the spec explicitly calls for it. |

---

## Hard rules

1. There are exactly 8 pain points. Never add a ninth. Never remove one.
2. Physical group (4 items) always renders before mental group (4 items). The order within each group is locked.
3. Never alter any string in `label`, `cause`, `summary`, or `expanded`. These are approved copy.
4. The `id` values are stable. Do not rename them. GSAP labels, DOM refs, and any state keyed to these ids must use the exact strings defined above.
5. All rendered text is sentence case. Do not title-case any field.
6. No em dashes anywhere in the rendered output. The source strings do not contain em dashes. Do not introduce them.
7. No yen symbols in body prose. The word "yen" is written in full. Yen symbols are acceptable only in data tables or financial metrics, which are not part of this component.
8. The `companies` field is reference data. It must not appear in the UI unless the prototype spec explicitly requires it.

---

## Group heading strings

If the layout requires group headings, use these exact strings and no others:

```typescript
export const GROUP_LABELS: Record<"physical" | "mental", string> = {
  physical: "Physical",
  mental: "Mental",
};
```

Do not add counts, descriptors, or subheadings. "Physical (4)" is wrong. "Physical pain points" is wrong. "Physical" is correct.

---

## Animation

### Library

Use **GSAP** for sequenced reveal choreography. Do not use the Web Animations API (`element.animate()`) in production components. The Web Animations API is the prototyping pattern only. GSAP is the production pattern per `CLAUDE.md`.

### Easing curves

| Name | Curve | Use |
|---|---|---|
| `gentle` | `cubic-bezier(0.23, 0.86, 0.39, 0.96)` | Exits, closing, receding. Duration: 300ms. |
| `settle` | `cubic-bezier(0.22, 1, 0.36, 1)` | Entrances, reveals, landing. Duration: 350–500ms. |

Register these as GSAP custom eases once at the top of the component:

```typescript
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);
CustomEase.create("gentle", "0.23, 0.86, 0.39, 0.96");
CustomEase.create("settle", "0.22, 1, 0.36, 1");
```

### Pre-mounting

All 8 pain point elements must be pre-mounted in the DOM with `visibility: hidden`. Do not conditionally render them with `&&` or ternaries. Conditional mounting causes GSAP ref timing bugs where the target element does not exist when the timeline runs.

```tsx
// Correct
<div ref={itemRef} style={{ visibility: "hidden" }}>
  {/* item content */}
</div>

// Wrong
{isVisible && <div ref={itemRef}>...</div>}
```

### Sequencing

1. Physical group items reveal first. Stagger each item with 80–120ms offset. Use `opacity: 0 → 1` and `y: 16 → 0` with `settle` easing.
2. After the last physical item completes, pause for a minimum of 300ms before the mental group begins.
3. Mental group items reveal with the same stagger pattern.
4. Do not reveal both groups in parallel.

### GPU-safe properties only

Only animate `transform` (via `x`, `y`, `scale`, `rotation` in GSAP) and `opacity`. Do not animate `height`, `max-height`, `clip-path`, `padding`, `margin`, or `width`. These are not GPU-accelerated and will cause layout thrashing.
