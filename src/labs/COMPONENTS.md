# vlabs — Circuit & Component Reference for AI Generation

Paste this file into Claude (or any LLM) to generate new lab experiments.
Human docs: `/docs` in the running app.

---

## Architecture at a glance

```
src/components/              HOW to draw parts (Three.js geometry)
labs/semesters/.../          WHAT each lab uses (experiment data + procedure)
labs/circuits/ + content/    Legacy labs only (being phased out)
labs/previews/               Marketing React canvases (EceViewer cards)
app/labs/[slug]/             Single dynamic route for all labs
```

| Layer                 | Path                             | Role                                                    |
| --------------------- | -------------------------------- | ------------------------------------------------------- |
| **Geometry**          | `src/components/{type}/index.ts` | Three.js mesh builders (`buildResistor`, `buildLed`, …) |
| **Bill of materials** | `…/experiment/components.ts`     | Which parts exist, where they sit, how wires connect    |
| **Procedure**         | `…/experiment/04-procedure/*.ts` | Step copy + cumulative `show[]` for the 3D scene        |
| **Registration**      | `labs/semesters/catalog.ts`      | Wires experiments into explore + `/labs/<id>`           |

**Important:** `components.ts` in an experiment folder is _not_ the same as `src/components/`. The experiment file lists circuit instances; `src/components/` holds the shared render code.

---

## Preferred workflow: semester experiment folder

New labs should live under:

```
src/labs/semesters/semester-01/01-analog-electronics/<slug>/
  01-aim.ts
  02-theory.ts
  03-apparatus.ts
  04-procedure/
    01-….ts
    index.ts          ← re-exports procedureSteps[]
  05-observations.ts
  06-conclusion.ts
  components.ts       ← ComponentInstance[] (circuit BOM)
  constants.ts        ← optional 3D marker positions (imports @/labs/marker-helpers)
  index.ts            ← ExperimentDefinition + buildCircuit/buildLabContent exports
```

### 1. Create the experiment folder

Each numbered section file exports a `LabSection`. Procedure steps export `SceneProcedureStep` objects with their own `show` arrays — there is no separate `circuitStepIndex`.

```ts
// 04-procedure/01-breadboard-and-supply.ts
import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Place the breadboard and connect the DC power supply.",
  body: "Place the 830-point breadboard…",
  show: ["bb", "psu"], // cumulative visible component ids
};
```

```ts
// 04-procedure/index.ts
import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step as s01 } from "./01-breadboard-and-supply";
// …

export const procedureSteps: SceneProcedureStep[] = [s01 /* … */];
```

### 2. Define the circuit in `components.ts`

```ts
import { type ComponentInstance } from "@/labs/types";

export const components: ComponentInstance[] = [
  { id: "bb", type: "breadboard" },
  {
    id: "r1",
    type: "resistor",
    ohms: 470,
    mountedAt: { board: "bb", col: 5, row: "c" },
  },
  // wires, instruments, …
];
```

### 3. Assemble `index.ts`

```ts
import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";
// …other sections

export const myExperiment: ExperimentDefinition = {
  id: "my-slug", // kebab-case, unique
  title: "My Experiment",
  description: "…",
  components,
  sections: [aim /* theory, apparatus, observations, conclusion */],
  procedureSteps,
};

export const MyCircuit = buildCircuit(myExperiment);
export const MyContent = buildLabContent(myExperiment);
```

### 4. Register in `labs/semesters/catalog.ts`

Import the experiment exports and add an entry to the appropriate subject's `experiments` array:

```ts
import { MyCircuit, MyContent, myExperiment } from './semester-01/01-analog-electronics/my-slug';

// inside SEMESTER_SUBJECTS → experiments:
fromBuilt(myExperiment, MyCircuit, MyContent, ['tag1', 'tag2']),
```

That's it. `SEMESTER_CIRCUITS` and `SEMESTER_CONTENTS` are derived automatically. The lab appears in explore and at `/labs/my-slug`.

---

## Legacy workflow (digital / unmigrated labs)

