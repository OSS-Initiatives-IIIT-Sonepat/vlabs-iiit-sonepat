# VLabs — Agent Skills

Use this file when an LLM agent (Cursor, chatbot, CI bot) must **author or extend a lab experiment** from minimal input — e.g. a syllabus line, experiment title, or PDF excerpt — without the user typing file paths or schema details.

**Placement rules, column layout, worked examples:** [`src/labs/COMPONENTS.md`](src/labs/COMPONENTS.md)  
**TypeScript source of truth:** [`src/labs/types.ts`](src/labs/types.ts) → `ComponentInstance`, `PinRef`, `Step`, `TruthTable`  
**Canonical working examples:** copy structure from existing folders under `src/labs/semesters/`.

---

## Component & API reference

Use this section to pick types and fields. Use `COMPONENTS.md` for layout diagrams and copy-paste examples.

### Shared fields (all placed parts)

```ts
type Row = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j"; // cols 1–30 (`breadboard`) or 1–60 (`long-breadboard`)
type MountPoint = { board: string; col: number; row: Row };
```

Every BOM entry has a unique string `id` (used in `show[]`, wires, `highlight`, `readings`).

### PinRef — wire endpoints (`from` / `to`)

| Form         | Example                                    | Use                                                |
| ------------ | ------------------------------------------ | -------------------------------------------------- |
| Tie hole     | `{ board: 'bb', col: 3, row: 'a' }`        | Breadboard hole                                    |
| Power rail   | `{ board: 'bb', rail: 'gnd_top', col: 1 }` | `vcc_top` / `gnd_top` / `vcc_bot` / `gnd_bot`      |
| IC pin       | `{ ic: 'xor1', pin: 'A' }`                 | Gate input/output (`A`, `B`, `Y` or `1A`, `1Y`, …) |
| Resistor/cap | `{ component: 'r1', end: 'p1' }`           | `p1` = mount col, `p2` = far end                   |
| LED          | `{ led: 'led1', end: 'anode' }`            | `anode` = col, `cathode` = col+1                   |

```ts
{ id: 'w1', type: 'wire', color: 'red', from: { board:'bb', col:3, row:'a' }, to: { ic:'xor1', pin:'A' } }
```

Wire colors: `red` `blue` `orange` `green` `yellow` `white` `black` `purple`  
Convention: A=red, B=blue, Cin=orange, sum=green, carry=yellow, gnd=black.

### 3D-visible on breadboard (`LabScene.tsx`)

These types **render** in the lab UI. Prefer only these in `show[]` unless you add geometry.

