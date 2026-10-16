import { type SchematicData } from "@/labs/CircuitSchematic";

/*
 * S2 Full Adder — Sum = A⊕B⊕Cin, Cout = AB + Cin(A⊕B)
 */

const W = 450;
const H = 320;

/** Step 1: Place breadboard */
export const step01: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "label",
      id: "title",
      x: 225,
      y: 20,
      text: "Step 1: Breadboard Setup",
    },
    { type: "vsource", id: "vcc", x: 60, y: 100, label: "+5V" },
    { type: "ground", id: "gnd", x: 60, y: 200 },
    {
      type: "wire",
      id: "w1",
      points: [
        { x: 60, y: 80 },
        { x: 390, y: 80 },
      ],
      highlight: true,
    },
    {
      type: "wire",
      id: "w2",
      points: [
        { x: 60, y: 200 },
        { x: 390, y: 200 },
      ],
      highlight: true,
    },
    {
      type: "label",
      id: "desc",
      x: 225,
      y: 280,
      text: "Power rails for full adder circuit",
    },
  ],
};

/** Step 2: Place XOR gates for Sum */
export const step02: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "label",
      id: "title",
      x: 225,
      y: 20,
      text: "Step 2: XOR Gates for Sum",
    },
    { type: "label", id: "eq", x: 225, y: 50, text: "Sum = A⊕B⊕Cin" },
    {
      type: "xor-gate",
      id: "xor1",
      x: 140,
      y: 140,
      label: "A⊕B",
      highlight: true,
    },
    {
      type: "xor-gate",
      id: "xor2",
      x: 300,
      y: 160,
      label: "Sum",
      highlight: true,
    },
    {
      type: "wire",
      id: "w1",
      points: [
        { x: 168, y: 140 },
        { x: 220, y: 140 },
        { x: 220, y: 152 },
        { x: 272, y: 152 },
      ],
    },
    { type: "label", id: "lbl_p", x: 190, y: 125, text: "P = A⊕B" },
    {
      type: "label",
      id: "desc",
      x: 225,
      y: 280,
      text: "Two XOR gates: first for P=A⊕B, second for Sum=P⊕Cin",
    },
  ],
};

/** Step 3: Place AND and OR gates for Carry */
export const step03: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "label",
      id: "title",
      x: 225,
      y: 20,
      text: "Step 3: AND/OR Gates for Carry",
    },
    { type: "label", id: "eq", x: 225, y: 50, text: "Cout = A·B + Cin·(A⊕B)" },
    {
      type: "and-gate",
      id: "and1",
      x: 140,
      y: 120,
      label: "A·B",
      highlight: true,
    },
    {
      type: "and-gate",
      id: "and2",
      x: 140,
      y: 200,
      label: "Cin·P",
      highlight: true,
    },
    {
      type: "or-gate",
      id: "or1",
      x: 300,
      y: 160,
      label: "Cout",
      highlight: true,
    },
    {
      type: "wire",
      id: "w1",
      points: [
        { x: 166, y: 120 },
        { x: 220, y: 120 },
        { x: 220, y: 152 },
        { x: 274, y: 152 },
      ],
    },
    {
      type: "wire",
      id: "w2",
      points: [
        { x: 166, y: 200 },
        { x: 220, y: 200 },
        { x: 220, y: 168 },
        { x: 274, y: 168 },
      ],
    },
    {
      type: "label",
      id: "desc",
      x: 225,
      y: 280,
      text: "Two AND gates + one OR gate for carry logic",
    },
  ],
};

/** Step 4: Place output LEDs */
export const step04: SchematicData = {
  width: W,
  height: H,
  elements: [
    { type: "label", id: "title", x: 225, y: 20, text: "Step 4: Output LEDs" },
    { type: "resistor", id: "r1", x: 160, y: 120, label: "330" },
    { type: "led", id: "led1", x: 160, y: 160, label: "Sum", highlight: true },
    { type: "resistor", id: "r2", x: 280, y: 120, label: "330" },
    { type: "led", id: "led2", x: 280, y: 160, label: "Cout", highlight: true },
    {
      type: "wire",
      id: "w1",
      points: [
        { x: 160, y: 180 },
        { x: 160, y: 220 },
      ],
    },
    {
      type: "wire",
      id: "w2",
      points: [
        { x: 280, y: 180 },
        { x: 280, y: 220 },
      ],
    },
    {
      type: "wire",
      id: "wgnd",
      points: [
        { x: 160, y: 220 },
        { x: 280, y: 220 },
      ],
    },
    { type: "ground", id: "gnd", x: 220, y: 240 },
    {
      type: "label",
      id: "desc",
      x: 225,
      y: 290,
      text: "Sum and Cout LEDs with current limiters",
    },
  ],
};

