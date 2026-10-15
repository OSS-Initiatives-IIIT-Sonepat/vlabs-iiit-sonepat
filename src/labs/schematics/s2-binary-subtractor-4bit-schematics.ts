import { type SchematicData } from "@/labs/CircuitSchematic";

/*
 * 4-bit Binary Subtractor — progressive 2D schematics.
 * Uses 2's complement method: A - B = A + B' + 1
 * 4 NOT gates for B', 4-bit adder, Cin=1
 * Borrow out (negative result) indicated by Cout=0
 */

const W = 500;
const H = 340;

/** Step 1: Theory recap */
export const step01: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 250, y: 20, text: "4-bit Binary Subtractor" },
  { type: "label", id: "lbl_method", x: 250, y: 60, text: "2's Complement Method:" },
  { type: "label", id: "lbl_eq1", x: 250, y: 90, text: "A - B = A + (-B)" },
  { type: "label", id: "lbl_eq2", x: 250, y: 120, text: "-B = B' + 1 (2's complement)" },
  { type: "label", id: "lbl_eq3", x: 250, y: 150, text: "So: A - B = A + B' + 1" },
  { type: "label", id: "lbl_impl", x: 250, y: 200, text: "Implementation:" },
  { type: "label", id: "lbl_impl1", x: 250, y: 230, text: "1. Invert all B bits (NOT gates)" },
  { type: "label", id: "lbl_impl2", x: 250, y: 260, text: "2. Add using 4-bit adder" },
  { type: "label", id: "lbl_impl3", x: 250, y: 290, text: "3. Set Cin = 1 (adds the +1)" },
]};

/** Step 2: Power and ICs - Block diagram */
export const step02: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 250, y: 20, text: "Subtractor — Block Diagram" },
  // A inputs (direct to adder)
  { type: "label", id: "lbl_a", x: 40, y: 60, text: "A[3:0]" },
  { type: "wire", id: "w_a", points: [{ x: 80, y: 60 }, { x: 200, y: 60 }, { x: 200, y: 100 }], highlight: true },
  // B inputs (through inverters)
  { type: "label", id: "lbl_b", x: 40, y: 140, text: "B[3:0]" },
  { type: "wire", id: "w_b_in", points: [{ x: 80, y: 140 }, { x: 120, y: 140 }] },
  // Inverters block
  { type: "not-gate", id: "NOT0", x: 140, y: 120 },
  { type: "not-gate", id: "NOT1", x: 140, y: 140 },
  { type: "not-gate", id: "NOT2", x: 140, y: 160 },
  { type: "not-gate", id: "NOT3", x: 140, y: 180 },
  { type: "label", id: "lbl_inv", x: 140, y: 210, text: "Inverters" },
  // Inverted B to adder
  { type: "wire", id: "w_b_inv", points: [{ x: 166, y: 150 }, { x: 240, y: 150 }, { x: 240, y: 100 }], highlight: true },
  { type: "label", id: "lbl_bprime", x: 250, y: 160, text: "B'" },
  // 4-bit adder block
  { type: "label", id: "lbl_adder", x: 320, y: 100, text: "[4-bit Adder]" },
  // Cin = 1
  { type: "wire", id: "w_cin", points: [{ x: 260, y: 100 }, { x: 260, y: 240 }, { x: 200, y: 240 }] },
  { type: "label", id: "lbl_cin", x: 180, y: 240, text: "Cin=1" },
  // Outputs
  { type: "wire", id: "w_diff", points: [{ x: 400, y: 100 }, { x: 450, y: 100 }] },
  { type: "label", id: "lbl_diff", x: 460, y: 100, text: "D[3:0]" },
  { type: "wire", id: "w_borrow", points: [{ x: 400, y: 130 }, { x: 450, y: 130 }] },
  { type: "label", id: "lbl_bout", x: 460, y: 130, text: "Bout'" },
  { type: "label", id: "lbl_note", x: 250, y: 300, text: "Note: Cout=1 means no borrow, Cout=0 means borrow" },
]};

