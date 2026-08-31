---
name: build-experiment
description: Use when creating or fixing a VLabs virtual electronics experiment. This covers creating circuit definitions, content files (theory/apparatus/procedure/observations/conclusion), lab page routes, registering circuits, and updating the explore page. Use for any task involving breadboard circuits, analog/digital lab experiments, 3D component rendering, or simulation wiring.
---

# Build a VLabs Experiment

This skill covers the complete workflow for creating or fixing an interactive virtual electronics lab experiment in the VLabs project.

## Project Structure

```
src/labs/
  circuits/<name>/index.ts    — Circuit definition (components + steps + truthTable)
  content/<name>.ts            — Lab content (theory, apparatus, procedure, observations, conclusion)
  types.ts                     — All TypeScript types for Circuit, ComponentInstance, Step, etc.
  simulate.ts                  — Circuit simulator (digital gates only)
  netlist.ts                   — Union-find breadboard netlist
  LabScene.tsx                 — 3D Three.js renderer for procedure steps
  TheoryScene.tsx              — 2D schematic renderer for theory tab
  ApparatusScene.tsx           — 3D component carousel for apparatus tab
  LabPage.tsx                  — Full lab page layout
  geometry/                    — All 3D geometry builders
  logic/                       — Gate/arith/mux/sequential evaluation
  coords.ts                    — Breadboard coordinate system

src/app/labs/<name>/page.tsx   — Next.js route for the lab
src/sections/explore/explore.data.ts — Explore page experiment registry
```

## The 4 Layers of an Experiment

### Layer 1: Circuit Definition (`circuits/<name>/index.ts`)

```ts
import { type Circuit } from '@/labs/types';

export const MyCircuit: Circuit = {
  id: 'my-circuit',           // must be unique, matches circuitId in content
  title: 'My Circuit Title',
  description: 'One paragraph description.',
  components: [ ... ],        // ComponentInstance[]
  steps: [ ... ],             // Step[] — progressive assembly
  truthTable: { ... },        // optional, for digital circuits only
};
```

#### Component Types That RENDER in 3D

These types have geometry builders in LabScene.tsx and will actually appear:

| Type | Geometry | Notes |
|------|----------|-------|
| `breadboard` | Full 30-col board | Always first component, id='bb' |
| `resistor` | Body + colour bands + leads | `ohms` field, spans p1=col to p2=col+3 |
| `led` | Dome + body + leads, GLOWS when on | `color` field, anode=col, cathode=col+1 |
| `capacitor` | Electrolytic cylinder | `capacitance` field |
| `wire` | Catenary curve | `color`, `from`, `to` PinRefs |
| `and-gate` | DIP-14 IC | Pins: A(col+0), B(col+1), Y(col+2) |
| `or-gate` | DIP-14 IC | Same pin layout |
| `not-gate` | DIP-14 IC | Pins: A(col+0), Y(col+1) |
| `nand-gate` | DIP-14 IC | Same as and-gate |
| `nor-gate` | DIP-14 IC | Same as and-gate |
| `xor-gate` | DIP-14 IC | Same as and-gate |
| `xnor-gate` | DIP-14 IC | Same as and-gate |
| `buffer-gate` | DIP-14 IC | Same as and-gate |
| `dc-jack` | DC Power Supply model beside board | Rendered to the LEFT of breadboard |
| `battery` | DC Power Supply model beside board | Same as dc-jack |

#### Component Types That ARE DEFINED but do NOT render (return null)

These exist in `types.ts` but `LabScene.tsx` returns null for them. They can be used in circuits but won't appear visually:

`diode`, `zener`, `npn-bjt`, `pnp-bjt`, `n-mosfet`, `p-mosfet`, `op-amp`, `potentiometer`, `push-button`, `switch`, `dip-switch`, `7seg-display`, `rgb-led`, `clock`, `cpu-8085`, `ppi-8255`, `bus-transceiver`, `address-latch`, all reduce gates, all virtual arithmetic/mux/bus/shift components, `register-*`, `counter-*`, `dff`, `jk-ff`, `sr-latch`, `input-node`, `output-node`, `constant`

#### PinRef Types for Wire Connections