Older labs still use split definitions:

```
src/labs/circuits/<id>/index.ts   → Circuit (components + steps)
src/labs/content/<id>.ts          → LabContent (theory, procedure text)
```

To add a legacy lab:

1. Save circuit to `src/labs/circuits/<id>/index.ts`
2. Save content to `src/labs/content/<id>.ts`
3. Import and push into `LEGACY_CIRCUITS` in `src/labs/circuits/index.ts`
4. Export content from `src/labs/content/index.ts`

Prefer the semester folder format for all new work.

---

## Component types (circuit BOM)

Every entry below is a valid `ComponentInstance` variant from `src/labs/types.ts`.

> [!WARNING]
> **3D Rendering Limitations:** Only breadboards, wires, basic passives (resistor, capacitor, LED), discrete actives (Diodes, BJTs, MOSFETs), basic logic gates (`not-gate` through `buffer-gate`), displays (7seg-display), switches/buttons, and bench instruments (`dc-jack`, meters, scopes, logic analyser) currently render in 3D. All other components (advanced ICs like adders/muxes/flip-flops, microprocessors) are **simulation-only**. They will _not_ appear on the 3D breadboard, even though they have physical `mountedAt` footprints listed below.

---

### Breadboard (always first)

```ts
{ id: 'bb', type: 'breadboard' }          // 30 columns (cols 1–30)
{ id: 'bb', type: 'long-breadboard' }     // 60 columns (cols 1–60) — same rows/rails
```

---

### Passives

#### Resistor

```ts
{ id: 'r1', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 22, row: 'c' } }
```

- Spans **col → col+3** (4 columns wide)

#### Capacitor

```ts
{ id: 'c1', type: 'capacitor', capacitance: 100, mountedAt: { board: 'bb', col: 5, row: 'c' } }
```

- Spans **col → col+1**; `capacitance` in µF

#### Inductor

```ts
{ id: 'l1', type: 'inductor', henrys: 0.001, mountedAt: { board: 'bb', col: 5, row: 'c' } }
```

- Spans **col → col+3** (same footprint as resistor)

#### LED

```ts
{ id: 'led1', type: 'led', color: 'green', mountedAt: { board: 'bb', col: 24, row: 'c' } }
```

- `color`: `'red' | 'green' | 'yellow' | 'blue' | 'white'`
- Spans **col (anode) → col+1 (cathode)**
- Always place a series resistor at col N; LED goes at col N+2

#### Diode / Zener

```ts
{ id: 'd1', type: 'diode', mountedAt: { board: 'bb', col: 5, row: 'c' } }         // 1N4148
{ id: 'z1', type: 'zener', vz: 5.1, mountedAt: { board: 'bb', col: 10, row: 'c' } }
```

- Spans **col (anode) → col+3 (cathode)** (same footprint as resistor)

---

### Discrete active components

#### BJT (Bipolar Junction Transistor)

```ts
{ id: 'q1', type: 'npn-bjt', mountedAt: { board: 'bb', col: 10, row: 'c' } }  // BC547
{ id: 'q2', type: 'pnp-bjt', mountedAt: { board: 'bb', col: 15, row: 'c' } }  // BC557
```

- 3 pins: **B** (col), **C** (col+1), **E** (col+2)

#### MOSFET

```ts
{ id: 'm1', type: 'n-mosfet', mountedAt: { board: 'bb', col: 20, row: 'c' } }  // 2N7000
{ id: 'm2', type: 'p-mosfet', mountedAt: { board: 'bb', col: 25, row: 'c' } }
```

- 3 pins: **G** (col), **D** (col+1), **S** (col+2)

---

### Logic gates — DIP-14 (straddle centre gap, `row: 'e'`)

