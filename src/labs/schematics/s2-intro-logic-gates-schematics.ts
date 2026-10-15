import { type SchematicData } from "@/labs/CircuitSchematic";

/*
 * S2 Intro to Logic Gates — progressive 2D schematics showing all 7 gates with testing
 */

const W = 400;
const H = 280;

/** Step 1: Breadboard setup */
export const step01: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "title", x: 200, y: 20, text: "Step 1: Breadboard Setup" },
  { type: "label", id: "desc", x: 200, y: 60, text: "Prepare breadboard with +5V and GND rails" },
  { type: "vsource", id: "vcc", x: 60, y: 140, label: "+5V" },
  { type: "ground", id: "gnd", x: 60, y: 200 },
  { type: "wire", id: "w1", points: [{ x: 60, y: 120 }, { x: 60, y: 100 }, { x: 340, y: 100 }], highlight: true },
  { type: "wire", id: "w2", points: [{ x: 60, y: 200 }, { x: 60, y: 220 }, { x: 340, y: 220 }], highlight: true },
  { type: "label", id: "lbl_vcc", x: 200, y: 90, text: "+5V Power Rail" },
  { type: "label", id: "lbl_gnd", x: 200, y: 232, text: "GND Rail" },
]};

/** Step 2: Basic gate ICs (AND, OR, NOT) */
export const step02: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "title", x: 200, y: 20, text: "Step 2: Basic Gate ICs" },
  { type: "and-gate", id: "and1", x: 80, y: 120, highlight: true },
  { type: "label", id: "lbl_and", x: 80, y: 160, text: "74HC08" },
  { type: "or-gate", id: "or1", x: 200, y: 120, highlight: true },
  { type: "label", id: "lbl_or", x: 200, y: 160, text: "74HC32" },
  { type: "not-gate", id: "not1", x: 320, y: 120, highlight: true },
  { type: "label", id: "lbl_not", x: 320, y: 160, text: "74HC04" },
  { type: "label", id: "desc", x: 200, y: 220, text: "Insert AND (74HC08), OR (74HC32), NOT (74HC04)" },
]};

/** Step 3: Advanced gate ICs (NAND, NOR, XOR, XNOR) */
export const step03: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "title", x: 200, y: 20, text: "Step 3: Advanced Gate ICs" },
  { type: "nand-gate", id: "nand1", x: 60, y: 100, highlight: true },
  { type: "label", id: "lbl_nand", x: 60, y: 140, text: "74HC00" },
  { type: "nor-gate", id: "nor1", x: 150, y: 100, highlight: true },
  { type: "label", id: "lbl_nor", x: 150, y: 140, text: "74HC02" },
  { type: "xor-gate", id: "xor1", x: 240, y: 100, highlight: true },
  { type: "label", id: "lbl_xor", x: 240, y: 140, text: "74HC86" },
  { type: "xnor-gate", id: "xnor1", x: 330, y: 100, highlight: true },
  { type: "label", id: "lbl_xnor", x: 330, y: 140, text: "74HC266" },
  { type: "label", id: "desc", x: 200, y: 200, text: "Insert NAND, NOR, XOR, XNOR gate ICs" },
]};

/** Step 4: Wire inputs A and B */
export const step04: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "title", x: 200, y: 20, text: "Step 4: Wire Inputs" },
  { type: "and-gate", id: "and1", x: 200, y: 140 },
  { type: "wire", id: "wa", points: [{ x: 60, y: 132 }, { x: 174, y: 132 }], highlight: true },
  { type: "wire", id: "wb", points: [{ x: 60, y: 148 }, { x: 174, y: 148 }], highlight: true },
  { type: "label", id: "lbl_a", x: 40, y: 132, text: "A" },
  { type: "label", id: "lbl_b", x: 40, y: 148, text: "B" },
  { type: "junction", id: "ja", x: 100, y: 132 },
  { type: "junction", id: "jb", x: 100, y: 148 },
  { type: "wire", id: "wa2", points: [{ x: 100, y: 132 }, { x: 100, y: 80 }] },
  { type: "wire", id: "wb2", points: [{ x: 100, y: 148 }, { x: 100, y: 200 }] },
  { type: "label", id: "desc", x: 200, y: 250, text: "Connect inputs A, B to all gate inputs" },
]};

