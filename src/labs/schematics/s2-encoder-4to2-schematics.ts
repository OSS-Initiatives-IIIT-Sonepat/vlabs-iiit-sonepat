import { type SchematicData } from "@/labs/CircuitSchematic";

/*
 * S2 4:2 Priority Encoder
 * A = I2 + I3, B = I1 + I3
 */

const W = 400;
const H = 280;

/** Step 1: Setup breadboard */
export const step01: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "label",
      id: "title",
      x: 200,
      y: 20,
      text: "Step 1: Breadboard Setup",
    },
    { type: "vsource", id: "vcc", x: 60, y: 100, label: "+5V" },
    { type: "ground", id: "gnd", x: 60, y: 180 },
    {
      type: "wire",
      id: "w1",
      points: [
        { x: 60, y: 80 },
        { x: 340, y: 80 },
      ],
      highlight: true,
    },
    {
      type: "wire",
      id: "w2",
      points: [
        { x: 60, y: 180 },
        { x: 340, y: 180 },
      ],
      highlight: true,
    },
    {
      type: "label",
      id: "desc",
      x: 200,
      y: 250,
      text: "4:2 Encoder: 4 inputs → 2-bit binary code",
    },
  ],
};

/** Step 2: Wire OR gates for outputs A and B */
export const step02: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "label",
      id: "title",
      x: 200,
      y: 20,
      text: "Step 2: OR Gates for A, B",
    },
    { type: "label", id: "eqa", x: 200, y: 55, text: "A (MSB) = I2 + I3" },
    { type: "label", id: "eqb", x: 200, y: 80, text: "B (LSB) = I1 + I3" },
    { type: "or-gate", id: "or1", x: 200, y: 140, label: "A", highlight: true },
    { type: "or-gate", id: "or2", x: 200, y: 210, label: "B", highlight: true },
    {
      type: "wire",
      id: "wi2a",
      points: [
        { x: 60, y: 132 },
        { x: 174, y: 132 },
      ],
    },
    {
      type: "wire",
      id: "wi3a",
      points: [
        { x: 60, y: 148 },
        { x: 174, y: 148 },
      ],
    },
    {
      type: "wire",
      id: "wi1b",
      points: [
        { x: 60, y: 202 },
        { x: 174, y: 202 },
      ],
    },
    {
      type: "wire",
      id: "wi3b",
      points: [
        { x: 60, y: 218 },
        { x: 174, y: 218 },
      ],
    },
    { type: "label", id: "li2", x: 45, y: 132, text: "I2" },
    { type: "label", id: "li3a", x: 45, y: 148, text: "I3" },
    { type: "label", id: "li1", x: 45, y: 202, text: "I1" },
    { type: "label", id: "li3b", x: 45, y: 218, text: "I3" },
    {
      type: "label",
      id: "desc",
      x: 200,
      y: 260,
      text: "Only 2 OR gates needed (74HC32)",
    },
  ],
};

/** Step 3: Connect all input lines */
export const step03: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "label",
      id: "title",
      x: 200,
      y: 20,
      text: "Step 3: Wire Input Lines",
    },
    { type: "label", id: "li0", x: 40, y: 60, text: "I0" },
    { type: "label", id: "li1", x: 40, y: 100, text: "I1" },
    { type: "label", id: "li2", x: 40, y: 140, text: "I2" },
    { type: "label", id: "li3", x: 40, y: 180, text: "I3" },
    {
      type: "wire",
      id: "wi0",
      points: [
        { x: 55, y: 60 },
        { x: 200, y: 60 },
      ],
    },
    {
      type: "wire",
      id: "wi1",
      points: [
        { x: 55, y: 100 },
        { x: 200, y: 100 },
      ],
      highlight: true,
    },
    {
      type: "wire",
      id: "wi2",
      points: [
        { x: 55, y: 140 },
        { x: 200, y: 140 },
      ],
      highlight: true,
    },
    {
      type: "wire",
      id: "wi3",
      points: [
        { x: 55, y: 180 },
        { x: 200, y: 180 },
      ],
      highlight: true,
    },
    { type: "junction", id: "ji3", x: 100, y: 180 },
    { type: "label", id: "note0", x: 280, y: 60, text: "→ (not used)" },
    { type: "label", id: "note1", x: 280, y: 100, text: "→ OR (B)" },
    { type: "label", id: "note2", x: 280, y: 140, text: "→ OR (A)" },
    { type: "label", id: "note3", x: 280, y: 180, text: "→ OR (A,B)" },
    {
      type: "label",
      id: "desc",
      x: 200,
      y: 240,
      text: "I3 connects to BOTH OR gates",
    },
  ],
};