```ts
{ id: 'and1', type: 'and-gate',    mountedAt: { board: 'bb', col: 5,  row: 'e' } }  // 74HC08
{ id: 'or1',  type: 'or-gate',    mountedAt: { board: 'bb', col: 12, row: 'e' } }  // 74HC32
{ id: 'not1', type: 'not-gate',   mountedAt: { board: 'bb', col: 19, row: 'e' } }  // 74HC04
{ id: 'nand1',type: 'nand-gate',  mountedAt: { board: 'bb', col: 5,  row: 'e' } }  // 74HC00
{ id: 'nor1', type: 'nor-gate',   mountedAt: { board: 'bb', col: 5,  row: 'e' } }  // 74HC02
{ id: 'xor1', type: 'xor-gate',   mountedAt: { board: 'bb', col: 5,  row: 'e' } }  // 74HC86
{ id: 'xnor1',type: 'xnor-gate',  mountedAt: { board: 'bb', col: 5,  row: 'e' } }  // 74HC266
{ id: 'buf1', type: 'buffer-gate',mountedAt: { board: 'bb', col: 5,  row: 'e' } }  // 74HC125
```

**Placement rules:**

- Each IC occupies **7 consecutive columns** (7 pins per side)
- Space ICs at least 2 columns apart (14 cols total per IC + gap)
- `row: 'e'` — IC straddles the centre gap
- Do not place anything past col 29 on a standard 30-col board

### Op-Amp

```ts
{ id: 'op1', type: 'op-amp', mountedAt: { board: 'bb', col: 10, row: 'e' } }  // LM741, DIP-8
```

- DIP-8 package, spans **4 columns**, straddling the centre gap

---

### Displays

```ts
{ id: 'seg1', type: '7seg-display', mountedAt: { board: 'bb', col: 10, row: 'e' } }  // DIP-10
```

---

## Simulation-Only Components (No 3D Mesh)

> [!CAUTION]
> The components in this section **DO NOT HAVE 3D MESHES**. They are strictly for simulation logic. `LabScene` will ignore them and return `null`. Do not attempt to use them in standard breadboard labs.
> Note: The `mountedAt` property is often required by TypeScript (`types.ts`), but it is completely ignored by the 3D engine for these components.

### Reducing gates (N-bit → 1-bit)

```ts
{ id: 'ar1', type: 'and-reduce',  bits: 4, mountedAt: { board: 'bb', col: 5, row: 'e' } }
{ id: 'or1', type: 'or-reduce',   bits: 4, mountedAt: { board: 'bb', col: 5, row: 'e' } }
{ id: 'nr1', type: 'nand-reduce', bits: 4, mountedAt: { board: 'bb', col: 5, row: 'e' } }
{ id: 'nr1', type: 'nor-reduce',  bits: 4, mountedAt: { board: 'bb', col: 5, row: 'e' } }
{ id: 'xr1', type: 'xor-reduce',  bits: 4, mountedAt: { board: 'bb', col: 5, row: 'e' } }
{ id: 'xr1', type: 'xnor-reduce', bits: 4, mountedAt: { board: 'bb', col: 5, row: 'e' } }
```

---

### Arithmetic ICs

```ts
{ id: 'add1', type: 'adder-4bit', mountedAt: { board: 'bb', col: 5, row: 'e' } }  // 74HC283, DIP-16

// Generic multi-bit (virtual/ALU)
{ id: 'add1', type: 'adder',      bits: 8, signed: false, mountedAt: { board: 'bb', col: 5, row: 'e' } }
{ id: 'sub1', type: 'subtractor', bits: 8, signed: false, mountedAt: { board: 'bb', col: 5, row: 'e' } }
{ id: 'mul1', type: 'multiplier', bits: { in1: 4, in2: 4, out: 8 }, mountedAt: { board: 'bb', col: 5, row: 'e' } }
{ id: 'neg1', type: 'negator',    bits: 8, mountedAt: { board: 'bb', col: 5, row: 'e' } }
```

#### Comparators