```ts
// Breadboard hole
{ board: 'bb', col: 5, row: 'c' }

// Power rail
{ board: 'bb', rail: 'vcc_top' | 'gnd_top' | 'vcc_bot' | 'gnd_bot', col: 5 }

// IC gate pin
{ ic: 'gate_id', pin: 'A' | 'B' | 'Y' }

// Resistor/capacitor/inductor lead
{ component: 'r1', end: 'p1' | 'p2' }

// LED anode/cathode
{ led: 'led1', end: 'anode' | 'cathode' }
```

#### Wire Naming Convention (CRITICAL for simulation)

Input wire IDs MUST follow: `w_<inputName>_<target>`

The simulator extracts the input name from the wire ID: `w_a_xor1` → input name `a` → maps to `activeInputs.A`.

#### Steps Array

```ts
{
  title: 'Step title',
  body: 'Detailed instruction text.',
  show: ['bb', 'r1', 'w_vcc'],   // cumulative list of visible component IDs
  highlight: 'r1',                // optional, component to highlight
  activeInputs: { A: 1, B: 0 },  // optional, drives simulation
}
```

Steps are CUMULATIVE — each `show` array must include all previously shown components plus new ones.

#### LED Glow Behavior

- **Digital circuits**: LEDs glow based on `simulate()` output. The simulator evaluates gates and determines HIGH/LOW on each net.
- **Analog circuits**: LEDs glow when ANY `activeInputs` value is 1 AND the simulator produces no results (no gate ICs found). This means: set `activeInputs: { Vcc: 1 }` on sweep/measurement steps to make LEDs glow.

#### Breadboard Coordinate System

- PITCH = 0.22 (hole spacing)
- 30 columns (col 1–30)
- Rows a–e = TOP bank, rows f–j = BOTTOM bank
- Centre gap between row e and row f isolates the two banks
- Resistors span 4 columns: p1=col, p2=col+3
- LEDs span 2 columns: anode=col, cathode=col+1
- DIP-14 ICs straddle the centre gap at mountedAt row 'e'
- Top bank rows share column nets (same col, rows a–e = 1 net)
- Bottom bank rows share column nets (same col, rows f–j = 1 net)
- DO NOT place components in the same column if they should be on different nets

### Layer 2: Content File (`content/<name>.ts`)

```ts
import { type LabContent } from '@/labs/lab-content.types';

export const MyContent: LabContent = {
  id: 'my-circuit',
  title: 'My Circuit Title',
  circuitId: 'my-circuit',   // MUST match the Circuit.id exactly
  sections: [
    // 1. Theory (type: 'text')
    // 2. Apparatus (type: 'apparatus')
    // 3. Procedure (type: 'procedure')
    // 4. Observations (type: 'observation')
    // 5. Conclusion (type: 'conclusion')
  ],
};
```

#### Theory Section

```ts
{
  id: 'theory', type: 'text', title: 'Theory',
  schematic: THEORY_SCHEMATIC,  // optional 2D schematic
  paragraphs: [
    'Paragraph with **bold**, *italic*, $inline math$, $$display math$$.',
    // At least 3-4 substantive paragraphs
  ],
}
```

SchematicSpec elements: `wire`, `resistor`, `zener`, `battery`, `meter` (V/A), `node`, `label`, `gnd`, `current` (arrow).

#### Apparatus Section

```ts
{
  id: 'apparatus', type: 'apparatus', title: 'Apparatus Required',
  items: [
    {
      name: 'Component Name',
      specification: 'Detailed spec with $math$',
      quantity: '1',
      callouts: [
        { pos: [x, y, z], label: 'Part label' },  // 3D callout arrows
      ],
    },
  ],
}
```

#### Procedure Section (CRITICAL alignment with circuit)

```ts
{
  id: 'procedure', type: 'procedure', title: 'Procedure',
  steps: [
    {
      label: 'Short label for sidebar.',
      circuitStepIndex: 0,  // MUST be valid index into circuit.steps[]
      body: 'Detailed body with $math$. Can use \\n for newlines.',
      markers: [             // optional bobbing arrows
        { pos: [x, y, z], dir: [0, -1, 0], label: 'Arrow label' },
      ],
    },
  ],
}
```