/** Step 5: Wire inputs A, B */
export const step05: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "label",
      id: "title",
      x: 225,
      y: 20,
      text: "Step 5: Wire Inputs A, B",
    },
    { type: "xor-gate", id: "xor1", x: 180, y: 100, label: "XOR1" },
    { type: "and-gate", id: "and1", x: 180, y: 180, label: "AND1" },
    {
      type: "wire",
      id: "wa",
      points: [
        { x: 40, y: 92 },
        { x: 152, y: 92 },
      ],
      highlight: true,
    },
    {
      type: "wire",
      id: "wb",
      points: [
        { x: 40, y: 108 },
        { x: 152, y: 108 },
      ],
      highlight: true,
    },
    { type: "junction", id: "ja", x: 80, y: 92 },
    { type: "junction", id: "jb", x: 100, y: 108 },
    {
      type: "wire",
      id: "wa2",
      points: [
        { x: 80, y: 92 },
        { x: 80, y: 172 },
        { x: 154, y: 172 },
      ],
      highlight: true,
    },
    {
      type: "wire",
      id: "wb2",
      points: [
        { x: 100, y: 108 },
        { x: 100, y: 188 },
        { x: 154, y: 188 },
      ],
      highlight: true,
    },
    { type: "label", id: "la", x: 25, y: 92, text: "A" },
    { type: "label", id: "lb", x: 25, y: 108, text: "B" },
    {
      type: "label",
      id: "desc",
      x: 225,
      y: 280,
      text: "A, B to XOR1 and AND1 (generate A⊕B and A·B)",
    },
  ],
};

/** Step 6: Wire Cin to second stage */
export const step06: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "label",
      id: "title",
      x: 225,
      y: 20,
      text: "Step 6: Wire Cin to Second Stage",
    },
    { type: "xor-gate", id: "xor1", x: 120, y: 100, label: "P" },
    { type: "xor-gate", id: "xor2", x: 280, y: 100, label: "Sum" },
    { type: "and-gate", id: "and2", x: 280, y: 200, label: "Cin·P" },
    {
      type: "wire",
      id: "wp",
      points: [
        { x: 148, y: 100 },
        { x: 200, y: 100 },
        { x: 200, y: 92 },
        { x: 252, y: 92 },
      ],
    },
    { type: "junction", id: "jp", x: 200, y: 100 },
    {
      type: "wire",
      id: "wp2",
      points: [
        { x: 200, y: 100 },
        { x: 200, y: 192 },
        { x: 254, y: 192 },
      ],
    },
    {
      type: "wire",
      id: "wc1",
      points: [
        { x: 40, y: 108 },
        { x: 252, y: 108 },
      ],
      highlight: true,
    },
    { type: "junction", id: "jc", x: 220, y: 108 },
    {
      type: "wire",
      id: "wc2",
      points: [
        { x: 220, y: 108 },
        { x: 220, y: 208 },
        { x: 254, y: 208 },
      ],
      highlight: true,
    },
    { type: "label", id: "lc", x: 25, y: 108, text: "Cin" },
    {
      type: "label",
      id: "desc",
      x: 225,
      y: 280,
      text: "Cin to XOR2 (for Sum) and AND2 (for carry)",
    },
  ],
};

/** Step 7: Wire carry OR gate */
export const step07: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "label",
      id: "title",
      x: 225,
      y: 20,
      text: "Step 7: Wire Carry OR Gate",
    },
    { type: "and-gate", id: "and1", x: 120, y: 100, label: "A·B" },
    { type: "and-gate", id: "and2", x: 120, y: 180, label: "Cin·P" },
    {
      type: "or-gate",
      id: "or1",
      x: 280,
      y: 140,
      label: "Cout",
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
      highlight: true,
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
      highlight: true,
    },
    {
      type: "wire",
      id: "wout",
      points: [
        { x: 306, y: 140 },
        { x: 380, y: 140 },
      ],
    },
    { type: "led", id: "led1", x: 400, y: 140, label: "Cout" },
    {
      type: "label",
      id: "desc",
      x: 225,
      y: 280,
      text: "Cout = (A·B) + (Cin·P) via OR gate",
    },
  ],
};

