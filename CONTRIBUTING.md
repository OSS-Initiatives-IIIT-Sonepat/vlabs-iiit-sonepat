# vlabs — How to Build and Add Things

Virtual ECE labs. Interact with 3D components, step through circuit assembly.

---

## What this project is

A Next.js 16 landing page + interactive virtual lab for ECE education.
The landing page is based on Twenty's design system (Linaria CSS-in-JS, design tokens, halftone WebGL visuals).
The lab system lets you build circuits from reusable 3D components and step through assembly.

---

## Project structure

```
src/
  app/                  next.js app router (single page)
  sections/             landing page sections (menu, hero, trusted-by, etc.)
  sections/three-cards/ the ECE component showcase cards
  sections/three-cards/ece/   EceScene.tsx — Three.js ECE component renderers
  labs/                 (coming) the full lab system
    components/         one file per ECE part (breadboard, led, resistor, wire, gates...)
    circuits/           one file per circuit (half-adder, full-adder, sr-latch...)
    types.ts            Circuit, Component, Step, PinRef types
    LabScene.tsx        generic renderer — takes any Circuit object
    LabStepper.tsx      step nav UI (prev / next / slider)
    COMPONENTS.md       paste this into Claude to generate new circuits
  ui/                   UI primitives (Button, Heading, Body, etc.)
  tokens/               design system (colors, spacing, typography)
  platform/             menu-style, motion, seo, visuals (WebGL halftone engine)
  icons/                icon components
  types/                shared TypeScript types
public/
  fonts/                woff2 font files (Host Grotesk, Aleo, Azeret Mono, VT323, Inter)
  images/               all images
  models/               .glb 3D models (used by halftone engine)
  lottie/               lottie animations
stubs/
  twenty-ui/            local stub for twenty-ui design tokens
  twenty-shared/        local stub for twenty-shared constants
```

---

## Tech stack

| Thing | What |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Styling | Linaria (zero-runtime CSS-in-JS) |
| 3D / WebGL | Three.js |
| UI primitives | @base-ui/react |
| Icons | @tabler/icons-react |
| Language | TypeScript (strict: false) |
| Fonts | next/font/local from public/fonts/ |

---

## Running locally

```bash
npm run dev     # dev server on http://localhost:3003
npm run build   # production build
npm start       # serve production build
```

If you get a `No Lingui config found` error after install:
```bash
Remove-Item -Recurse -Force .next
npm run build
```
This is a stale cache issue — deleting `.next` fixes it every time.

---

## The lab system (how to add a new circuit)

### The workflow

```
1. Open Claude chat (normal chat, no agent needed)
2. Paste the contents of src/labs/COMPONENTS.md
3. Say: "Build a half adder with step-by-step assembly"
4. Claude outputs a Circuit object
5. Save it as src/labs/circuits/half-adder.ts
6. <LabScene circuit={HalfAdder} />  — it just works
```

### What a Circuit object looks like

```ts
// src/labs/circuits/half-adder.ts
export const HalfAdder: Circuit = {
  id: 'half-adder',
  title: 'Half Adder',
  description: 'Adds two 1-bit inputs, produces Sum and Carry.',

  components: [
    { id: 'bb',   type: 'breadboard' },
    { id: 'xor1', type: 'xor-gate',  mountedAt: { board: 'bb', col: 5,  row: 'e' } },
    { id: 'and1', type: 'and-gate',  mountedAt: { board: 'bb', col: 10, row: 'e' } },
    { id: 'w1',   type: 'wire', from: 'bb.tie(1,a)', to: 'xor1.A', color: 'red' },
    { id: 'w2',   type: 'wire', from: 'bb.tie(1,b)', to: 'and1.A', color: 'red' },
  ],

  steps: [
    {
      title: 'Place the breadboard',
      body: 'The breadboard is your build surface.',
      show: ['bb'],
    },
    {
      title: 'Mount the XOR gate',
      body: 'Straddle the XOR gate across the centre gap at column 5.',
      show: ['bb', 'xor1'],
      highlight: 'xor1',
    },
    {
      title: 'Mount the AND gate',
      body: 'Place the AND gate at column 10.',
      show: ['bb', 'xor1', 'and1'],
      highlight: 'and1',
    },
    {
      title: 'Wire input A',
      body: 'Red wire from column 1 to both gate A inputs.',
      show: ['bb', 'xor1', 'and1', 'w1', 'w2'],
      highlight: 'w1',
    },
  ],
}
```

