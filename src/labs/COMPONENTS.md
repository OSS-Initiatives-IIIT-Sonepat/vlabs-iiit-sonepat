# vlabs — Component Reference for AI Circuit Generation

Paste this file into Claude (or any LLM) to generate new circuit definitions.
The output should be a single TypeScript file saved to `src/labs/circuits/<name>/index.ts`.

---

## How to use

1. Paste this entire file into Claude chat
2. Say: `"Generate a Full Subtractor circuit"` (or any other circuit)
3. Save the output to `src/labs/circuits/full-subtractor/index.ts`
4. Add it to `src/labs/circuits/index.ts` in `ALL_CIRCUITS`
5. Done — it renders automatically in the hero preview and at `/labs/<id>`

Human docs: `/docs` in the running app.

---

## Circuit schema

```ts
import { type Circuit } from '@/labs/types';

export const MyCircuit: Circuit = {
  id: 'my-circuit',          // kebab-case, unique
  title: 'My Circuit',       // display name
  description: '...',        // 2–3 sentences explaining what it does

  components: [ /* see below */ ],
  steps: [ /* see below */ ],

  truthTable: {              // optional
    inputs:  ['A', 'B'],
    outputs: ['Sum', 'Carry'],
    rows: [
      { inputs: { A:0, B:0 }, outputs: { Sum:0, Carry:0 } },
      // ...
    ],
  },
};
```

---

## Component types

### Breadboard (always first)
```ts
{ id: 'bb', type: 'breadboard' }
```

### Logic gates (DIP-14, straddle centre gap)
```ts
{ id: 'xor1', type: 'xor-gate',  mountedAt: { board: 'bb', col: 5,  row: 'e' } }
{ id: 'and1', type: 'and-gate',  mountedAt: { board: 'bb', col: 12, row: 'e' } }
{ id: 'or1',  type: 'or-gate',   mountedAt: { board: 'bb', col: 19, row: 'e' } }
{ id: 'not1', type: 'not-gate',  mountedAt: { board: 'bb', col: 5,  row: 'e' } }
{ id: 'nand1',type: 'nand-gate', mountedAt: { board: 'bb', col: 5,  row: 'e' } }
{ id: 'nor1', type: 'nor-gate',  mountedAt: { board: 'bb', col: 5,  row: 'e' } }
```

**Placement rules:**
- Each IC occupies **7 consecutive columns** (it has 7 pins per side)
- Space ICs at least 2 columns apart: if IC1 starts at col 5, IC2 starts at col 14+
- `row: 'e'` always — the IC straddles the centre gap (rows e/f)
- Don't place anything past col 29

### Resistor (current limiting, always before LED)
```ts
{ id: 'r1', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 22, row: 'c' } }
```
- Spans **col → col+3** (4 columns wide, horizontal)
- Use row 'c' for output resistors (keeps them away from IC rows)

### Capacitor
```ts
{ id: 'c1', type: 'capacitor', capacitance: 100, mountedAt: { board: 'bb', col: 5, row: 'c' } }
```
- Spans **col → col+1**
- `capacitance` in µF

### LED (output indicator)
```ts
{ id: 'led1', type: 'led', color: 'green',  mountedAt: { board: 'bb', col: 24, row: 'c' } }
{ id: 'led2', type: 'led', color: 'yellow', mountedAt: { board: 'bb', col: 27, row: 'c' } }
{ id: 'led3', type: 'led', color: 'red',    mountedAt: { board: 'bb', col: 24, row: 'c' } }
{ id: 'led4', type: 'led', color: 'blue',   mountedAt: { board: 'bb', col: 27, row: 'c' } }
```
- Spans **col (anode) → col+1 (cathode)**
- Always place **after** its resistor (resistor at col N → LED at col N+2)

---

## Wire (PinRef) syntax

Every wire has `from` and `to` — both are typed objects, never strings.

### Tie point (breadboard hole)
```ts
{ board: 'bb', col: 3, row: 'a' }   // hole at column 3, row a
```
Valid rows: `a b c d e f g h i j`
Valid cols: `1–30`

### IC pin
```ts
{ ic: 'xor1', pin: 'A' }   // input A of gate xor1  (col+0, row e)
{ ic: 'xor1', pin: 'B' }   // input B of gate xor1  (col+1, row e)
{ ic: 'xor1', pin: 'Y' }   // output Y of gate xor1 (col+2, row e)
```
Pin names: `A`, `B`, `Y` (single gate) or `1A`, `1B`, `1Y`, `2A`, `2B`, `2Y` (dual gate)

### Passive pin (resistor / capacitor)
```ts
{ component: 'r1', end: 'p1' }   // left lead  (col)
{ component: 'r1', end: 'p2' }   // right lead (col+3)
```

