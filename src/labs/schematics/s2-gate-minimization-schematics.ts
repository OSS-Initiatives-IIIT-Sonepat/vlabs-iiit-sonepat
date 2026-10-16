import { type SchematicData } from "@/labs/CircuitSchematic";

/*
 * S2 Gate-Level Minimization — Two-level vs Multi-level implementations
 * F = AB + AC (two-level) vs F = A(B+C) (multi-level)
 */

const W = 420;
const H = 300;

/** Step 1: Place breadboard */
export const step01: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "label",
      id: "title",
      x: 210,
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
        { x: 60, y: 60 },
        { x: 360, y: 60 },
      ],
      highlight: true,
    },
    {
      type: "wire",
      id: "w2",
      points: [
        { x: 60, y: 180 },
        { x: 60, y: 200 },
        { x: 360, y: 200 },
      ],
      highlight: true,
    },
    {
      type: "label",
      id: "desc",
      x: 210,
      y: 260,
      text: "Power rails for two implementations",
    },
  ],
};

/** Step 2: Place two-level gates (2 AND + 1 OR) */
export const step02: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "label",
      id: "title",
      x: 210,
      y: 20,
      text: "Step 2: Two-Level Gates",
    },
    { type: "label", id: "subtitle", x: 210, y: 50, text: "F1 = AB + AC" },
    {
      type: "and-gate",
      id: "and1",
      x: 120,
      y: 100,
      label: "AB",
      highlight: true,
    },
    {
      type: "and-gate",
      id: "and2",
      x: 120,
      y: 180,
      label: "AC",
      highlight: true,
    },
    {
      type: "or-gate",
      id: "or1",
      x: 280,
      y: 140,
      label: "F1",
      highlight: true,
    },
    {
      type: "wire",
      id: "w1",
      points: [
        { x: 146, y: 100 },
        { x: 200, y: 100 },
        { x: 200, y: 132 },
        { x: 254, y: 132 },
      ],
    },
    {
      type: "wire",
      id: "w2",
      points: [
        { x: 146, y: 180 },
        { x: 200, y: 180 },
        { x: 200, y: 148 },
        { x: 254, y: 148 },
      ],
    },
    {
      type: "label",
      id: "desc",
      x: 210,
      y: 260,
      text: "2 AND gates + 1 OR gate (3 gates total)",
    },
  ],
};

/** Step 3: Wire two-level inputs */
export const step03: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "label",
      id: "title",
      x: 210,
      y: 20,
      text: "Step 3: Wire Two-Level Inputs",
    },
    { type: "and-gate", id: "and1", x: 160, y: 100 },
    { type: "and-gate", id: "and2", x: 160, y: 180 },
    {
      type: "wire",
      id: "wa1",
      points: [
        { x: 40, y: 92 },
        { x: 134, y: 92 },
      ],
      highlight: true,
    },
    {
      type: "wire",
      id: "wb1",
      points: [
        { x: 40, y: 108 },
        { x: 134, y: 108 },
      ],
      highlight: true,
    },
    {
      type: "wire",
      id: "wa2",
      points: [
        { x: 40, y: 172 },
        { x: 134, y: 172 },
      ],
      highlight: true,
    },
    {
      type: "wire",
      id: "wc2",
      points: [
        { x: 40, y: 188 },
        { x: 134, y: 188 },
      ],
      highlight: true,
    },
    { type: "junction", id: "ja", x: 60, y: 92 },
    {
      type: "wire",
      id: "wa_share",
      points: [
        { x: 60, y: 92 },
        { x: 60, y: 172 },
      ],
    },
    { type: "label", id: "la", x: 25, y: 92, text: "A" },
    { type: "label", id: "lb", x: 25, y: 108, text: "B" },
    { type: "label", id: "lc", x: 25, y: 188, text: "C" },
    {
      type: "label",
      id: "desc",
      x: 210,
      y: 260,
      text: "A shared between both AND gates",
    },
  ],
};

/** Step 4: Connect OR level and F1 output */
export const step04: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "label",
      id: "title",
      x: 210,
      y: 20,
      text: "Step 4: OR Gate and F1 Output",
    },
    { type: "and-gate", id: "and1", x: 120, y: 100 },
    { type: "and-gate", id: "and2", x: 120, y: 180 },
    { type: "or-gate", id: "or1", x: 280, y: 140, highlight: true },
    {
      type: "wire",
      id: "w1",
      points: [
        { x: 146, y: 100 },
        { x: 200, y: 100 },
        { x: 200, y: 132 },
        { x: 254, y: 132 },
      ],
    },
    {
      type: "wire",
      id: "w2",
      points: [
        { x: 146, y: 180 },
        { x: 200, y: 180 },
        { x: 200, y: 148 },
        { x: 254, y: 148 },
      ],
    },
    {
      type: "wire",
      id: "wout",
      points: [
        { x: 306, y: 140 },
        { x: 380, y: 140 },
      ],
      highlight: true,
    },
    { type: "led", id: "led1", x: 380, y: 140, label: "F1" },
    {
      type: "label",
      id: "desc",
      x: 210,
      y: 260,
      text: "F1 = AB + AC output to LED",
    },
  ],
};