/** Step 5: LED indicators */
export const step05: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "title", x: 200, y: 20, text: "Step 5: LED Indicators" },
  { type: "led", id: "led1", x: 80, y: 120, highlight: true },
  { type: "led", id: "led2", x: 140, y: 120, highlight: true },
  { type: "led", id: "led3", x: 200, y: 120, highlight: true },
  { type: "led", id: "led4", x: 260, y: 120, highlight: true },
  { type: "led", id: "led5", x: 320, y: 120, highlight: true },
  { type: "resistor", id: "r1", x: 80, y: 160, label: "330" },
  { type: "resistor", id: "r2", x: 140, y: 160, label: "330" },
  { type: "resistor", id: "r3", x: 200, y: 160, label: "330" },
  { type: "resistor", id: "r4", x: 260, y: 160, label: "330" },
  { type: "resistor", id: "r5", x: 320, y: 160, label: "330" },
  { type: "label", id: "desc", x: 200, y: 220, text: "Add 330 ohm resistors + LEDs for outputs" },
]};

/** Step 6: Wire outputs */
export const step06: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "title", x: 200, y: 20, text: "Step 6: Wire Outputs" },
  { type: "and-gate", id: "and1", x: 100, y: 100 },
  { type: "wire", id: "wo", points: [{ x: 126, y: 100 }, { x: 180, y: 100 }], highlight: true },
  { type: "resistor", id: "r1", x: 200, y: 100, label: "330" },
  { type: "wire", id: "wo2", points: [{ x: 220, y: 100 }, { x: 260, y: 100 }] },
  { type: "led", id: "led1", x: 280, y: 100, label: "Y" },
  { type: "wire", id: "wg", points: [{ x: 300, y: 100 }, { x: 340, y: 100 }, { x: 340, y: 180 }] },
  { type: "ground", id: "gnd", x: 340, y: 200 },
  { type: "label", id: "desc", x: 200, y: 250, text: "Connect each gate output to LED via 330 ohm" },
]};

/** Step 7: Test A=0, B=0 */
export const step07: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "title", x: 200, y: 20, text: "Step 7: Test A=0, B=0" },
  { type: "label", id: "inputs", x: 200, y: 60, text: "Inputs: A=0, B=0" },
  { type: "and-gate", id: "and1", x: 70, y: 120, label: "AND" },
  { type: "or-gate", id: "or1", x: 150, y: 120, label: "OR" },
  { type: "nand-gate", id: "nand1", x: 230, y: 120, label: "NAND" },
  { type: "nor-gate", id: "nor1", x: 310, y: 120, label: "NOR" },
  { type: "label", id: "r_and", x: 70, y: 160, text: "Y=0" },
  { type: "label", id: "r_or", x: 150, y: 160, text: "Y=0" },
  { type: "label", id: "r_nand", x: 230, y: 160, text: "Y=1" },
  { type: "label", id: "r_nor", x: 310, y: 160, text: "Y=1" },
  { type: "xor-gate", id: "xor1", x: 110, y: 200, label: "XOR" },
  { type: "xnor-gate", id: "xnor1", x: 230, y: 200, label: "XNOR" },
  { type: "label", id: "r_xor", x: 110, y: 240, text: "Y=0" },
  { type: "label", id: "r_xnor", x: 230, y: 240, text: "Y=1" },
]};

/** Step 8: Test A=0, B=1 */
export const step08: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "title", x: 200, y: 20, text: "Step 8: Test A=0, B=1" },
  { type: "label", id: "inputs", x: 200, y: 60, text: "Inputs: A=0, B=1" },
  { type: "and-gate", id: "and1", x: 70, y: 120, label: "AND" },
  { type: "or-gate", id: "or1", x: 150, y: 120, label: "OR" },
  { type: "nand-gate", id: "nand1", x: 230, y: 120, label: "NAND" },
  { type: "nor-gate", id: "nor1", x: 310, y: 120, label: "NOR" },
  { type: "label", id: "r_and", x: 70, y: 160, text: "Y=0" },
  { type: "label", id: "r_or", x: 150, y: 160, text: "Y=1" },
  { type: "label", id: "r_nand", x: 230, y: 160, text: "Y=1" },
  { type: "label", id: "r_nor", x: 310, y: 160, text: "Y=0" },
  { type: "xor-gate", id: "xor1", x: 110, y: 200, label: "XOR" },
  { type: "xnor-gate", id: "xnor1", x: 230, y: 200, label: "XNOR" },
  { type: "label", id: "r_xor", x: 110, y: 240, text: "Y=1" },
  { type: "label", id: "r_xnor", x: 230, y: 240, text: "Y=0" },
]};