/** Step 3: Invert B - Show NOT gates */
export const step03: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 250, y: 20, text: "Invert B — NOT Gates" },
  // B inputs
  { type: "label", id: "lbl_b3", x: 30, y: 80, text: "B3" },
  { type: "label", id: "lbl_b2", x: 30, y: 130, text: "B2" },
  { type: "label", id: "lbl_b1", x: 30, y: 180, text: "B1" },
  { type: "label", id: "lbl_b0", x: 30, y: 230, text: "B0" },
  // Input wires
  { type: "wire", id: "w_b3_in", points: [{ x: 50, y: 80 }, { x: 80, y: 80 }] },
  { type: "wire", id: "w_b2_in", points: [{ x: 50, y: 130 }, { x: 80, y: 130 }] },
  { type: "wire", id: "w_b1_in", points: [{ x: 50, y: 180 }, { x: 80, y: 180 }] },
  { type: "wire", id: "w_b0_in", points: [{ x: 50, y: 230 }, { x: 80, y: 230 }] },
  // NOT gates
  { type: "not-gate", id: "NOT3", x: 110, y: 80, highlight: true },
  { type: "not-gate", id: "NOT2", x: 110, y: 130, highlight: true },
  { type: "not-gate", id: "NOT1", x: 110, y: 180, highlight: true },
  { type: "not-gate", id: "NOT0", x: 110, y: 230, highlight: true },
  // Output wires
  { type: "wire", id: "w_b3_out", points: [{ x: 136, y: 80 }, { x: 200, y: 80 }] },
  { type: "wire", id: "w_b2_out", points: [{ x: 136, y: 130 }, { x: 200, y: 130 }] },
  { type: "wire", id: "w_b1_out", points: [{ x: 136, y: 180 }, { x: 200, y: 180 }] },
  { type: "wire", id: "w_b0_out", points: [{ x: 136, y: 230 }, { x: 200, y: 230 }] },
  // Output labels
  { type: "label", id: "lbl_b3p", x: 210, y: 80, text: "B3'" },
  { type: "label", id: "lbl_b2p", x: 210, y: 130, text: "B2'" },
  { type: "label", id: "lbl_b1p", x: 210, y: 180, text: "B1'" },
  { type: "label", id: "lbl_b0p", x: 210, y: 230, text: "B0'" },
  // Example
  { type: "label", id: "lbl_ex", x: 350, y: 140, text: "Example:" },
  { type: "label", id: "lbl_ex1", x: 350, y: 170, text: "B = 0011 (3)" },
  { type: "label", id: "lbl_ex2", x: 350, y: 200, text: "B' = 1100" },
]};