### Key rules

- `components[]` — every part in the circuit. Each has a unique `id` and a `type`.
- `steps[]` — cumulative reveal. Each step's `show[]` lists ALL component ids visible so far (not just new ones).
- `highlight` — optional, points to one component id to animate/focus on that step.
- Steps are NOT separate files. Everything lives in one file per circuit.

---

## How to add a new ECE component (geometry)

Components live in `src/labs/components/`. Each file exports:

1. **A builder function** — returns a `THREE.Group` with geometry
2. **A spec object** — describes the component's pins and usage in plain text

```ts
// src/labs/components/xor-gate.ts

export function buildXorGate(): THREE.Group {
  const root = new THREE.Group();
  // ... Three.js geometry here (bob-the-builder style)
  // white fill + black wireframe edges, no textures
  return root;
}

export const XorGateSpec = {
  id: 'xor-gate',
  description: 'XOR logic gate (74HC86). Output is HIGH when inputs differ.',
  pins: { A: 'input', B: 'input', Y: 'output' },
  usage: 'mountedAt: { board, col, row } — straddles centre gap',
}
```

Then:
1. Register it in `src/labs/components/index.ts`
2. Add its spec to `src/labs/COMPONENTS.md` (this is what Claude reads)

### Geometry style guide

Follow bob-the-builder's approach exactly:
- **White fill** (`0xffffff`) + **black wireframe edges** (`0x141414`)
- Geometry only from Three.js primitives: `BoxGeometry`, `CylinderGeometry`, `SphereGeometry`, `TorusGeometry`
- No `.glb` files, no textures, no external assets
- 1 unit ≈ real scale where it matters (breadboard pitch = 2.54mm → 0.18 units)
- All geometry builders are pure functions — no side effects, no React, no hooks

---

## How the existing 3D showcase cards work

The three cards on the landing page (`src/sections/three-cards/`) show:
- **Breadboard** — solderless breadboard with hole grid, power rails, centre gap
- **LED** — dome + body + leads
- **Resistor** — body + colour bands + leads

These use `EceScene.tsx` which is a self-contained Three.js canvas component.
They are NOT part of the lab system yet — they're just showcases.

The `EceScene` pattern (canvas + useEffect + Three.js + drag-to-rotate + auto-rotate) is the
template to follow for the `LabScene` renderer.

---

## What NOT to do

- Do not add `@lingui/*` packages — i18n has been removed. All strings are plain English.
- Do not use `platform/community`, `platform/http`, `platform/enterprise`, `platform/routing` — deleted.
- Do not import from `@/contact-cal`, `@/app-preview`, `@/pricing-state` — deleted.
- Do not add `stripe`, `three` (already present), `@calcom/embed-react` unless needed.
- Do not add font files to `src/fonts/` — fonts live in `public/fonts/`.
- Do not use `LocalizedLink` — use plain `<a>` or Next.js `<Link>`.

---

## Landing page sections (what's on the home page)

| Section | What it shows |
|---|---|
| `Menu` | Nav bar with logo, links, GitHub/Discord stats |
| `HomeHero` | Headline + CTA + hero bridge backdrop (WebGL halftone) + mockup placeholder |
| `TrustedBy` | Logo bar of companies using Twenty |
| `Problem` | The problem statement with masked WebGL visual |
| `ThreeCards` | 3 ECE component showcase cards (breadboard, LED, resistor) |
| `FeatureCards` | 3 feature cards (familiar interface, live data, fast path) |
| `Helped` | Customer story cards (W3villa, AC&T, NetZero) with scroll animation |
| `Testimonials` | Quote carousel |
| `Footer` | Simple footer (logo, links, copyright) |

---

## Design system quick reference

```ts
import { color, spacing, radius, mediaUp, fontFamily, FONT_WEIGHT } from '@/tokens';

color('blue')           // CSS variable reference
color('gray', 400)      // shade variant
spacing(4)              // 4 × base unit
radius(2)               // border-radius scale
mediaUp('md')           // @media (min-width: 768px)
fontFamily('sans')      // var(--font-sans)
```

Schemes: `data-scheme="light"` | `"dark"` | `"muted"` — components respond automatically.