```ts
{ id: 'eq1', type: 'compare-eq', bits: 4, signed: false, mountedAt: { board: 'bb', col: 5, row: 'e' } }
{ id: 'ne1', type: 'compare-ne', bits: 4, mountedAt: { board: 'bb', col: 5, row: 'e' } }
{ id: 'lt1', type: 'compare-lt', bits: 4, mountedAt: { board: 'bb', col: 5, row: 'e' } }
{ id: 'le1', type: 'compare-le', bits: 4, mountedAt: { board: 'bb', col: 5, row: 'e' } }
{ id: 'gt1', type: 'compare-gt', bits: 4, mountedAt: { board: 'bb', col: 5, row: 'e' } }
{ id: 'ge1', type: 'compare-ge', bits: 4, mountedAt: { board: 'bb', col: 5, row: 'e' } }
```

#### Shifters

```ts
{ id: 'sl1', type: 'shift-left',  bits: { in: 8, amount: 3, out: 8 }, signed: false, mountedAt: { board: 'bb', col: 5, row: 'e' } }
{ id: 'sr1', type: 'shift-right', bits: { in: 8, amount: 3, out: 8 }, signed: false, mountedAt: { board: 'bb', col: 5, row: 'e' } }
```

---

### Multiplexers / Demultiplexers

```ts
{ id: 'mux1', type: 'mux-4to1',   mountedAt: { board: 'bb', col: 5, row: 'e' } }   // 74HC153, DIP-16
{ id: 'mux2', type: 'mux-2to1-ic',mountedAt: { board: 'bb', col: 5, row: 'e' } }   // 74HC157, DIP-16
{ id: 'mux3', type: 'mux',        bits: { in: 4, sel: 2 }, mountedAt: { board: 'bb', col: 5, row: 'e' } } // generic
{ id: 'dmx1', type: 'demux-1to4', mountedAt: { board: 'bb', col: 5, row: 'e' } }   // 74HC139, DIP-16
{ id: 'dmx2', type: 'demux-1to8', mountedAt: { board: 'bb', col: 5, row: 'e' } }   // 74HC138, DIP-16
```

---

### Encoders / Decoders

```ts
{ id: 'enc1', type: 'encoder-8to3', mountedAt: { board: 'bb', col: 5, row: 'e' } }  // 74HC148, DIP-16
{ id: 'dec1', type: 'decoder-3to8', mountedAt: { board: 'bb', col: 5, row: 'e' } }  // 74HC138, DIP-16
```

---

### Sequential logic

#### D Flip-Flop

```ts
{ id: 'dff1', type: 'dff', bits: 1, initial: '0', mountedAt: { board: 'bb', col: 5, row: 'e' } }  // 74HC74, DIP-14
```

#### JK Flip-Flop

```ts
{ id: 'jk1', type: 'jk-ff', mountedAt: { board: 'bb', col: 5, row: 'e' } }  // 74HC76, DIP-16
```

#### SR Latch

```ts
{ id: 'sr1', type: 'sr-latch', mountedAt: { board: 'bb', col: 5, row: 'e' } }  // 74HC279, DIP-16
```

---

### Counters

```ts
{ id: 'cnt1', type: 'counter-4bit-async', mountedAt: { board: 'bb', col: 5, row: 'e' } }  // 74HC93, DIP-14
{ id: 'cnt2', type: 'counter-4bit-sync',  mountedAt: { board: 'bb', col: 5, row: 'e' } }  // 74HC161, DIP-16
```

---

### Registers

```ts
{ id: 'reg1', type: 'register-4bit',     mountedAt: { board: 'bb', col: 5, row: 'e' } }  // 74HC173, DIP-16
{ id: 'reg2', type: 'register-8bit',     mountedAt: { board: 'bb', col: 5, row: 'e' } }  // 74HC273, DIP-20
{ id: 'reg3', type: 'register-8bit-tri', mountedAt: { board: 'bb', col: 5, row: 'e' } }  // 74HC374, DIP-20
```

---

### Bus ICs

```ts
{ id: 'bt1', type: 'bus-transceiver', mountedAt: { board: 'bb', col: 5, row: 'e' } }  // 74HC245, DIP-20
{ id: 'al1', type: 'address-latch',   mountedAt: { board: 'bb', col: 5, row: 'e' } }  // 74HC373, DIP-20
```