/** Step 4: Wire adder - Connect to 4-bit adder */
export const step04: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 250, y: 20, text: "Connect to 4-bit Adder" },
  // A inputs direct to adder
  { type: "label", id: "lbl_a3", x: 20, y: 70, text: "A3" },
  { type: "label", id: "lbl_a2", x: 20, y: 100, text: "A2" },
  { type: "label", id: "lbl_a1", x: 20, y: 130, text: "A1" },
  { type: "label", id: "lbl_a0", x: 20, y: 160, text: "A0" },
  { type: "wire", id: "w_a3", points: [{ x: 40, y: 70 }, { x: 180, y: 70 }] },
  { type: "wire", id: "w_a2", points: [{ x: 40, y: 100 }, { x: 180, y: 100 }] },
  { type: "wire", id: "w_a1", points: [{ x: 40, y: 130 }, { x: 180, y: 130 }] },
  { type: "wire", id: "w_a0", points: [{ x: 40, y: 160 }, { x: 180, y: 160 }] },
  // B' inputs to adder
  { type: "label", id: "lbl_b3p", x: 20, y: 200, text: "B3'" },
  { type: "label", id: "lbl_b2p", x: 20, y: 220, text: "B2'" },
  { type: "label", id: "lbl_b1p", x: 20, y: 240, text: "B1'" },
  { type: "label", id: "lbl_b0p", x: 20, y: 260, text: "B0'" },
  { type: "wire", id: "w_bp3", points: [{ x: 45, y: 200 }, { x: 180, y: 200 }], highlight: true },
  { type: "wire", id: "w_bp2", points: [{ x: 45, y: 220 }, { x: 180, y: 220 }], highlight: true },
  { type: "wire", id: "w_bp1", points: [{ x: 45, y: 240 }, { x: 180, y: 240 }], highlight: true },
  { type: "wire", id: "w_bp0", points: [{ x: 45, y: 260 }, { x: 180, y: 260 }], highlight: true },
  // Adder block
  { type: "label", id: "lbl_adder", x: 280, y: 160, text: "[4-bit Adder]" },
  // Cin = 1 (highlighted - this adds the +1 for 2's complement)
  { type: "wire", id: "w_cin", points: [{ x: 150, y: 300 }, { x: 180, y: 300 }], highlight: true },
  { type: "label", id: "lbl_cin", x: 120, y: 300, text: "Cin=1" },
  // Outputs
  { type: "wire", id: "w_d3", points: [{ x: 380, y: 70 }, { x: 450, y: 70 }] },
  { type: "wire", id: "w_d2", points: [{ x: 380, y: 100 }, { x: 450, y: 100 }] },
  { type: "wire", id: "w_d1", points: [{ x: 380, y: 130 }, { x: 450, y: 130 }] },
  { type: "wire", id: "w_d0", points: [{ x: 380, y: 160 }, { x: 450, y: 160 }] },
  { type: "wire", id: "w_cout", points: [{ x: 380, y: 200 }, { x: 450, y: 200 }] },
  { type: "label", id: "lbl_d3", x: 460, y: 70, text: "D3" },
  { type: "label", id: "lbl_d2", x: 460, y: 100, text: "D2" },
  { type: "label", id: "lbl_d1", x: 460, y: 130, text: "D1" },
  { type: "label", id: "lbl_d0", x: 460, y: 160, text: "D0" },
  { type: "label", id: "lbl_cout", x: 460, y: 200, text: "Cout" },
]};

/** Step 5: Outputs - Complete circuit with LEDs */
export const step05: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 250, y: 20, text: "4-bit Subtractor — Complete" },
  // Simplified block diagram
  { type: "label", id: "lbl_a", x: 40, y: 80, text: "A[3:0]" },
  { type: "wire", id: "w_a", points: [{ x: 90, y: 80 }, { x: 150, y: 80 }] },
  { type: "label", id: "lbl_b", x: 40, y: 120, text: "B[3:0]" },
  { type: "wire", id: "w_b", points: [{ x: 90, y: 120 }, { x: 110, y: 120 }] },
  // NOT gates symbol
  { type: "not-gate", id: "NOT", x: 130, y: 120 },
  { type: "wire", id: "w_bp", points: [{ x: 156, y: 120 }, { x: 170, y: 120 }] },
  // Adder block
  { type: "label", id: "lbl_adder", x: 250, y: 100, text: "[4-bit Adder]" },
  // Cin = 1
  { type: "wire", id: "w_cin", points: [{ x: 150, y: 160 }, { x: 170, y: 160 }] },
  { type: "label", id: "lbl_cin", x: 130, y: 180, text: "1" },
  // Output LEDs
  { type: "wire", id: "w_d0", points: [{ x: 350, y: 70 }, { x: 380, y: 70 }] },
  { type: "wire", id: "w_d1", points: [{ x: 350, y: 90 }, { x: 380, y: 90 }] },
  { type: "wire", id: "w_d2", points: [{ x: 350, y: 110 }, { x: 380, y: 110 }] },
  { type: "wire", id: "w_d3", points: [{ x: 350, y: 130 }, { x: 380, y: 130 }] },
  { type: "wire", id: "w_cout", points: [{ x: 350, y: 160 }, { x: 380, y: 160 }] },
  { type: "led", id: "led_d0", x: 400, y: 70, label: "D0", color: "green", highlight: true },
  { type: "led", id: "led_d1", x: 400, y: 95, label: "D1", color: "green", highlight: true },
  { type: "led", id: "led_d2", x: 400, y: 120, label: "D2", color: "green", highlight: true },
  { type: "led", id: "led_d3", x: 400, y: 145, label: "D3", color: "green", highlight: true },
  { type: "led", id: "led_bout", x: 400, y: 180, label: "Bout", color: "red", highlight: true },
  // Note
  { type: "label", id: "lbl_note1", x: 250, y: 240, text: "D = A - B (difference)" },
  { type: "label", id: "lbl_note2", x: 250, y: 270, text: "Bout LED OFF (Cout=1): No borrow" },
  { type: "label", id: "lbl_note3", x: 250, y: 300, text: "Bout LED ON (Cout=0): Borrow (negative)" },
]};