| `type`                     | Required fields                                     | Footprint / notes                                                                                                                        |
| -------------------------- | --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `breadboard`               | —                                                   | 30 columns; `{ id: 'bb', type: 'breadboard' }` first in BOM                                                                              |
| `long-breadboard`          | —                                                   | 60 columns; same rows/rails as `breadboard` — use for wide circuits (cols > 30)                                                          |
| `wire`                     | `from`, `to`, `color`                               | One wire = one component                                                                                                                 |
| `resistor`                 | `ohms`, `mountedAt`                                 | Spans col → col+3                                                                                                                        |
| `capacitor`                | `capacitance` (µF), `mountedAt`                     | Spans col → col+1                                                                                                                        |
| `led`                      | `color`, `mountedAt`                                | Spans col (anode) → col+1; use for outputs **and diode stand-ins**                                                                       |
| `not-gate` … `buffer-gate` | `mountedAt`                                         | DIP-14 at row **`e`**, 7 cols; types: `not-gate`, `and-gate`, `or-gate`, `nand-gate`, `nor-gate`, `xor-gate`, `xnor-gate`, `buffer-gate` |
| `dc-jack`                  | `mountedAt`, optional `terminals: [PinRef, PinRef]` | Bench PSU or AC source; **DO NOT USE WIRES to connect it.** Use `terminals` to connect straight to rails/holes.                          |
| `battery`                  | same as `dc-jack`                                   | Same builder as PSU                                                                                                                      |
| `potentiometer`            | `mountedAt`, optional `probes: [PinRef, PinRef]`    | Renders as **bench multimeter**; not a trimpot. **DO NOT USE WIRES.** Use `probes` to test two points.                                   |
| `ammeter`                  | `mountedAt`, `probes: [PinRef, PinRef]`             | 0–100 mA panel meter (blue body). **DO NOT USE WIRES.** Use `probes` to connect in series.                                               |
| `voltmeter`                | `mountedAt`, `probes: [PinRef, PinRef]`             | 0–15 V DC panel meter (grey body). **DO NOT USE WIRES.** Use `probes` to connect across components.                                      |
| `oscilloscope`             | `mountedAt`, `probes: [PinRef, PinRef]`             | CRO with green screen. **DO NOT USE WIRES.** Use `probes` for CH1 and GND.                                                               |
| `function-generator`       | `mountedAt`, `probes: [PinRef, PinRef]`             | Signal generator. **DO NOT USE WIRES.** Use `probes` for OUTPUT and GND.                                                                 |
| `logic-analyser`           | `mountedAt`, `probes: [PinRef, PinRef]`             | Logic analyzer instrument.                                                                                                               |
| `transformer`              | `mountedAt`, `terminals: [PinRef, PinRef]`          | AC transformer source.                                                                                                                   |
| `mcu-trainer`              | `mountedAt`                                         | Microcontroller trainer board.                                                                                                           |
| `diode` / `zener`          | `mountedAt`                                         | Spans col (anode) → col+3 (cathode).                                                                                                     |
| `npn-bjt` / `pnp-bjt`      | `mountedAt`                                         | 3 pins: B (col), C (col+1), E (col+2).                                                                                                   |
| `n-mosfet` / `p-mosfet`    | `mountedAt`                                         | 3 pins: G (col), D (col+1), S (col+2).                                                                                                   |
| `op-amp`                   | `mountedAt`                                         | DIP-8 package, spans 4 columns, straddles centre gap.                                                                                    |
| `7seg-display`             | `mountedAt`                                         | DIP-10 7-segment display.                                                                                                                |
| `switch` / `push-button`   | `mountedAt`                                         | Slide switch or tactile push-button.                                                                                                     |
| `dip-switch`               | `mountedAt`, `poles: number`                        | DIP switch.                                                                                                                              |

**Visual stand-ins:** In the past, diodes / Zeners used `type: 'led'` (e.g. yellow for signal diode, red for reverse-biased Zener) as stand-ins. They now have dedicated 3D meshes. Theory schematics can use `{ type: 'zener', … }` inside `TheorySection.schematic`.

**Placement quick rules:** ICs row `e`, ≥2 col gap; passives/LEDs row `c`; resistor at col N → LED at col N+2; last wire in every `show[]`; gnd from each LED cathode to `gnd_top`.

### Sim schema only (in `types.ts` + netlist — no 3D mesh yet)

> [!WARNING]
> **3D Rendering Limitations:** The components listed below are **simulation-only**. They will function in logic/circuit simulations, but **`LabScene` returns null** so they are completely invisible on the 3D breadboard.
> Do not use these in standard breadboard labs unless you first build a corresponding physical 3D mesh in `src/components/` and wire it up in `LabScene.tsx`.

| Group               | `type` values                                                                                                                |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Passives / analog   | `inductor`                                                                                                                   |
| Reduce / arithmetic | `and-reduce`, `or-reduce`, …, `adder`, `adder-4bit`, `subtractor`, `multiplier`, `negator`, `compare-*`                      |
| Shift / bus         | `shift-left`, `shift-right`, `zero-extend`, `sign-extend`, `bus-slice`, `bus-group`, `bus-ungroup`                           |
| MUX / decode        | `mux`, `mux-2to1-ic`, `mux-4to1`, `demux-1to4`, `demux-1to8`, `encoder-8to3`, `decoder-3to8`                                 |
| Sequential          | `dff`, `jk-ff`, `sr-latch`, `counter-4bit-async`, `counter-4bit-sync`, `register-4bit`, `register-8bit`, `register-8bit-tri` |
| Bus ICs             | `bus-transceiver`, `address-latch`                                                                                           |
| I/O nodes           | `input-node`, `output-node`, `constant`, `clock`                                                                             |
| Display / MCU       | `rgb-led`, `cpu-8085`, `ppi-8255`                                                                                            |