**ALIGNMENT RULE**: Each procedure step's `circuitStepIndex` controls which 3D scene state is shown. Assembly steps should point to the circuit step where the component is first shown. Measurement/recording steps should point to the LAST circuit step (fully assembled circuit).

#### Observations Section

```ts
{
  id: 'observations', type: 'observation', title: 'Observations',
  paragraphs: ['Summary text with $math$.'],
  table: {
    headers: ['$V_s$ (V)', '$V_Z$ (V)', '$I_Z$ (mA)', 'Region'],
    rows: [
      [0.0, '0.00', '0.00', 'Off'],
      [1.0, '0.62', '0.80', 'Forward active'],
    ],
  },
}
```

#### Conclusion Section

```ts
{
  id: 'conclusion', type: 'conclusion', title: 'Conclusion',
  paragraphs: [
    'Paragraph 1 summarizing results.',
    'Paragraph 2 with implications.',
    'Paragraph 3 connecting to broader concepts.',
  ],
}
```

### Layer 3: Lab Page Route (`app/labs/<name>/page.tsx`)

```ts
import { MyContent } from '@/labs/content/my-circuit';
import { LabPage } from '@/labs/LabPage';

export const metadata = {
  title: 'My Circuit — VLabs',
  description: 'Interactive virtual lab: My Circuit.',
};

export default function Page() {
  return <LabPage content={MyContent} />;
}
```

### Layer 4: Registration

1. **Circuit registry** (`circuits/index.ts`): Import and add to `ALL_CIRCUITS` array + named exports
2. **Explore data** (`sections/explore/explore.data.ts`): Add experiment entry with matching `circuitId`
3. **Content circuitId**: Must match the circuit's `id` field exactly

## Analog vs Digital Experiments

### Digital (e.g., half-adder, decoder)
- Use gate ICs (`and-gate`, `or-gate`, etc.) with mountedAt
- Wire inputs from TiePin holes to IC pins
- Wire outputs from IC.Y through resistors to LEDs to GND
- Include `truthTable` in circuit
- Set `activeInputs` on test steps — simulator evaluates gates and LEDs glow based on logic
- Content procedure steps map 1:1 to assembly steps

### Analog (e.g., zener-diode, ohms-law)
- Use `resistor`, `led` (as component stand-ins), `wire`, `capacitor`
- Use `dc-jack` or `battery` for power supply model beside breadboard
- Use colored wires to represent instrument connections:
  - Red/black: power supply leads
  - Orange: ammeter leads (series)
  - Blue: voltmeter probes (parallel)
  - Green/purple/white: signal paths
- Set `activeInputs: { Vcc: 1 }` on sweep/measurement steps — this triggers LED glow for ALL visible LEDs (analog fallback)
- No `truthTable`
- Content procedure steps point to circuit step indices for the assembly phase, then to the LAST circuit step for measurement

## Reference: The Zener Diode Experiment

The zener-diode experiment at `circuits/zener-diode/index.ts` and `content/zener-diode.ts` is the gold-standard reference for analog experiments. It demonstrates:

- DC power supply model (`dc-jack` component)
- Ammeter wires (orange) in series
- Voltmeter probes (blue) across the component
- Forward bias assembly (steps 0–8)
- Reverse bias assembly with physically different LED placement and color (steps 9–12)
- LED glow on sweep steps via `activeInputs: { Vcc: 1 }`
- Full theory with 2D schematic (forward + reverse circuits side by side)
- Apparatus with callouts
- Procedure with markers pointing at exact breadboard positions
- Observations with data table
- Conclusion with 3 paragraphs

Read both files completely before building a new experiment.

## Verification Checklist

After creating/modifying an experiment:

1. Circuit `id` matches content `circuitId`
2. All procedure `circuitStepIndex` values are within bounds of circuit `steps[]`
3. All `show` arrays are cumulative (each includes previous)
4. No column conflicts (two components in same col+bank that shouldn't share a net)
5. Wire IDs for inputs follow `w_<inputName>_<gate>` naming
6. Content has all 5 sections (theory, apparatus, procedure, observations, conclusion)
7. Circuit is registered in `circuits/index.ts` ALL_CIRCUITS array
8. Explore data entry has matching `circuitId`
9. Lab page route exists at `app/labs/<name>/page.tsx`
10. `npm run build` succeeds
11. `npm test` passes (266+ tests)