#### Bus virtual operations (no physical IC, DigitalJS)

```ts
{ id: 'ze1', type: 'zero-extend', extend: { input: 4, output: 8 }, mountedAt: { board: 'bb', col: 5, row: 'e' } }
{ id: 'se1', type: 'sign-extend', extend: { input: 4, output: 8 }, mountedAt: { board: 'bb', col: 5, row: 'e' } }
{ id: 'bs1', type: 'bus-slice',   slice: { first: 0, count: 4, total: 8 }, mountedAt: { board: 'bb', col: 5, row: 'e' } }
{ id: 'bg1', type: 'bus-group',   groups: [4, 4], mountedAt: { board: 'bb', col: 5, row: 'e' } }
{ id: 'bu1', type: 'bus-ungroup', groups: [4, 4], mountedAt: { board: 'bb', col: 5, row: 'e' } }
```

---

### I/O nodes (DigitalJS virtual, for logic simulations)

```ts
{ id: 'in_a',  type: 'input-node',  bits: 1, net: 'A',   mountedAt: { board: 'bb', col: 1, row: 'a' } }
{ id: 'out_s', type: 'output-node', bits: 1, net: 'Sum', mountedAt: { board: 'bb', col: 28, row: 'a' } }
{ id: 'vcc',   type: 'constant',    value: '1', mountedAt: { board: 'bb', col: 1, row: 'b' } }
{ id: 'clk1',  type: 'clock',       period: 100, mountedAt: { board: 'bb', col: 2, row: 'b' } }
```

---

### Simulation-Only Displays

```ts
{ id: 'rgb1', type: 'rgb-led',      mountedAt: { board: 'bb', col: 20, row: 'c' } }  // 4-pin (R, G, B, GND)
```

---

### Microprocessor / Interfacing

**Note:** Microprocessors are currently simulation-only (no 3D mesh in `LabScene`). They will not render on the breadboard.

```ts
{ id: 'cpu1', type: 'cpu-8085', mountedAt: { board: 'bb', col: 1, row: 'e' } }   // Intel 8085
{ id: 'ppi1', type: 'ppi-8255', mountedAt: { board: 'bb', col: 20, row: 'e' } }  // Intel 8255 PPI
```

---

### Switches & Buttons

```ts
{ id: 'sw1',  type: 'switch',      mountedAt: { board: 'bb', col: 25, row: 'c' } }  // slide switch
{ id: 'btn1', type: 'push-button', mountedAt: { board: 'bb', col: 20, row: 'e' } }  // 4-pin tactile
{ id: 'dip1', type: 'dip-switch',  poles: 4, mountedAt: { board: 'bb', col: 10, row: 'e' } }  // DIP
```

---

### Instruments (beside breadboard)

**CRITICAL RULE:** Do NOT use standard `type: 'wire'` components to connect instruments to the board. Always use the built-in `terminals` (for sources) or `probes` (for meters/scopes) arrays.