Extra fields vary — see `ComponentInstance` in `types.ts` (e.g. `bits`, `vz`, `poles`, `terminals`, `net`).

### Procedure step API (`SceneProcedureStep`)

```ts
{
  label: string;           // sidebar heading
  body: string;            // instruction card (supports $...$ math)
  show: string[];          // required — cumulative component ids
  highlight?: string;      // camera focus id
  activeInputs?: Record<string, 0 | 1>;
  supplyVoltage?: number;
  readings?: Record<string, string>;      // e.g. { dmm: '2.4 V' }
  ledBrightness?: Record<string, number>; // 0–1
  markers?: StepMarker[];  // pre-placement arrows (@/labs/LabScene)
}
```

Do **not** use `circuitStepIndex` in new experiments.

### Truth table (optional, digital)

```ts
truthTable: {
  inputs: ['A', 'B'],
  outputs: ['Sum', 'Carry'],
  rows: [{ inputs: { A: 0, B: 0 }, outputs: { Sum: 0, Carry: 0 } }, …],
}
```

Values are `0 | 1` only. Keys must match `activeInputs` when both are used.

### Lab content sections (`LabSection`)

| `type`        | Export shape                                                                                    | Notes                                                                                |
| ------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `text`        | `{ id, type:'text', title, paragraphs[] }`                                                      | Optional `schematic` for TheoryScene                                                 |
| `apparatus`   | `{ id, type:'apparatus', title, items[] }`                                                      | `items: { name, specification?, quantity? : string, callouts? }`                     |
| `procedure`   | built by `buildLabContent()` from `procedureSteps`                                              | Inserted **after apparatus**, before observations — do not hand-author in `sections` |
| `observation` | `{ paragraphs[], table? }`                                                                      | `table: { headers, rows }`                                                           |
| `conclusion`  | `{ paragraphs[] }`                                                                              |                                                                                      |
| `code-lab`    | `{ type:'code-lab', language:'8085', starterCode, description, memoryInit?, expectedOutputs? }` | `labType: 'code'`                                                                    |
| `simulation`  | `{ type:'simulation', simType, description? }`                                                  | `simType`: `alu` \| `memory` \| `cache-direct` \| `cache-assoc` \| `cpu` \| `fsm`    |

### ExperimentDefinition (`index.ts`)

```ts
{
  id: string;              // slug = folder name
  title: string;
  description: string;
  components: ComponentInstance[];
  sections: LabSection[];  // no procedure section — added by buildLabContent
  procedureSteps: SceneProcedureStep[];
  truthTable?: TruthTable;
  labType?: 'breadboard' | 'text' | 'code' | 'simulation';  // default breadboard
}
```

Build exports: `buildCircuit(experiment)` → `Circuit`; `buildLabContent(experiment)` → `LabContent`.

---

## What this repo is

VLabs is a Next.js virtual-lab app. Each **experiment** is data (TypeScript), not a separate page:

| Layer           | Path                             | Role                                 |
| --------------- | -------------------------------- | ------------------------------------ |
| 3D geometry     | `src/components/{type}/`         | How parts render (Three.js builders) |
| Experiment data | `src/labs/semesters/.../<slug>/` | BOM, procedure, theory, registration |
| Registries      | `src/labs/semesters/catalog.ts`  | Explore + `/labs/<slug>`             |
| Route           | `src/app/labs/[slug]/page.tsx`   | One dynamic route for all labs       |

`src/labs/circuits/` and `src/labs/content/` are **thin re-exports** only (`ALL_CIRCUITS` / `ALL_CONTENTS` → semester tree). **Do not add legacy split circuit/content files.**

---

## When to read what