/** Step 6: No borrow case - 7 - 3 = 4 */
export const step06: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 250, y: 20, text: "Test: 7 - 3 = 4 (No Borrow)" },
  { type: "label", id: "lbl_a", x: 250, y: 60, text: "A = 0111 (7)" },
  { type: "label", id: "lbl_b", x: 250, y: 85, text: "B = 0011 (3)" },
  { type: "label", id: "lbl_bp", x: 250, y: 110, text: "B' = 1100, B'+1 = 1101 (-3)" },
  // Calculation
  { type: "label", id: "lbl_calc", x: 150, y: 150, text: "Calculation:" },
  { type: "label", id: "lbl_c1", x: 150, y: 175, text: "  0111 (A)" },
  { type: "label", id: "lbl_c2", x: 150, y: 195, text: "+ 1101 (B'+1)" },
  { type: "label", id: "lbl_c3", x: 150, y: 215, text: "------" },
  { type: "label", id: "lbl_c4", x: 150, y: 235, text: "1 0100" },
  // Result LEDs
  { type: "led", id: "led_d0", x: 350, y: 160, label: "0", color: "green" },
  { type: "led", id: "led_d1", x: 380, y: 160, label: "0", color: "green" },
  { type: "led", id: "led_d2", x: 410, y: 160, label: "1", color: "green", highlight: true },
  { type: "led", id: "led_d3", x: 440, y: 160, label: "0", color: "green" },
  { type: "led", id: "led_cout", x: 470, y: 160, label: "1", color: "red" },
  { type: "label", id: "lbl_d", x: 410, y: 200, text: "D3 D2 D1 D0" },
  { type: "label", id: "lbl_result", x: 250, y: 280, text: "Result: D = 0100 (4), Cout=1 (no borrow) ✓" },
]};

/** Step 7: Borrow case - 3 - 7 = -4 */
export const step07: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 250, y: 20, text: "Test: 3 - 7 = -4 (Borrow)" },
  { type: "label", id: "lbl_a", x: 250, y: 60, text: "A = 0011 (3)" },
  { type: "label", id: "lbl_b", x: 250, y: 85, text: "B = 0111 (7)" },
  { type: "label", id: "lbl_bp", x: 250, y: 110, text: "B' = 1000, B'+1 = 1001 (-7)" },
  // Calculation
  { type: "label", id: "lbl_calc", x: 150, y: 150, text: "Calculation:" },
  { type: "label", id: "lbl_c1", x: 150, y: 175, text: "  0011 (A)" },
  { type: "label", id: "lbl_c2", x: 150, y: 195, text: "+ 1001 (B'+1)" },
  { type: "label", id: "lbl_c3", x: 150, y: 215, text: "------" },
  { type: "label", id: "lbl_c4", x: 150, y: 235, text: "0 1100" },
  // Result LEDs
  { type: "led", id: "led_d0", x: 350, y: 160, label: "0", color: "green" },
  { type: "led", id: "led_d1", x: 380, y: 160, label: "0", color: "green" },
  { type: "led", id: "led_d2", x: 410, y: 160, label: "1", color: "green", highlight: true },
  { type: "led", id: "led_d3", x: 440, y: 160, label: "1", color: "green", highlight: true },
  { type: "led", id: "led_cout", x: 470, y: 160, label: "0", color: "red", highlight: true },
  { type: "label", id: "lbl_d", x: 410, y: 200, text: "D3 D2 D1 D0" },
  { type: "label", id: "lbl_result", x: 250, y: 260, text: "Cout=0 means borrow (negative result)" },
  { type: "label", id: "lbl_result2", x: 250, y: 290, text: "To get magnitude: 2's comp of 1100 = 0100 = 4" },
  { type: "label", id: "lbl_result3", x: 250, y: 320, text: "Final: -4 ✓" },
]};