```ts
// DC power supply / AC transformer source — renders as bench PSU on the left
{
  id: 'psu', type: 'dc-jack',
  mountedAt: { board: 'bb', col: 1, row: 'a' },
  terminals: [
    { board: 'bb', rail: 'vcc_top', col: 5 },  // [0] = + terminal
    { board: 'bb', rail: 'gnd_top', col: 5 },  // [1] = − terminal
  ],
}

// Battery (same renderer as dc-jack, use when the source is a cell/pack)
{
  id: 'bat1', type: 'battery',
  mountedAt: { board: 'bb', col: 1, row: 'b' },
  terminals: [
    { board: 'bb', rail: 'vcc_top', col: 3 },
    { board: 'bb', rail: 'gnd_top', col: 3 },
  ],
}

// Digital multimeter — renders as bench DMM
{
  id: 'dmm', type: 'potentiometer',
  mountedAt: { board: 'bb', col: 1, row: 'c' },
  probes: [
    { board: 'bb', col: 11, row: 'c' },  // [0] = probe 1
    { board: 'bb', col: 14, row: 'c' },  // [1] = probe 2
  ],
}

// Analogue milliammeter — 0–100 mA panel meter (blue body)
{
  id: 'am1', type: 'ammeter',
  mountedAt: { board: 'bb', col: 1, row: 'd' },
  probes: [
    { board: 'bb', col: 8, row: 'c' },   // [0] = + terminal (series in)
    { board: 'bb', col: 10, row: 'c' },  // [1] = − terminal (series out)
  ],
}

// Analogue voltmeter — 0–15 V DC panel meter (grey body)
{
  id: 'vm1', type: 'voltmeter',
  mountedAt: { board: 'bb', col: 1, row: 'e' },
  probes: [
    { board: 'bb', col: 8, row: 'c' },   // [0] = + probe
    { board: 'bb', col: 14, row: 'c' },  // [1] = − probe
  ],
}

// Oscilloscope / CRO — black body with green screen
{
  id: 'cro', type: 'oscilloscope',
  mountedAt: { board: 'bb', col: 1, row: 'f' },
  probes: [
    { board: 'bb', col: 15, row: 'c' },            // [0] = CH1
    { board: 'bb', rail: 'gnd_top', col: 15 },    // [1] = GND
  ],
}

// Function / signal generator — 0.1 Hz – 1 MHz
{
  id: 'fg1', type: 'function-generator',
  mountedAt: { board: 'bb', col: 1, row: 'g' },
  probes: [
    { board: 'bb', col: 3, row: 'a' },             // [0] = OUTPUT 50Ω
    { board: 'bb', rail: 'gnd_top', col: 3 },     // [1] = GND
  ],
}
```

Use `step.readings` to display live instrument values in the lab UI:

```ts
readings: { dmm: "2.4 V", am1: "12 mA" }
```

---

## Wire (PinRef) syntax

Every wire has typed `from` and `to` — never strings.

### Tie point (breadboard hole)

```ts
{ board: 'bb', col: 3, row: 'a' }
```

Valid rows: `a b c d e f g h i j` · Valid cols: `1–30` (or `1–60` for long-breadboard)

### IC pin

```ts
{ ic: 'xor1', pin: 'A' }   // input A  (col+0, row e)
{ ic: 'xor1', pin: 'B' }   // input B  (col+1, row e)
{ ic: 'xor1', pin: 'Y' }   // output Y (col+2, row e)
```

Pin names: `A`, `B`, `Y` (single gate) or `1A`, `1B`, `1Y`, … (dual gate)

### Passive pin (resistor / capacitor / inductor / diode)

```ts
{ component: 'r1', end: 'p1' }   // left lead  (col)
{ component: 'r1', end: 'p2' }   // right lead (col+3)
```

### LED pin

```ts
{ led: 'led1', end: 'anode' }    // col
{ led: 'led1', end: 'cathode' }  // col+1
```

### Power rail

```ts
{ board: 'bb', rail: 'vcc_top', col: 1 }
{ board: 'bb', rail: 'gnd_top', col: 1 }
{ board: 'bb', rail: 'vcc_bot', col: 1 }
{ board: 'bb', rail: 'gnd_bot', col: 1 }
```

### Wire instance

```ts
{
  id: 'w_a_xor', type: 'wire', color: 'red',
  from: { board: 'bb', col: 3, row: 'a' },
  to:   { ic: 'xor1', pin: 'A' },
}
```

### Wire colors

`red` `blue` `orange` `green` `yellow` `white` `black` `purple`

Convention:

- Input A = red, Input B = blue, Cin = orange
- Internal signals = white
- Sum/Diff = green, Carry/Borrow = yellow/orange
- Ground = black, VCC = red

---

## Procedure steps

Procedure steps own both instructional copy **and** 3D scene state via `show`.