/** Step 8: Wire outputs and ground */
export const step08: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "label",
      id: "title",
      x: 225,
      y: 20,
      text: "Step 8: Complete Wiring",
    },
    { type: "xor-gate", id: "xor2", x: 200, y: 80, label: "Sum" },
    { type: "or-gate", id: "or1", x: 200, y: 160, label: "Cout" },
    {
      type: "wire",
      id: "ws",
      points: [
        { x: 228, y: 80 },
        { x: 300, y: 80 },
      ],
      highlight: true,
    },
    {
      type: "wire",
      id: "wc",
      points: [
        { x: 226, y: 160 },
        { x: 300, y: 160 },
      ],
      highlight: true,
    },
    { type: "resistor", id: "r1", x: 320, y: 80, label: "330" },
    { type: "resistor", id: "r2", x: 320, y: 160, label: "330" },
    { type: "led", id: "led1", x: 370, y: 80, label: "Sum" },
    { type: "led", id: "led2", x: 370, y: 160, label: "Cout" },
    {
      type: "wire",
      id: "wg1",
      points: [
        { x: 370, y: 100 },
        { x: 370, y: 200 },
      ],
    },
    {
      type: "wire",
      id: "wg2",
      points: [
        { x: 370, y: 180 },
        { x: 370, y: 200 },
      ],
    },
    { type: "ground", id: "gnd", x: 370, y: 220 },
    {
      type: "label",
      id: "desc",
      x: 225,
      y: 280,
      text: "Sum and Cout outputs to LEDs",
    },
  ],
};

/** Step 9: Test A=0, B=1, Cin=1 → Sum=0, Cout=1 */
export const step09: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "label",
      id: "title",
      x: 225,
      y: 20,
      text: "Step 9: Test A=0, B=1, Cin=1",
    },
    {
      type: "label",
      id: "inputs",
      x: 225,
      y: 55,
      text: "Inputs: A=0, B=1, Cin=1",
    },
    { type: "xor-gate", id: "xor1", x: 100, y: 120, label: "0⊕1=1" },
    { type: "xor-gate", id: "xor2", x: 220, y: 120, label: "1⊕1=0" },
    {
      type: "wire",
      id: "w1",
      points: [
        { x: 128, y: 120 },
        { x: 192, y: 120 },
      ],
    },
    { type: "and-gate", id: "and1", x: 100, y: 200, label: "0·1=0" },
    { type: "and-gate", id: "and2", x: 220, y: 200, label: "1·1=1" },
    { type: "or-gate", id: "or1", x: 340, y: 200, label: "0+1=1" },
    {
      type: "wire",
      id: "w2",
      points: [
        { x: 126, y: 200 },
        { x: 180, y: 200 },
        { x: 180, y: 192 },
        { x: 314, y: 192 },
      ],
    },
    {
      type: "wire",
      id: "w3",
      points: [
        { x: 246, y: 200 },
        { x: 280, y: 200 },
        { x: 280, y: 208 },
        { x: 314, y: 208 },
      ],
    },
    {
      type: "label",
      id: "res",
      x: 225,
      y: 260,
      text: "Result: Sum=0, Cout=1 (0+1+1=10₂)",
    },
  ],
};

/** Step 10: Test A=1, B=1, Cin=1 → Sum=1, Cout=1 */
export const step10: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "label",
      id: "title",
      x: 225,
      y: 20,
      text: "Step 10: Test A=1, B=1, Cin=1",
    },
    {
      type: "label",
      id: "inputs",
      x: 225,
      y: 55,
      text: "Inputs: A=1, B=1, Cin=1",
    },
    { type: "xor-gate", id: "xor1", x: 100, y: 120, label: "1⊕1=0" },
    { type: "xor-gate", id: "xor2", x: 220, y: 120, label: "0⊕1=1" },
    {
      type: "wire",
      id: "w1",
      points: [
        { x: 128, y: 120 },
        { x: 192, y: 120 },
      ],
    },
    { type: "and-gate", id: "and1", x: 100, y: 200, label: "1·1=1" },
    { type: "and-gate", id: "and2", x: 220, y: 200, label: "1·0=0" },
    { type: "or-gate", id: "or1", x: 340, y: 200, label: "1+0=1" },
    {
      type: "wire",
      id: "w2",
      points: [
        { x: 126, y: 200 },
        { x: 180, y: 200 },
        { x: 180, y: 192 },
        { x: 314, y: 192 },
      ],
    },
    {
      type: "wire",
      id: "w3",
      points: [
        { x: 246, y: 200 },
        { x: 280, y: 200 },
        { x: 280, y: 208 },
        { x: 314, y: 208 },
      ],
    },
    {
      type: "label",
      id: "res",
      x: 225,
      y: 260,
      text: "Result: Sum=1, Cout=1 (1+1+1=11₂)",
    },
  ],
};