/** Step 5: Verify two-level */
export const step05: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "label",
      id: "title",
      x: 210,
      y: 20,
      text: "Step 5: Verify Two-Level Circuit",
    },
    { type: "and-gate", id: "and1", x: 120, y: 100, label: "AB" },
    { type: "and-gate", id: "and2", x: 120, y: 180, label: "AC" },
    { type: "or-gate", id: "or1", x: 280, y: 140, label: "F1" },
    {
      type: "wire",
      id: "w1",
      points: [
        { x: 146, y: 100 },
        { x: 200, y: 100 },
        { x: 200, y: 132 },
        { x: 254, y: 132 },
      ],
    },
    {
      type: "wire",
      id: "w2",
      points: [
        { x: 146, y: 180 },
        { x: 200, y: 180 },
        { x: 200, y: 148 },
        { x: 254, y: 148 },
      ],
    },
    {
      type: "label",
      id: "stats",
      x: 210,
      y: 240,
      text: "3 gates, 4 literals, 2-level delay",
    },
    {
      type: "label",
      id: "desc",
      x: 210,
      y: 270,
      text: "Test all 8 combinations (A,B,C)",
    },
  ],
};

/** Step 6: Place multi-level gates (1 OR + 1 AND) */
export const step06: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "label",
      id: "title",
      x: 210,
      y: 20,
      text: "Step 6: Multi-Level Gates",
    },
    { type: "label", id: "subtitle", x: 210, y: 50, text: "F2 = A(B+C)" },
    {
      type: "or-gate",
      id: "or1",
      x: 140,
      y: 140,
      label: "B+C",
      highlight: true,
    },
    {
      type: "and-gate",
      id: "and1",
      x: 280,
      y: 140,
      label: "F2",
      highlight: true,
    },
    {
      type: "wire",
      id: "w1",
      points: [
        { x: 166, y: 140 },
        { x: 254, y: 140 },
      ],
    },
    {
      type: "label",
      id: "desc",
      x: 210,
      y: 260,
      text: "1 OR gate + 1 AND gate (2 gates total)",
    },
  ],
};

/** Step 7: Wire multi-level */
export const step07: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "label",
      id: "title",
      x: 210,
      y: 20,
      text: "Step 7: Wire Multi-Level",
    },
    { type: "or-gate", id: "or1", x: 140, y: 140 },
    { type: "and-gate", id: "and1", x: 280, y: 140 },
    {
      type: "wire",
      id: "wb",
      points: [
        { x: 40, y: 132 },
        { x: 114, y: 132 },
      ],
      highlight: true,
    },
    {
      type: "wire",
      id: "wc",
      points: [
        { x: 40, y: 148 },
        { x: 114, y: 148 },
      ],
      highlight: true,
    },
    {
      type: "wire",
      id: "wor",
      points: [
        { x: 166, y: 140 },
        { x: 200, y: 140 },
        { x: 200, y: 148 },
        { x: 254, y: 148 },
      ],
    },
    {
      type: "wire",
      id: "wa",
      points: [
        { x: 40, y: 100 },
        { x: 220, y: 100 },
        { x: 220, y: 132 },
        { x: 254, y: 132 },
      ],
      highlight: true,
    },
    { type: "label", id: "la", x: 25, y: 100, text: "A" },
    { type: "label", id: "lb", x: 25, y: 132, text: "B" },
    { type: "label", id: "lc", x: 25, y: 148, text: "C" },
    {
      type: "label",
      id: "desc",
      x: 210,
      y: 260,
      text: "A to AND, B+C from OR to AND",
    },
  ],
};

/** Step 8: Connect F2 indicator */
export const step08: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "label",
      id: "title",
      x: 210,
      y: 20,
      text: "Step 8: F2 Output Indicator",
    },
    { type: "or-gate", id: "or1", x: 140, y: 140 },
    { type: "and-gate", id: "and1", x: 280, y: 140 },
    {
      type: "wire",
      id: "wor",
      points: [
        { x: 166, y: 140 },
        { x: 254, y: 140 },
      ],
    },
    {
      type: "wire",
      id: "wout",
      points: [
        { x: 306, y: 140 },
        { x: 380, y: 140 },
      ],
      highlight: true,
    },
    { type: "led", id: "led2", x: 380, y: 140, label: "F2", highlight: true },
    {
      type: "label",
      id: "stats",
      x: 210,
      y: 240,
      text: "2 gates, 3 literals, 2-level delay",
    },
    {
      type: "label",
      id: "desc",
      x: 210,
      y: 270,
      text: "F2 = A(B+C) output to LED",
    },
  ],
};