```ts
export const step: SceneProcedureStep = {
  label: "Wire inputs", // step heading in the lab UI
  body: "Red=A, Blue=B…", // markdown body
  show: ["bb", "xor1", "w_a_xor"], // cumulative visible ids
  highlight: "xor1", // optional camera focus
  activeInputs: { A: 0, B: 0 }, // optional I/O panel (digital)
  supplyVoltage: 5.0, // optional (analog)
  readings: { dmm: "2.4 V" }, // optional instrument display
  ledBrightness: { led1: 0.8 }, // optional LED dimming (0.0–1.0)
  audioPath: "/semesters/…/01-step.mp3", // optional audio narration
};
```

**Rules:**

- First step: usually `['bb']` or `['bb', 'psu']`
- Each step **adds** to `show[]` — never removes earlier ids
- Last step: `show` contains every component id, including all wires
- Every id in `show[]` must exist in `components.ts`
- Aim for 5–10 steps; analog labs often have more

`buildCircuit()` maps `label` → circuit step `title` for the 3D stepper.

---

## Full working example: Half Adder (Semester format)

Semester labs split this across `components.ts` + `04-procedure/`. Do NOT use the legacy single-file Circuit object format.

```ts
// components.ts
import { type ComponentInstance } from "@/labs/types";

export const components: ComponentInstance[] = [
  { id: "bb", type: "breadboard" },
  {
    id: "xor1",
    type: "xor-gate",
    mountedAt: { board: "bb", col: 7, row: "e" },
  },
  {
    id: "and1",
    type: "and-gate",
    mountedAt: { board: "bb", col: 16, row: "e" },
  },
  {
    id: "r_sum",
    type: "resistor",
    ohms: 330,
    mountedAt: { board: "bb", col: 22, row: "c" },
  },
  {
    id: "r_carry",
    type: "resistor",
    ohms: 330,
    mountedAt: { board: "bb", col: 26, row: "c" },
  },
  {
    id: "led_sum",
    type: "led",
    color: "green",
    mountedAt: { board: "bb", col: 24, row: "c" },
  },
  {
    id: "led_carry",
    type: "led",
    color: "yellow",
    mountedAt: { board: "bb", col: 28, row: "c" },
  },
  {
    id: "w_a_xor",
    type: "wire",
    color: "red",
    from: { board: "bb", col: 3, row: "a" },
    to: { ic: "xor1", pin: "A" },
  },
  {
    id: "w_a_and",
    type: "wire",
    color: "red",
    from: { board: "bb", col: 3, row: "b" },
    to: { ic: "and1", pin: "A" },
  },
  {
    id: "w_b_xor",
    type: "wire",
    color: "blue",
    from: { board: "bb", col: 4, row: "a" },
    to: { ic: "xor1", pin: "B" },
  },
  {
    id: "w_b_and",
    type: "wire",
    color: "blue",
    from: { board: "bb", col: 4, row: "b" },
    to: { ic: "and1", pin: "B" },
  },
  {
    id: "w_xor_r",
    type: "wire",
    color: "green",
    from: { ic: "xor1", pin: "Y" },
    to: { component: "r_sum", end: "p1" },
  },
  {
    id: "w_r_led",
    type: "wire",
    color: "green",
    from: { component: "r_sum", end: "p2" },
    to: { led: "led_sum", end: "anode" },
  },
  {
    id: "w_and_r",
    type: "wire",
    color: "orange",
    from: { ic: "and1", pin: "Y" },
    to: { component: "r_carry", end: "p1" },
  },
  {
    id: "w_r_led2",
    type: "wire",
    color: "yellow",
    from: { component: "r_carry", end: "p2" },
    to: { led: "led_carry", end: "anode" },
  },
  {
    id: "w_gnd1",
    type: "wire",
    color: "black",
    from: { led: "led_sum", end: "cathode" },
    to: { board: "bb", rail: "gnd_top", col: 1 },
  },
  {
    id: "w_gnd2",
    type: "wire",
    color: "black",
    from: { led: "led_carry", end: "cathode" },
    to: { board: "bb", rail: "gnd_top", col: 2 },
  },
];
```