### LED pin
```ts
{ led: 'led1', end: 'anode' }    // anode  (col)
{ led: 'led1', end: 'cathode' }  // cathode (col+1)
```

### Power rail
```ts
{ board: 'bb', rail: 'gnd_top', col: 1 }   // ground rail, column 1
{ board: 'bb', rail: 'vcc_top', col: 1 }   // power rail,  column 1
```

### Wire colors
`red` `blue` `orange` `green` `yellow` `white` `black`

Convention:
- Input A = red, Input B = blue, Input C/Cin/Bin = orange
- Internal signals = white
- Sum/Diff output = green, Carry/Borrow = yellow/orange
- Ground = black

---

## Steps schema

```ts
steps: [
  {
    title: 'Place the breadboard',
    body: 'One sentence explanation.',
    show: ['bb'],                    // cumulative — list ALL visible ids so far
    // highlight: 'xor1',           // optional: which component to focus
    // activeInputs: { A:0, B:0 },  // optional: drives I/O panel display
  },
  {
    title: 'Place XOR gate',
    body: 'XOR outputs HIGH when inputs differ.',
    show: ['bb', 'xor1'],
    highlight: 'xor1',
  },
  // ...final step has ALL component ids in show[]
]
```

**Rules for steps:**
- First step: always just `['bb']`
- Each step adds new components to `show[]` — never removes
- Last step: `show` contains every component id, including all wires
- Use `activeInputs` to demonstrate a specific truth table row in the final step
- Aim for 5–7 steps total

---

## Full working example: Half Adder

```ts
import { type Circuit } from '@/labs/types';

export const HalfAdder: Circuit = {
  id: 'half-adder',
  title: 'Half Adder',
  description: 'Adds two 1-bit inputs A and B. Sum = A XOR B, Carry = A AND B.',

  components: [
    { id: 'bb',        type: 'breadboard' },
    { id: 'xor1',      type: 'xor-gate',  mountedAt: { board: 'bb', col: 7,  row: 'e' } },
    { id: 'and1',      type: 'and-gate',  mountedAt: { board: 'bb', col: 16, row: 'e' } },
    { id: 'r_sum',     type: 'resistor',  ohms: 330, mountedAt: { board: 'bb', col: 22, row: 'c' } },
    { id: 'r_carry',   type: 'resistor',  ohms: 330, mountedAt: { board: 'bb', col: 26, row: 'c' } },
    { id: 'led_sum',   type: 'led', color: 'green',  mountedAt: { board: 'bb', col: 24, row: 'c' } },
    { id: 'led_carry', type: 'led', color: 'yellow', mountedAt: { board: 'bb', col: 28, row: 'c' } },

    { id: 'w_a_xor',   type: 'wire', color: 'red',    from: { board:'bb', col:3, row:'a' }, to: { ic:'xor1', pin:'A' } },
    { id: 'w_a_and',   type: 'wire', color: 'red',    from: { board:'bb', col:3, row:'b' }, to: { ic:'and1', pin:'A' } },
    { id: 'w_b_xor',   type: 'wire', color: 'blue',   from: { board:'bb', col:4, row:'a' }, to: { ic:'xor1', pin:'B' } },
    { id: 'w_b_and',   type: 'wire', color: 'blue',   from: { board:'bb', col:4, row:'b' }, to: { ic:'and1', pin:'B' } },
    { id: 'w_xor_r',   type: 'wire', color: 'green',  from: { ic:'xor1', pin:'Y' },          to: { component:'r_sum',   end:'p1' } },
    { id: 'w_r_led',   type: 'wire', color: 'green',  from: { component:'r_sum',   end:'p2' }, to: { led:'led_sum',   end:'anode' } },
    { id: 'w_and_r',   type: 'wire', color: 'orange', from: { ic:'and1', pin:'Y' },          to: { component:'r_carry', end:'p1' } },
    { id: 'w_r_led2',  type: 'wire', color: 'yellow', from: { component:'r_carry', end:'p2' }, to: { led:'led_carry', end:'anode' } },
    { id: 'w_gnd1',    type: 'wire', color: 'black',  from: { led:'led_sum',   end:'cathode' }, to: { board:'bb', rail:'gnd_top', col:1 } },
    { id: 'w_gnd2',    type: 'wire', color: 'black',  from: { led:'led_carry', end:'cathode' }, to: { board:'bb', rail:'gnd_top', col:2 } },
  ],

  steps: [
    { title: 'Place the breadboard', body: 'Your build surface. Columns share a node.', show: ['bb'] },
    { title: 'Place XOR gate',       body: 'XOR produces Sum = A XOR B.',               show: ['bb','xor1'],         highlight: 'xor1' },
    { title: 'Place AND gate',       body: 'AND produces Carry = A AND B.',              show: ['bb','xor1','and1'],  highlight: 'and1' },
    { title: 'Wire inputs',          body: 'Red=A, Blue=B. Both gates share the inputs.',show: ['bb','xor1','and1','w_a_xor','w_a_and','w_b_xor','w_b_and'], activeInputs:{A:0,B:0} },
    { title: 'Add output LEDs',      body: '330Ω resistor in series with each LED.',     show: ['bb','xor1','and1','w_a_xor','w_a_and','w_b_xor','w_b_and','r_sum','r_carry','led_sum','led_carry'], activeInputs:{A:0,B:0} },
    { title: 'Test A=1, B=1',        body: 'Sum=0, Carry=1. Yellow LED on, green off.',  show: ['bb','xor1','and1','w_a_xor','w_a_and','w_b_xor','w_b_and','r_sum','r_carry','led_sum','led_carry','w_xor_r','w_r_led','w_and_r','w_r_led2','w_gnd1','w_gnd2'], highlight:'led_carry', activeInputs:{A:1,B:1} },
  ],

  truthTable: {
    inputs: ['A','B'], outputs: ['Sum','Carry'],
    rows: [
      { inputs:{A:0,B:0}, outputs:{Sum:0,Carry:0} },
      { inputs:{A:0,B:1}, outputs:{Sum:1,Carry:0} },
      { inputs:{A:1,B:0}, outputs:{Sum:1,Carry:0} },
      { inputs:{A:1,B:1}, outputs:{Sum:0,Carry:1} },
    ],
  },
};
```