/** Step 9: Compare outputs */
export const step09: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "label",
      id: "title",
      x: 210,
      y: 20,
      text: "Step 9: Compare F1 and F2",
    },
    // Two-level
    { type: "and-gate", id: "and1", x: 80, y: 90, label: "AB" },
    { type: "and-gate", id: "and2", x: 80, y: 150, label: "AC" },
    { type: "or-gate", id: "or1", x: 180, y: 120, label: "F1" },
    {
      type: "wire",
      id: "w1a",
      points: [
        { x: 106, y: 90 },
        { x: 130, y: 90 },
        { x: 130, y: 112 },
        { x: 154, y: 112 },
      ],
    },
    {
      type: "wire",
      id: "w1b",
      points: [
        { x: 106, y: 150 },
        { x: 130, y: 150 },
        { x: 130, y: 128 },
        { x: 154, y: 128 },
      ],
    },
    // Multi-level
    { type: "or-gate", id: "or2", x: 280, y: 90, label: "B+C" },
    { type: "and-gate", id: "and3", x: 360, y: 120, label: "F2" },
    {
      type: "wire",
      id: "w2",
      points: [
        { x: 306, y: 90 },
        { x: 320, y: 90 },
        { x: 320, y: 128 },
        { x: 334, y: 128 },
      ],
    },
    {
      type: "label",
      id: "eq",
      x: 210,
      y: 200,
      text: "F1 = F2 for all inputs!",
    },
    {
      type: "label",
      id: "desc",
      x: 210,
      y: 260,
      text: "Both LEDs match: same function, fewer gates",
    },
  ],
};

/** Step 10: Check zero case */
export const step10: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "label",
      id: "title",
      x: 210,
      y: 20,
      text: "Step 10: Zero Output Case",
    },
    { type: "label", id: "inputs", x: 210, y: 60, text: "A=0, B=x, C=x" },
    { type: "and-gate", id: "and1", x: 120, y: 120, label: "AB=0" },
    { type: "and-gate", id: "and2", x: 120, y: 180, label: "AC=0" },
    { type: "or-gate", id: "or1", x: 280, y: 150, label: "F1=0" },
    {
      type: "wire",
      id: "w1",
      points: [
        { x: 146, y: 120 },
        { x: 200, y: 120 },
        { x: 200, y: 142 },
        { x: 254, y: 142 },
      ],
    },
    {
      type: "wire",
      id: "w2",
      points: [
        { x: 146, y: 180 },
        { x: 200, y: 180 },
        { x: 200, y: 158 },
        { x: 254, y: 158 },
      ],
    },
    {
      type: "label",
      id: "res",
      x: 210,
      y: 240,
      text: "When A=0: F = 0·(B+C) = 0",
    },
    {
      type: "label",
      id: "desc",
      x: 210,
      y: 270,
      text: "Both outputs OFF - verified!",
    },
  ],
};

export const s2GateMinimizationStepSchematics: SchematicData[] = [
  step01,
  step02,
  step03,
  step04,
  step05,
  step06,
  step07,
  step08,
  step09,
  step10,
];

export const s2GateMinimizationTheoryDiagram: SchematicData = {
  width: 450,
  height: 300,
  elements: [
    {
      type: "label",
      id: "title",
      x: 225,
      y: 20,
      text: "Gate Minimization: F = AB + AC = A(B+C)",
    },
    // Two-level
    { type: "label", id: "l1", x: 110, y: 50, text: "Two-Level (SOP)" },
    { type: "and-gate", id: "and1", x: 70, y: 100, label: "AB" },
    { type: "and-gate", id: "and2", x: 70, y: 160, label: "AC" },
    { type: "or-gate", id: "or1", x: 170, y: 130, label: "F" },
    {
      type: "wire",
      id: "w1",
      points: [
        { x: 96, y: 100 },
        { x: 120, y: 100 },
        { x: 120, y: 122 },
        { x: 144, y: 122 },
      ],
    },
    {
      type: "wire",
      id: "w2",
      points: [
        { x: 96, y: 160 },
        { x: 120, y: 160 },
        { x: 120, y: 138 },
        { x: 144, y: 138 },
      ],
    },
    { type: "label", id: "s1", x: 110, y: 210, text: "3 gates" },
    // Multi-level
    { type: "label", id: "l2", x: 340, y: 50, text: "Multi-Level (Factored)" },
    { type: "or-gate", id: "or2", x: 300, y: 100, label: "B+C" },
    { type: "and-gate", id: "and3", x: 400, y: 130, label: "F" },
    {
      type: "wire",
      id: "w3",
      points: [
        { x: 326, y: 100 },
        { x: 350, y: 100 },
        { x: 350, y: 138 },
        { x: 374, y: 138 },
      ],
    },
    {
      type: "wire",
      id: "wa",
      points: [
        { x: 280, y: 130 },
        { x: 350, y: 130 },
        { x: 350, y: 122 },
        { x: 374, y: 122 },
      ],
    },
    { type: "label", id: "la", x: 265, y: 130, text: "A" },
    { type: "label", id: "s2", x: 340, y: 210, text: "2 gates" },
    {
      type: "label",
      id: "footer",
      x: 225,
      y: 270,
      text: "Same function, 33% fewer gates",
    },
  ],
};