```ts
// index.ts
import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";
// import other sections...

export const halfAdderExperiment: ExperimentDefinition = {
  id: "half-adder",
  title: "Half Adder",
  description: "Adds two 1-bit inputs A and B. Sum = A XOR B, Carry = A AND B.",
  components,
  sections: [aim /*, theory, apparatus, observations, conclusion */],
  procedureSteps,
  truthTable: {
    inputs: ["A", "B"],
    outputs: ["Sum", "Carry"],
    rows: [
      { inputs: { A: 0, B: 0 }, outputs: { Sum: 0, Carry: 0 } },
      { inputs: { A: 0, B: 1 }, outputs: { Sum: 1, Carry: 0 } },
      { inputs: { A: 1, B: 0 }, outputs: { Sum: 1, Carry: 0 } },
      { inputs: { A: 1, B: 1 }, outputs: { Sum: 0, Carry: 1 } },
    ],
  },
};

export const HalfAdderCircuit = buildCircuit(halfAdderExperiment);
export const HalfAdderContent = buildLabContent(halfAdderExperiment);
```

---

## Adding a new component type (geometry)

Only needed when a part type has no Three.js builder yet.

### 1. Add the type variant to `src/labs/types.ts`

```ts
| { id: string; type: 'my-part'; someField: number; mountedAt: MountPoint }
```

### 2. Write the geometry builder in `src/components/my-part/index.ts`

```ts
import * as THREE from "three";
import { PITCH, BOARD_H, TOP_Y } from "@/labs/coords";
import { M } from "@/components/shared/materials";
import { solidBox, solidCyl } from "@/components/shared/primitives";

export function buildMyPart(
  mountPos: THREE.Vector3,
  someField: number,
): THREE.Group {
  const root = new THREE.Group();
  // White/cream fill + M.edge() wireframe. Leads use M.gold().
  return root;
}

export function buildMyPartStandalone(someField: number): THREE.Group {
  return buildMyPart(new THREE.Vector3(0, 0, 0), someField);
}
```

Export from `src/components/index.ts`.

For marketing cards, also add a case in `src/labs/previews/EceComponentViewer.tsx`.

### 3. Wire it in `src/labs/LabScene.tsx` → `buildInstance()`

```ts
case 'my-part': {
  const { col, row } = inst.mountedAt;
  return buildMyPart(hole(col, row), inst.someField);
}
```

No changes to the renderer loop beyond this switch.

### 4. Optional: 3D markers in theory content

If theory sections need annotated 3D positions, use `@/labs/marker-helpers` (no Three.js import — safe for SSR):

```ts
import { holePos, resistorP1, TOP_Y } from "@/labs/marker-helpers";

export const M = {
  r1_p1: [resistorP1(5, "c")[0], TOP_Y + 0.55, resistorP1(5, "c")[2]] as [
    number,
    number,
    number,
  ],
};
```

---

## Column layout guide

```
cols  1–3   : input tie-points (A, B, Cin…)
cols  4–10  : first IC (7 cols + 2 gap)
cols 11–17  : second IC
cols 18–24  : third IC (if needed)
cols 22–25  : first resistor + LED pair
cols 26–29  : second resistor + LED pair
col  30     : do not use (board edge)
```

IC rows: always `e` (straddles centre gap).
Passive/LED rows: `c` (clear of ICs).
Input tie-points: rows `a` and `b`.

---

## Constraints for valid output

- Every `id` in `show[]` must exist in `components`
- `show[]` is cumulative — never shrinks between steps
- Each IC needs 7 free columns — check for overlaps
- Resistor at col N → its LED at col N+2
- Always end with ground wires from each LED cathode to `gnd_top`
- `activeInputs` keys must match `truthTable.inputs` when both are present
- Last step's `show[]` must contain every component id including all wires
- Experiment `id` must be unique across semester catalog and legacy circuits

---

## Quick prompt for LLMs

> Generate a complete semester experiment folder for **\<title\>**.
> Output: `components.ts`, `04-procedure/*.ts`, section stubs, and `index.ts`.
> Follow the schema in COMPONENTS.md. Register nothing — I will add it to `catalog.ts` myself.