/** Step 4: Test each input individually */
export const step04: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "label",
      id: "title",
      x: 200,
      y: 20,
      text: "Step 4: Test Individual Inputs",
    },
    { type: "label", id: "header", x: 200, y: 55, text: "Input | A B | Code" },
    { type: "label", id: "r0", x: 200, y: 85, text: "I0=1  | 0 0 |  00" },
    { type: "label", id: "r1", x: 200, y: 110, text: "I1=1  | 0 1 |  01" },
    { type: "label", id: "r2", x: 200, y: 135, text: "I2=1  | 1 0 |  10" },
    { type: "label", id: "r3", x: 200, y: 160, text: "I3=1  | 1 1 |  11" },
    {
      type: "label",
      id: "note",
      x: 200,
      y: 200,
      text: "Each input produces unique binary code",
    },
    {
      type: "label",
      id: "desc",
      x: 200,
      y: 240,
      text: "Verify LEDs show correct output",
    },
  ],
};

/** Step 5: Test priority with simultaneous inputs */
export const step05: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "label",
      id: "title",
      x: 200,
      y: 20,
      text: "Step 5: Priority Behavior",
    },
    {
      type: "label",
      id: "test1",
      x: 200,
      y: 60,
      text: "Test: I1=1 AND I3=1 simultaneously",
    },
    { type: "or-gate", id: "or1", x: 160, y: 120, label: "A" },
    { type: "or-gate", id: "or2", x: 160, y: 190, label: "B" },
    {
      type: "wire",
      id: "wi3a",
      points: [
        { x: 60, y: 112 },
        { x: 134, y: 112 },
      ],
    },
    {
      type: "wire",
      id: "wi2",
      points: [
        { x: 60, y: 128 },
        { x: 134, y: 128 },
      ],
    },
    {
      type: "wire",
      id: "wi1",
      points: [
        { x: 60, y: 182 },
        { x: 134, y: 182 },
      ],
    },
    {
      type: "wire",
      id: "wi3b",
      points: [
        { x: 60, y: 198 },
        { x: 134, y: 198 },
      ],
    },
    { type: "label", id: "li3", x: 45, y: 112, text: "I3=1" },
    { type: "label", id: "li1", x: 45, y: 182, text: "I1=1" },
    {
      type: "wire",
      id: "woa",
      points: [
        { x: 186, y: 120 },
        { x: 280, y: 120 },
      ],
    },
    {
      type: "wire",
      id: "wob",
      points: [
        { x: 186, y: 190 },
        { x: 280, y: 190 },
      ],
    },
    { type: "label", id: "ra", x: 300, y: 120, text: "A=1" },
    { type: "label", id: "rb", x: 300, y: 190, text: "B=1" },
    {
      type: "label",
      id: "result",
      x: 200,
      y: 250,
      text: "Output = 11 (I3 has highest priority)",
    },
  ],
};

export const s2Encoder4to2StepSchematics: SchematicData[] = [
  step01,
  step02,
  step03,
  step04,
  step05,
];

export const s2Encoder4to2TheoryDiagram: SchematicData = {
  width: 400,
  height: 280,
  elements: [
    { type: "label", id: "title", x: 200, y: 20, text: "4:2 Priority Encoder" },
    // Inputs
    { type: "label", id: "li0", x: 30, y: 60, text: "I0" },
    { type: "label", id: "li1", x: 30, y: 100, text: "I1" },
    { type: "label", id: "li2", x: 30, y: 140, text: "I2" },
    { type: "label", id: "li3", x: 30, y: 180, text: "I3" },
    // OR gates
    { type: "or-gate", id: "or1", x: 200, y: 120, label: "A" },
    { type: "or-gate", id: "or2", x: 200, y: 180, label: "B" },
    // Wiring
    {
      type: "wire",
      id: "wi2",
      points: [
        { x: 45, y: 140 },
        { x: 140, y: 140 },
        { x: 140, y: 112 },
        { x: 174, y: 112 },
      ],
    },
    {
      type: "wire",
      id: "wi3",
      points: [
        { x: 45, y: 180 },
        { x: 100, y: 180 },
      ],
    },
    { type: "junction", id: "ji3", x: 100, y: 180 },
    {
      type: "wire",
      id: "wi3a",
      points: [
        { x: 100, y: 180 },
        { x: 100, y: 128 },
        { x: 174, y: 128 },
      ],
    },
    {
      type: "wire",
      id: "wi1",
      points: [
        { x: 45, y: 100 },
        { x: 120, y: 100 },
        { x: 120, y: 172 },
        { x: 174, y: 172 },
      ],
    },
    {
      type: "wire",
      id: "wi3b",
      points: [
        { x: 100, y: 180 },
        { x: 100, y: 188 },
        { x: 174, y: 188 },
      ],
    },
    // Outputs
    {
      type: "wire",
      id: "woa",
      points: [
        { x: 226, y: 120 },
        { x: 320, y: 120 },
      ],
    },
    {
      type: "wire",
      id: "wob",
      points: [
        { x: 226, y: 180 },
        { x: 320, y: 180 },
      ],
    },
    { type: "label", id: "la", x: 340, y: 120, text: "A (MSB)" },
    { type: "label", id: "lb", x: 340, y: 180, text: "B (LSB)" },
    // Equations
    { type: "label", id: "eq1", x: 200, y: 230, text: "A = I2 + I3" },
    { type: "label", id: "eq2", x: 200, y: 255, text: "B = I1 + I3" },
  ],
};