/** Step 8: Edge cases - 0 - 0 and same values */
export const step08: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 250, y: 20, text: "Edge Cases" },
  // Case 1: 5 - 5 = 0
  { type: "label", id: "lbl_case1", x: 150, y: 70, text: "Case 1: 5 - 5 = 0" },
  { type: "label", id: "lbl_c1a", x: 150, y: 95, text: "0101 + 1011 = 1 0000" },
  { type: "led", id: "led_c1d0", x: 120, y: 130, label: "0", color: "green" },
  { type: "led", id: "led_c1d1", x: 150, y: 130, label: "0", color: "green" },
  { type: "led", id: "led_c1d2", x: 180, y: 130, label: "0", color: "green" },
  { type: "led", id: "led_c1d3", x: 210, y: 130, label: "0", color: "green" },
  { type: "led", id: "led_c1co", x: 250, y: 130, label: "1", color: "red" },
  { type: "label", id: "lbl_c1r", x: 180, y: 170, text: "Result: 0, No borrow ✓" },
  // Case 2: 0 - 1 = -1
  { type: "label", id: "lbl_case2", x: 350, y: 70, text: "Case 2: 0 - 1 = -1" },
  { type: "label", id: "lbl_c2a", x: 350, y: 95, text: "0000 + 1111 = 0 1111" },
  { type: "led", id: "led_c2d0", x: 320, y: 130, label: "1", color: "green", highlight: true },
  { type: "led", id: "led_c2d1", x: 350, y: 130, label: "1", color: "green", highlight: true },
  { type: "led", id: "led_c2d2", x: 380, y: 130, label: "1", color: "green", highlight: true },
  { type: "led", id: "led_c2d3", x: 410, y: 130, label: "1", color: "green", highlight: true },
  { type: "led", id: "led_c2co", x: 450, y: 130, label: "0", color: "red", highlight: true },
  { type: "label", id: "lbl_c2r", x: 380, y: 170, text: "Result: 1111 (borrow) = -1 ✓" },
  // Summary
  { type: "label", id: "lbl_sum1", x: 250, y: 230, text: "Summary:" },
  { type: "label", id: "lbl_sum2", x: 250, y: 260, text: "Cout=1: Result is positive or zero" },
  { type: "label", id: "lbl_sum3", x: 250, y: 290, text: "Cout=0: Result is negative (borrow occurred)" },
]};

/** Step 9: Record observations */
export const step09: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 250, y: 20, text: "4-bit Subtractor — Summary" },
  // Circuit overview
  { type: "label", id: "lbl_circuit", x: 250, y: 60, text: "Circuit: A + B' + 1 (2's complement)" },
  // Components
  { type: "label", id: "lbl_comp", x: 100, y: 100, text: "Components:" },
  { type: "label", id: "lbl_c1", x: 100, y: 130, text: "- 4 NOT gates (invert B)" },
  { type: "label", id: "lbl_c2", x: 100, y: 155, text: "- 4-bit ripple adder" },
  { type: "label", id: "lbl_c3", x: 100, y: 180, text: "- Cin fixed at 1" },
  // Simplified final circuit
  { type: "not-gate", id: "NOT", x: 350, y: 100 },
  { type: "label", id: "lbl_not", x: 350, y: 130, text: "B inverter" },
  { type: "label", id: "lbl_adder", x: 350, y: 170, text: "[4-bit Adder]" },
  // Key points
  { type: "label", id: "lbl_key", x: 250, y: 230, text: "Key Points:" },
  { type: "label", id: "lbl_k1", x: 250, y: 260, text: "1. Same adder hardware can do subtraction" },
  { type: "label", id: "lbl_k2", x: 250, y: 285, text: "2. Only need inverters and Cin=1" },
  { type: "label", id: "lbl_k3", x: 250, y: 310, text: "3. Cout indicates sign of result" },
]};

/** Indexed array */
export const binarySubtractor4bitStepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05,
  step06, step07, step08, step09,
];

/** Theory diagram */
export const binarySubtractor4bitTheoryDiagram: SchematicData = step05;