| Goal                                      | Read                                                                             |
| ----------------------------------------- | -------------------------------------------------------------------------------- |
| Pick component `type` + fields            | **This file → Component & API reference**                                        |
| Column layout, wire examples, constraints | `src/labs/COMPONENTS.md`                                                         |
| Full `ComponentInstance` union            | `src/labs/types.ts`                                                              |
| Experiment / section types                | `src/labs/experiments/types.ts`, `src/labs/lab-content.types.ts`                 |
| Breadboard example                        | `src/labs/semesters/semester-01/02-computer-application/half-adder/`             |
| Analog + markers                          | `src/labs/semesters/semester-01/01-analog-electronics/zener-diode/`              |
| Code lab (8085)                           | `src/labs/semesters/semester-04/01-8085-assembly-programming/8085-add-sub-8bit/` |
| Simulation lab                            | `src/labs/semesters/semester-03/02-memory-cpu-systems/alu-simulation/`           |
| Text-only theory lab                      | `src/labs/semesters/semester-03/01-combinational-arithmetic/cla-adder/`          |
| Register in explore                       | `src/labs/semesters/catalog.ts`                                                  |
| Subject list / tags                       | `src/labs/semesters/catalog.ts` → `SEMESTER_SUBJECTS`                            |

---

## Semester tree layout

```
src/labs/semesters/
  semester-01/01-analog-electronics/
  semester-01/02-computer-application/
  semester-01/03-analog-electronics-advanced/
  semester-02/01-digital-electronics/
  semester-02/02-advanced-adders/
  semester-02/03-combinational-logic/
  semester-02/04-sequential-logic/
  semester-02/05-digital-logic-design/
  semester-03/01-combinational-arithmetic/
  semester-03/02-memory-cpu-systems/
  semester-03/03-programming-fundamentals/
  semester-04/01-8085-assembly-programming/
  semester-04/02-peripheral-interfacing/
```

Each experiment folder:

```
<slug>/
  01-aim.ts
  02-theory.ts              # optional
  03-apparatus.ts           # optional
  03-code-lab.ts            # code labs only
  03-simulation.ts          # simulation labs only
  04-procedure/
    01-<step-slug>.ts
    index.ts                # exports procedureSteps[]
  05-observations.ts        # optional
  06-conclusion.ts          # optional
  components.ts             # breadboard labs only (ComponentInstance[])
  constants.ts              # optional 3D marker positions
  index.ts                  # ExperimentDefinition + buildCircuit/buildLabContent
```

---

## Skill: Create a breadboard experiment (default)

**Input you might get:** title, aim, theory bullets, apparatus list, procedure steps, subject/semester.

**Output:** full folder + `catalog.ts` entry.

### 1. Pick slug and path

- `id` / folder name: kebab-case, globally unique (check `catalog.ts` / `SEMESTER_EXPERIMENT_IDS`).
- Slugs starting with digits (e.g. `8085-add-sub-8bit`): export names must be prefixed — `exp8085AddSub8bitExperiment`, `Exp8085AddSub8bitCircuit` (see existing 8085 folders).

### 2. Write `components.ts`

Follow BOM rules in `COMPONENTS.md`:

- Always `{ id: 'bb', type: 'breadboard' }` first.
- Every wire is a component with typed `from` / `to` (`PinRef`).
- ICs at row `e`, 7 columns each, ≥2 col gap.
- Resistor at col N → LED at col N+2.

### 3. Write `04-procedure/*.ts`

Each step is a `SceneProcedureStep`:

```ts
export const step: SceneProcedureStep = {
  label: "…",
  body: "…",
  show: ["bb", "xor1", "w_a_xor"], // cumulative — never remove earlier ids
  highlight: "xor1", // optional
  activeInputs: { A: 0, B: 0 }, // optional (digital)
  supplyVoltage: 5.0, // optional (analog)
  readings: { dmm: "2.4 V" }, // optional
};
```

Last step's `show` must include **every** component id (including all wires).

### 4. Write section files

Export typed sections from `src/labs/lab-content.types.ts` (`TheorySection`, `ApparatusSection`, etc.).

### 5. Write `index.ts`

```ts
export const mySlugExperiment: ExperimentDefinition = {
  id: 'my-slug',
  title: '…',
  description: '…',
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
  truthTable: { … },  // optional, digital labs
};

export const MySlugCircuit = buildCircuit(mySlugExperiment);
export const MySlugContent = buildLabContent(mySlugExperiment);
```

### 6. Register in `catalog.ts`

Import the three exports and add to the correct subject's `experiments`:

```ts
fromBuilt(mySlugExperiment, MySlugCircuit, MySlugContent, ['tag1', 'tag2']),
```

`SEMESTER_CIRCUITS`, `SEMESTER_CONTENTS`, and explore data are derived from `SEMESTER_SUBJECTS` — no other registry edits needed.

### 7. Verify

```bash
npm test
npm run build
```

Open `/labs/<slug>` locally.

---

## Skill: Create a non-breadboard lab

Set `labType` on `ExperimentDefinition`:

| `labType`             | UI                     | Extra section file                       | `components` |
| --------------------- | ---------------------- | ---------------------------------------- | ------------ |
| _(omit)_ / breadboard | 3D breadboard lab      | —                                        | full BOM     |
| `text`                | Sidebar sections only  | theory, optional procedure               | `[]`         |
| `code`                | In-browser 8085 editor | `03-code-lab.ts` (`CodeLabSection`)      | `[]`         |
| `simulation`          | ALU / CPU / cache sim  | `03-simulation.ts` (`SimulationSection`) | `[]`         |

Procedure steps for text/code/sim may use `show: []`. `buildLabContent()` omits `circuitId` for non-breadboard types.

Copy an existing lab of the same `labType` from the table in **When to read what**.

---

## Skill: Clone and adapt an existing lab

Fastest path when the user says “like half adder but for X”:

1. Copy nearest neighbor folder under `src/labs/semesters/`.
2. Rename slug in every file; regenerate export names.
3. Replace `components.ts` + `04-procedure/` (keep folder shape).
4. Update theory/apparatus/observations copy.
5. Add `catalog.ts` entry (or move between subjects).
6. Run tests + build.

---

## Skill: Add a new 3D component type

Only when `src/labs/types.ts` has no matching `type`:

1. Add variant to `ComponentInstance` union in `src/labs/types.ts`.
2. Builder in `src/components/<name>/index.ts`; export from `src/components/index.ts`.
3. Case in `src/labs/LabScene.tsx` → `buildInstance()`.
4. Optional: `src/labs/previews/EceComponentViewer.tsx` for marketing cards.

Details: **Adding a new component type** section in `COMPONENTS.md`.

---

## Agent checklist (minimal user input)

When the user gives only a title or syllabus snippet:

- [ ] Infer subject folder from topic (analog / digital / 8085 / simulation).
- [ ] Pick unique kebab-case `id`.
- [ ] Read closest example folder + `COMPONENTS.md` constraints.
- [ ] Generate all section files + procedure steps with valid cumulative `show[]`. Use the Semester Folder Layout (`01-aim.ts`, `components.ts`, etc), NEVER the legacy single-file layout.
- [ ] Do NOT use `type: 'wire'` components for instruments (`dc-jack`, `potentiometer`). Use their built-in `terminals`/`probes` arrays.
- [ ] Wire `index.ts` with `buildCircuit` / `buildLabContent`.
- [ ] Register in `catalog.ts` with 3–6 search tags.
- [ ] Run `npm test` and `npm run build`.
- [ ] Do **not** create per-slug pages under `src/app/labs/` (dynamic route only).
- [ ] Do **not** edit `circuits/index.ts` or `content/index.ts` beyond re-exports.

---

## Prompt template (paste into agent chat)

```
You are working in the VLabs repo. Read SKILLS.md (workflow + component API) and src/labs/COMPONENTS.md (layout examples) first.

Create a complete semester experiment for:
  Title: <title>
  Subject: <e.g. semester-02/03-combinational-logic>
  Type: <breadboard | text | code | simulation>
  Source material: <paste aim/theory/procedure or syllabus excerpt>

Deliver:
  - Full folder under src/labs/semesters/<subject>/<slug>/
  - catalog.ts registration
  - npm test && npm run build passing

Copy patterns from half-adder (digital breadboard) or the closest existing lab.
```

---

## Out of scope for experiment agents

- Marketing sections (`src/sections/`), onboarding, docs site copy — unless explicitly requested.
- Changing simulation engine internals (`src/labs/simulate.ts`, `netlist.ts`) — unless the lab requires new gate types.
- Git commit/push — only when the user asks.