export const s2FullAdderStepSchematics: SchematicData[] = [
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

export const s2FullAdderTheoryDiagram: SchematicData = {
  width: 480,
  height: 300,
  elements: [
    { type: "label", id: "title", x: 240, y: 20, text: "Full Adder Circuit" },
    // Inputs
    { type: "label", id: "la", x: 30, y: 80, text: "A" },
    { type: "label", id: "lb", x: 30, y: 110, text: "B" },
    { type: "label", id: "lc", x: 30, y: 180, text: "Cin" },
    // XOR path for Sum
    { type: "xor-gate", id: "xor1", x: 120, y: 95, label: "P" },
    { type: "xor-gate", id: "xor2", x: 280, y: 120, label: "Sum" },
    {
      type: "wire",
      id: "wa",
      points: [
        { x: 45, y: 80 },
        { x: 92, y: 80 },
        { x: 92, y: 87 },
      ],
    },
    {
      type: "wire",
      id: "wb",
      points: [
        { x: 45, y: 110 },
        { x: 92, y: 110 },
        { x: 92, y: 103 },
      ],
    },
    {
      type: "wire",
      id: "wp",
      points: [
        { x: 148, y: 95 },
        { x: 200, y: 95 },
        { x: 200, y: 112 },
        { x: 252, y: 112 },
      ],
    },
    { type: "junction", id: "jp", x: 200, y: 95 },
    {
      type: "wire",
      id: "wc1",
      points: [
        { x: 45, y: 180 },
        { x: 230, y: 180 },
        { x: 230, y: 128 },
        { x: 252, y: 128 },
      ],
    },
    { type: "junction", id: "jc", x: 230, y: 180 },
    // AND-OR path for Cout
    { type: "and-gate", id: "and1", x: 120, y: 200, label: "G" },
    { type: "and-gate", id: "and2", x: 280, y: 220, label: "P·Cin" },
    { type: "or-gate", id: "or1", x: 400, y: 210, label: "Cout" },
    {
      type: "wire",
      id: "wa2",
      points: [
        { x: 70, y: 80 },
        { x: 70, y: 192 },
        { x: 94, y: 192 },
      ],
    },
    { type: "junction", id: "ja", x: 70, y: 80 },
    {
      type: "wire",
      id: "wb2",
      points: [
        { x: 80, y: 110 },
        { x: 80, y: 208 },
        { x: 94, y: 208 },
      ],
    },
    { type: "junction", id: "jb", x: 80, y: 110 },
    {
      type: "wire",
      id: "wg",
      points: [
        { x: 146, y: 200 },
        { x: 350, y: 200 },
        { x: 350, y: 202 },
        { x: 374, y: 202 },
      ],
    },
    {
      type: "wire",
      id: "wp2",
      points: [
        { x: 200, y: 95 },
        { x: 200, y: 212 },
        { x: 254, y: 212 },
      ],
    },
    {
      type: "wire",
      id: "wc2",
      points: [
        { x: 230, y: 180 },
        { x: 230, y: 228 },
        { x: 254, y: 228 },
      ],
    },
    {
      type: "wire",
      id: "wpc",
      points: [
        { x: 306, y: 220 },
        { x: 350, y: 220 },
        { x: 350, y: 218 },
        { x: 374, y: 218 },
      ],
    },
    {
      type: "label",
      id: "eq",
      x: 240,
      y: 280,
      text: "Sum = A⊕B⊕Cin, Cout = AB + Cin(A⊕B)",
    },
  ],
};