/** Step 9: Test A=1, B=0 */
export const step09: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "title", x: 200, y: 20, text: "Step 9: Test A=1, B=0" },
  { type: "label", id: "inputs", x: 200, y: 60, text: "Inputs: A=1, B=0" },
  { type: "and-gate", id: "and1", x: 70, y: 120, label: "AND" },
  { type: "or-gate", id: "or1", x: 150, y: 120, label: "OR" },
  { type: "nand-gate", id: "nand1", x: 230, y: 120, label: "NAND" },
  { type: "nor-gate", id: "nor1", x: 310, y: 120, label: "NOR" },
  { type: "label", id: "r_and", x: 70, y: 160, text: "Y=0" },
  { type: "label", id: "r_or", x: 150, y: 160, text: "Y=1" },
  { type: "label", id: "r_nand", x: 230, y: 160, text: "Y=1" },
  { type: "label", id: "r_nor", x: 310, y: 160, text: "Y=0" },
  { type: "xor-gate", id: "xor1", x: 110, y: 200, label: "XOR" },
  { type: "xnor-gate", id: "xnor1", x: 230, y: 200, label: "XNOR" },
  { type: "label", id: "r_xor", x: 110, y: 240, text: "Y=1" },
  { type: "label", id: "r_xnor", x: 230, y: 240, text: "Y=0" },
]};

/** Step 10: Test A=1, B=1 */
export const step10: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "title", x: 200, y: 20, text: "Step 10: Test A=1, B=1" },
  { type: "label", id: "inputs", x: 200, y: 60, text: "Inputs: A=1, B=1" },
  { type: "and-gate", id: "and1", x: 70, y: 120, label: "AND" },
  { type: "or-gate", id: "or1", x: 150, y: 120, label: "OR" },
  { type: "nand-gate", id: "nand1", x: 230, y: 120, label: "NAND" },
  { type: "nor-gate", id: "nor1", x: 310, y: 120, label: "NOR" },
  { type: "label", id: "r_and", x: 70, y: 160, text: "Y=1" },
  { type: "label", id: "r_or", x: 150, y: 160, text: "Y=1" },
  { type: "label", id: "r_nand", x: 230, y: 160, text: "Y=0" },
  { type: "label", id: "r_nor", x: 310, y: 160, text: "Y=0" },
  { type: "xor-gate", id: "xor1", x: 110, y: 200, label: "XOR" },
  { type: "xnor-gate", id: "xnor1", x: 230, y: 200, label: "XNOR" },
  { type: "label", id: "r_xor", x: 110, y: 240, text: "Y=0" },
  { type: "label", id: "r_xnor", x: 230, y: 240, text: "Y=1" },
]};

export const s2IntroLogicGatesStepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05, step06, step07, step08, step09, step10,
];

export const s2IntroLogicGatesTheoryDiagram: SchematicData = { width: 400, height: 320, elements: [
  { type: "label", id: "title", x: 200, y: 20, text: "All 7 Basic Logic Gates" },
  // Row 1
  { type: "and-gate", id: "and1", x: 70, y: 80 },
  { type: "label", id: "l1", x: 70, y: 115, text: "AND" },
  { type: "or-gate", id: "or1", x: 170, y: 80 },
  { type: "label", id: "l2", x: 170, y: 115, text: "OR" },
  { type: "not-gate", id: "not1", x: 270, y: 80 },
  { type: "label", id: "l3", x: 270, y: 115, text: "NOT" },
  // Row 2
  { type: "nand-gate", id: "nand1", x: 70, y: 170 },
  { type: "label", id: "l4", x: 70, y: 205, text: "NAND" },
  { type: "nor-gate", id: "nor1", x: 170, y: 170 },
  { type: "label", id: "l5", x: 170, y: 205, text: "NOR" },
  // Row 3
  { type: "xor-gate", id: "xor1", x: 120, y: 260 },
  { type: "label", id: "l6", x: 120, y: 295, text: "XOR" },
  { type: "xnor-gate", id: "xnor1", x: 260, y: 260 },
  { type: "label", id: "l7", x: 260, y: 295, text: "XNOR" },
]};