---

## Adding a new circuit to the app

1. Save file to `src/labs/circuits/<id>/index.ts`
2. Open `src/labs/circuits/index.ts`
3. Add the import and push to `ALL_CIRCUITS`:

```ts
import { MyCircuit } from './<id>';

export const ALL_CIRCUITS: Circuit[] = [
  // ...existing
  MyCircuit,   // ← add here
];

export { MyCircuit };  // ← and here
```

That's it. It appears in the hero preview sidebar and gets its own step-by-step page automatically.

---

## Adding a new component type (geometry + registry)

Only needed if the circuit uses a part that doesn't exist yet (not in the type list above).
This requires THREE file edits — all in `src/labs/`.

### 1. Add the type variant to `types.ts`

```ts
// src/labs/types.ts — add to the ComponentInstance union:
| { id: string; type: 'my-part'; someField: number; mountedAt: MountPoint }
```

### 2. Write the geometry builder

Add to `src/labs/geometry/extra-components.ts` (or a new file):

```ts
import * as THREE from 'three';
import { PITCH, BOARD_H, TOP_Y } from '../coords';
import { M } from './materials';
import { solidBox, solidCyl } from './primitives';

// Board-mounted variant (takes hole position)
export function buildMyPart(mountPos: THREE.Vector3, someField: number): THREE.Group {
  const root = new THREE.Group();
  // Use solidBox / solidCyl / THREE primitives only.
  // White/cream fill + M.edge() wireframe. Leads use M.gold().
  // Position body above TOP_Y; leads hang down to TOP_Y - BOARD_H * 0.3.
  return root;
}

// Standalone variant (centred at origin — for showcase cards)
export function buildMyPartStandalone(someField: number): THREE.Group {
  return buildMyPart(new THREE.Vector3(0, 0, 0), someField);
}
```

Export from `src/labs/geometry/index.ts`:
```ts
export { buildMyPart, buildMyPartStandalone } from './extra-components';
```

### 3. Add the registry entry to `LabScene.tsx`

```ts
// At the top: import { buildMyPart, ... } from './geometry/index';

// In COMPONENT_REGISTRY:
'my-part': (inst) => {
  const p = inst as Extract<ComponentInstance, { type: 'my-part' }>;
  return buildMyPart(hole(p.mountedAt.col, p.mountedAt.row), p.someField);
},
```

That's all. No changes to the renderer loop.

---

## Column layout guide

```
cols  1–3   : input tie-points (A, B, Cin...)
cols  4–10  : first IC (7 cols + 2 gap = 9)
cols 11–17  : second IC
cols 18–24  : third IC (if needed)
cols 22–25  : first resistor + LED pair
cols 26–29  : second resistor + LED pair
col  30     : do not use (board edge)
```

IC rows: always `e` (straddles centre gap).
Passive/LED rows: always `c` (clear of ICs).
Input tie-points: rows `a` and `b`.

---

## Constraints for valid output

- Every `id` in `show[]` must exist in `components`
- `show[]` is cumulative — never shrinks between steps
- Each IC needs 7 free columns — check for overlaps
- Resistor at col N → its LED at col N+2 (not N+1, that's the resistor's right lead)
- Always end with a ground wire from each LED cathode to `gnd_top`
- `activeInputs` keys must match `truthTable.inputs` exactly
- Last step's `show[]` must contain every component id including all wires
