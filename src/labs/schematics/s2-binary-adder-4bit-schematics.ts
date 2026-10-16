import { type SchematicData } from "@/labs/CircuitSchematic";

/*
 * 4-bit Ripple-Carry Adder — progressive 2D schematics.
 * Uses 4 full adder stages cascaded: FA0, FA1, FA2, FA3
 * A3-A0, B3-B0 inputs; S3-S0, Cout outputs
 * Each full adder: Sum = A ⊕ B ⊕ Cin, Cout = AB + Cin(A⊕B)
 */

const W = 500;
const H = 340;

/** Step 1: Place breadboard - Introduction */
export const step01: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "label",
      id: "lbl_title",
      x: 250,
      y: 20,
      text: "4-bit Ripple-Carry Adder",
    },
    {
      type: "label",
      id: "lbl_eq",
      x: 250,
      y: 60,
      text: "A[3:0] + B[3:0] = S[3:0] + Cout",
    },
    {
      type: "label",
      id: "lbl_desc1",
      x: 250,
      y: 100,
      text: "4 full adder stages cascaded",
    },
    {
      type: "label",
      id: "lbl_desc2",
      x: 250,
      y: 130,
      text: "Carry propagates: C0→C1→C2→C3→Cout",
    },
    {
      type: "label",
      id: "lbl_desc3",
      x: 250,
      y: 170,
      text: "Initial carry (Cin) = 0 for addition",
    },
  ],
};

/** Step 2: Connect supply - Show block diagram */
export const step02: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "label",
      id: "lbl_title",
      x: 250,
      y: 20,
      text: "4-bit Adder — Block Diagram",
    },
    // Four FA blocks represented as labeled boxes
    { type: "label", id: "fa0", x: 80, y: 160, text: "[FA0]" },
    { type: "label", id: "fa1", x: 180, y: 160, text: "[FA1]" },
    { type: "label", id: "fa2", x: 280, y: 160, text: "[FA2]" },
    { type: "label", id: "fa3", x: 380, y: 160, text: "[FA3]" },
    // Carry chain
    {
      type: "wire",
      id: "w_cin",
      points: [
        { x: 20, y: 160 },
        { x: 55, y: 160 },
      ],
      highlight: true,
    },
    {
      type: "wire",
      id: "w_c0",
      points: [
        { x: 105, y: 160 },
        { x: 155, y: 160 },
      ],
      highlight: true,
    },
    {
      type: "wire",
      id: "w_c1",
      points: [
        { x: 205, y: 160 },
        { x: 255, y: 160 },
      ],
      highlight: true,
    },
    {
      type: "wire",
      id: "w_c2",
      points: [
        { x: 305, y: 160 },
        { x: 355, y: 160 },
      ],
      highlight: true,
    },
    {
      type: "wire",
      id: "w_cout",
      points: [
        { x: 405, y: 160 },
        { x: 480, y: 160 },
      ],
      highlight: true,
    },
    { type: "label", id: "lbl_cin", x: 20, y: 180, text: "Cin=0" },
    { type: "label", id: "lbl_cout", x: 460, y: 180, text: "Cout" },
  ],
};

/** Step 3: Place ICs - Show FA stages */
export const step03: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "label",
      id: "lbl_title",
      x: 250,
      y: 20,
      text: "Full Adder Stages",
    },
    // FA0 - Bit 0 (LSB)
    { type: "xor-gate", id: "XOR0a", x: 60, y: 80, highlight: true },
    { type: "xor-gate", id: "XOR0b", x: 60, y: 140 },
    { type: "and-gate", id: "AND0a", x: 60, y: 200 },
    { type: "and-gate", id: "AND0b", x: 60, y: 260 },
    { type: "or-gate", id: "OR0", x: 120, y: 230 },
    { type: "label", id: "lbl_fa0", x: 90, y: 300, text: "FA0 (Bit 0)" },
    // Simplified representation for FA1-FA3
    { type: "label", id: "fa1", x: 200, y: 160, text: "[FA1]" },
    { type: "label", id: "fa2", x: 300, y: 160, text: "[FA2]" },
    { type: "label", id: "fa3", x: 400, y: 160, text: "[FA3]" },
  ],
};

/** Step 4: Place output LEDs */
export const step04: SchematicData = {
  width: W,
  height: H,
  elements: [
    { type: "label", id: "lbl_title", x: 250, y: 20, text: "Output LEDs" },
    // FA block labels
    { type: "label", id: "fa0", x: 80, y: 120, text: "[FA0]" },
    { type: "label", id: "fa1", x: 180, y: 120, text: "[FA1]" },
    { type: "label", id: "fa2", x: 280, y: 120, text: "[FA2]" },
    { type: "label", id: "fa3", x: 380, y: 120, text: "[FA3]" },
    // Output wires
    {
      type: "wire",
      id: "w_s0",
      points: [
        { x: 80, y: 150 },
        { x: 80, y: 200 },
      ],
    },
    {
      type: "wire",
      id: "w_s1",
      points: [
        { x: 180, y: 150 },
        { x: 180, y: 200 },
      ],
    },
    {
      type: "wire",
      id: "w_s2",
      points: [
        { x: 280, y: 150 },
        { x: 280, y: 200 },
      ],
    },
    {
      type: "wire",
      id: "w_s3",
      points: [
        { x: 380, y: 150 },
        { x: 380, y: 200 },
      ],
    },
    {
      type: "wire",
      id: "w_cout_led",
      points: [
        { x: 450, y: 120 },
        { x: 450, y: 200 },
      ],
    },
    // LEDs
    {
      type: "led",
      id: "led_s0",
      x: 80,
      y: 220,
      label: "S0",
      color: "green",
      highlight: true,
    },
    {
      type: "led",
      id: "led_s1",
      x: 180,
      y: 220,
      label: "S1",
      color: "green",
      highlight: true,
    },
    {
      type: "led",
      id: "led_s2",
      x: 280,
      y: 220,
      label: "S2",
      color: "green",
      highlight: true,
    },
    {
      type: "led",
      id: "led_s3",
      x: 380,
      y: 220,
      label: "S3",
      color: "green",
      highlight: true,
    },
    {
      type: "led",
      id: "led_cout",
      x: 450,
      y: 220,
      label: "Cout",
      color: "red",
      highlight: true,
    },
    {
      type: "label",
      id: "lbl_sum",
      x: 250,
      y: 270,
      text: "Sum bits: S3 S2 S1 S0",
    },
  ],
};

/** Step 5: Wire bit 0 (FA0) */
export const step05: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "label",
      id: "lbl_title",
      x: 250,
      y: 20,
      text: "Wire FA0 — Bit 0 (LSB)",
    },
    // FA0 gates
    { type: "xor-gate", id: "XOR0a", x: 80, y: 70 },
    { type: "xor-gate", id: "XOR0b", x: 80, y: 130, highlight: true },
    { type: "and-gate", id: "AND0a", x: 80, y: 190 },
    { type: "and-gate", id: "AND0b", x: 80, y: 250 },
    { type: "or-gate", id: "OR0", x: 140, y: 220 },
    // A0, B0 inputs
    {
      type: "wire",
      id: "w_a0",
      points: [
        { x: 20, y: 62 },
        { x: 52, y: 62 },
      ],
      highlight: true,
    },
    {
      type: "wire",
      id: "w_b0",
      points: [
        { x: 20, y: 78 },
        { x: 52, y: 78 },
      ],
      highlight: true,
    },
    // A0 fork to XOR0a and AND0a
    {
      type: "wire",
      id: "w_a0_and",
      points: [
        { x: 35, y: 62 },
        { x: 35, y: 182 },
        { x: 54, y: 182 },
      ],
    },
    // B0 fork to XOR0a and AND0a
    {
      type: "wire",
      id: "w_b0_and",
      points: [
        { x: 40, y: 78 },
        { x: 40, y: 198 },
        { x: 54, y: 198 },
      ],
    },
    // Cin (=0)
    {
      type: "wire",
      id: "w_cin",
      points: [
        { x: 20, y: 138 },
        { x: 52, y: 138 },
      ],
      highlight: true,
    },
    // XOR0a to XOR0b
    {
      type: "wire",
      id: "w_xor0a_xor0b",
      points: [
        { x: 108, y: 70 },
        { x: 120, y: 70 },
        { x: 120, y: 100 },
        { x: 40, y: 100 },
        { x: 40, y: 122 },
        { x: 52, y: 122 },
      ],
    },
    // Sum output
    {
      type: "wire",
      id: "w_s0",
      points: [
        { x: 108, y: 130 },
        { x: 180, y: 130 },
      ],
    },
    { type: "led", id: "led_s0", x: 190, y: 130, label: "S0", color: "green" },
    // Junctions
    { type: "junction", id: "j_a0", x: 35, y: 62 },
    { type: "junction", id: "j_b0", x: 40, y: 78 },
    // Labels
    { type: "label", id: "lbl_a0", x: 10, y: 62, text: "A0" },
    { type: "label", id: "lbl_b0", x: 10, y: 78, text: "B0" },
    { type: "label", id: "lbl_cin", x: 10, y: 138, text: "Cin" },
  ],
};

/** Step 6: Wire bit 1 (FA1) */
export const step06: SchematicData = {
  width: W,
  height: H,
  elements: [
    { type: "label", id: "lbl_title", x: 250, y: 20, text: "Wire FA1 — Bit 1" },
    // Simplified FA blocks with carry chain shown
    { type: "label", id: "fa0", x: 60, y: 100, text: "[FA0]" },
    { type: "label", id: "fa1", x: 180, y: 100, text: "[FA1]" },
    { type: "label", id: "fa2", x: 300, y: 100, text: "[FA2]" },
    { type: "label", id: "fa3", x: 420, y: 100, text: "[FA3]" },
    // Input labels for FA1
    {
      type: "wire",
      id: "w_a1",
      points: [
        { x: 160, y: 70 },
        { x: 160, y: 85 },
      ],
      highlight: true,
    },
    {
      type: "wire",
      id: "w_b1",
      points: [
        { x: 200, y: 70 },
        { x: 200, y: 85 },
      ],
      highlight: true,
    },
    { type: "label", id: "lbl_a1", x: 155, y: 60, text: "A1" },
    { type: "label", id: "lbl_b1", x: 195, y: 60, text: "B1" },
    // Carry chain highlighted
    {
      type: "wire",
      id: "w_c0",
      points: [
        { x: 85, y: 100 },
        { x: 155, y: 100 },
      ],
      highlight: true,
    },
    {
      type: "wire",
      id: "w_c1",
      points: [
        { x: 205, y: 100 },
        { x: 275, y: 100 },
      ],
    },
    {
      type: "wire",
      id: "w_c2",
      points: [
        { x: 325, y: 100 },
        { x: 395, y: 100 },
      ],
    },
    {
      type: "wire",
      id: "w_cout",
      points: [
        { x: 445, y: 100 },
        { x: 480, y: 100 },
      ],
    },
    // Output
    {
      type: "wire",
      id: "w_s1",
      points: [
        { x: 180, y: 115 },
        { x: 180, y: 160 },
      ],
    },
    {
      type: "led",
      id: "led_s1",
      x: 180,
      y: 180,
      label: "S1",
      color: "green",
      highlight: true,
    },
    { type: "label", id: "lbl_c0", x: 115, y: 120, text: "C0" },
  ],
};

/** Step 7: Wire bit 2 (FA2) */
export const step07: SchematicData = {
  width: W,
  height: H,
  elements: [
    { type: "label", id: "lbl_title", x: 250, y: 20, text: "Wire FA2 — Bit 2" },
    // FA blocks
    { type: "label", id: "fa0", x: 60, y: 100, text: "[FA0]" },
    { type: "label", id: "fa1", x: 180, y: 100, text: "[FA1]" },
    { type: "label", id: "fa2", x: 300, y: 100, text: "[FA2]" },
    { type: "label", id: "fa3", x: 420, y: 100, text: "[FA3]" },
    // Input labels for FA2
    {
      type: "wire",
      id: "w_a2",
      points: [
        { x: 280, y: 70 },
        { x: 280, y: 85 },
      ],
      highlight: true,
    },
    {
      type: "wire",
      id: "w_b2",
      points: [
        { x: 320, y: 70 },
        { x: 320, y: 85 },
      ],
      highlight: true,
    },
    { type: "label", id: "lbl_a2", x: 275, y: 60, text: "A2" },
    { type: "label", id: "lbl_b2", x: 315, y: 60, text: "B2" },
    // Carry chain
    {
      type: "wire",
      id: "w_c0",
      points: [
        { x: 85, y: 100 },
        { x: 155, y: 100 },
      ],
    },
    {
      type: "wire",
      id: "w_c1",
      points: [
        { x: 205, y: 100 },
        { x: 275, y: 100 },
      ],
      highlight: true,
    },
    {
      type: "wire",
      id: "w_c2",
      points: [
        { x: 325, y: 100 },
        { x: 395, y: 100 },
      ],
    },
    {
      type: "wire",
      id: "w_cout",
      points: [
        { x: 445, y: 100 },
        { x: 480, y: 100 },
      ],
    },
    // Output
    {
      type: "wire",
      id: "w_s2",
      points: [
        { x: 300, y: 115 },
        { x: 300, y: 160 },
      ],
    },
    {
      type: "led",
      id: "led_s2",
      x: 300,
      y: 180,
      label: "S2",
      color: "green",
      highlight: true,
    },
    { type: "label", id: "lbl_c1", x: 235, y: 120, text: "C1" },
  ],
};

/** Step 8: Wire bit 3 (FA3) */
export const step08: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "label",
      id: "lbl_title",
      x: 250,
      y: 20,
      text: "Wire FA3 — Bit 3 (MSB)",
    },
    // FA blocks
    { type: "label", id: "fa0", x: 60, y: 100, text: "[FA0]" },
    { type: "label", id: "fa1", x: 180, y: 100, text: "[FA1]" },
    { type: "label", id: "fa2", x: 300, y: 100, text: "[FA2]" },
    { type: "label", id: "fa3", x: 420, y: 100, text: "[FA3]" },
    // Input labels for FA3
    {
      type: "wire",
      id: "w_a3",
      points: [
        { x: 400, y: 70 },
        { x: 400, y: 85 },
      ],
      highlight: true,
    },
    {
      type: "wire",
      id: "w_b3",
      points: [
        { x: 440, y: 70 },
        { x: 440, y: 85 },
      ],
      highlight: true,
    },
    { type: "label", id: "lbl_a3", x: 395, y: 60, text: "A3" },
    { type: "label", id: "lbl_b3", x: 435, y: 60, text: "B3" },
    // Carry chain
    {
      type: "wire",
      id: "w_c0",
      points: [
        { x: 85, y: 100 },
        { x: 155, y: 100 },
      ],
    },
    {
      type: "wire",
      id: "w_c1",
      points: [
        { x: 205, y: 100 },
        { x: 275, y: 100 },
      ],
    },
    {
      type: "wire",
      id: "w_c2",
      points: [
        { x: 325, y: 100 },
        { x: 395, y: 100 },
      ],
      highlight: true,
    },
    {
      type: "wire",
      id: "w_cout",
      points: [
        { x: 445, y: 100 },
        { x: 480, y: 100 },
      ],
    },
    // Output
    {
      type: "wire",
      id: "w_s3",
      points: [
        { x: 420, y: 115 },
        { x: 420, y: 160 },
      ],
    },
    {
      type: "led",
      id: "led_s3",
      x: 420,
      y: 180,
      label: "S3",
      color: "green",
      highlight: true,
    },
    { type: "label", id: "lbl_c2", x: 355, y: 120, text: "C2" },
  ],
};

/** Step 9: Connect outputs - Complete circuit */
export const step09: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "label",
      id: "lbl_title",
      x: 250,
      y: 20,
      text: "4-bit Adder — Complete",
    },
    // FA blocks
    { type: "label", id: "fa0", x: 60, y: 120, text: "[FA0]" },
    { type: "label", id: "fa1", x: 160, y: 120, text: "[FA1]" },
    { type: "label", id: "fa2", x: 260, y: 120, text: "[FA2]" },
    { type: "label", id: "fa3", x: 360, y: 120, text: "[FA3]" },
    // All inputs
    { type: "label", id: "lbl_a", x: 30, y: 60, text: "A:" },
    { type: "label", id: "lbl_a3", x: 340, y: 60, text: "A3" },
    { type: "label", id: "lbl_a2", x: 240, y: 60, text: "A2" },
    { type: "label", id: "lbl_a1", x: 140, y: 60, text: "A1" },
    { type: "label", id: "lbl_a0", x: 40, y: 60, text: "A0" },
    { type: "label", id: "lbl_b", x: 30, y: 80, text: "B:" },
    { type: "label", id: "lbl_b3", x: 380, y: 60, text: "B3" },
    { type: "label", id: "lbl_b2", x: 280, y: 60, text: "B2" },
    { type: "label", id: "lbl_b1", x: 180, y: 60, text: "B1" },
    { type: "label", id: "lbl_b0", x: 80, y: 60, text: "B0" },
    // Input wires to FAs
    {
      type: "wire",
      id: "w_a0in",
      points: [
        { x: 50, y: 70 },
        { x: 50, y: 105 },
      ],
    },
    {
      type: "wire",
      id: "w_b0in",
      points: [
        { x: 70, y: 70 },
        { x: 70, y: 105 },
      ],
    },
    {
      type: "wire",
      id: "w_a1in",
      points: [
        { x: 150, y: 70 },
        { x: 150, y: 105 },
      ],
    },
    {
      type: "wire",
      id: "w_b1in",
      points: [
        { x: 170, y: 70 },
        { x: 170, y: 105 },
      ],
    },
    {
      type: "wire",
      id: "w_a2in",
      points: [
        { x: 250, y: 70 },
        { x: 250, y: 105 },
      ],
    },
    {
      type: "wire",
      id: "w_b2in",
      points: [
        { x: 270, y: 70 },
        { x: 270, y: 105 },
      ],
    },
    {
      type: "wire",
      id: "w_a3in",
      points: [
        { x: 350, y: 70 },
        { x: 350, y: 105 },
      ],
    },
    {
      type: "wire",
      id: "w_b3in",
      points: [
        { x: 370, y: 70 },
        { x: 370, y: 105 },
      ],
    },
    // Carry chain
    {
      type: "wire",
      id: "w_cin",
      points: [
        { x: 20, y: 120 },
        { x: 35, y: 120 },
      ],
    },
    {
      type: "wire",
      id: "w_c0",
      points: [
        { x: 85, y: 120 },
        { x: 135, y: 120 },
      ],
    },
    {
      type: "wire",
      id: "w_c1",
      points: [
        { x: 185, y: 120 },
        { x: 235, y: 120 },
      ],
    },
    {
      type: "wire",
      id: "w_c2",
      points: [
        { x: 285, y: 120 },
        { x: 335, y: 120 },
      ],
    },
    {
      type: "wire",
      id: "w_cout",
      points: [
        { x: 385, y: 120 },
        { x: 440, y: 120 },
      ],
    },
    { type: "label", id: "lbl_cin", x: 10, y: 140, text: "0" },
    // Sum outputs
    {
      type: "wire",
      id: "w_s0",
      points: [
        { x: 60, y: 135 },
        { x: 60, y: 180 },
      ],
    },
    {
      type: "wire",
      id: "w_s1",
      points: [
        { x: 160, y: 135 },
        { x: 160, y: 180 },
      ],
    },
    {
      type: "wire",
      id: "w_s2",
      points: [
        { x: 260, y: 135 },
        { x: 260, y: 180 },
      ],
    },
    {
      type: "wire",
      id: "w_s3",
      points: [
        { x: 360, y: 135 },
        { x: 360, y: 180 },
      ],
    },
    {
      type: "wire",
      id: "w_cout_led",
      points: [
        { x: 440, y: 120 },
        { x: 440, y: 180 },
      ],
    },
    // LEDs
    { type: "led", id: "led_s0", x: 60, y: 200, label: "S0", color: "green" },
    { type: "led", id: "led_s1", x: 160, y: 200, label: "S1", color: "green" },
    { type: "led", id: "led_s2", x: 260, y: 200, label: "S2", color: "green" },
    { type: "led", id: "led_s3", x: 360, y: 200, label: "S3", color: "green" },
    {
      type: "led",
      id: "led_cout",
      x: 440,
      y: 200,
      label: "Cout",
      color: "red",
    },
    // Result label
    {
      type: "label",
      id: "lbl_result",
      x: 250,
      y: 260,
      text: "Result: Cout S3 S2 S1 S0",
    },
  ],
};

/** Step 10: Test 5 + 3 = 8 */
export const step10: SchematicData = {
  width: W,
  height: H,
  elements: [
    { type: "label", id: "lbl_title", x: 250, y: 20, text: "Test: 5 + 3 = 8" },
    { type: "label", id: "lbl_a", x: 250, y: 60, text: "A = 0101 (5)" },
    { type: "label", id: "lbl_b", x: 250, y: 80, text: "B = 0011 (3)" },
    // FA blocks
    { type: "label", id: "fa0", x: 60, y: 140, text: "[FA0]" },
    { type: "label", id: "fa1", x: 160, y: 140, text: "[FA1]" },
    { type: "label", id: "fa2", x: 260, y: 140, text: "[FA2]" },
    { type: "label", id: "fa3", x: 360, y: 140, text: "[FA3]" },
    // Carry chain
    {
      type: "wire",
      id: "w_c0",
      points: [
        { x: 85, y: 140 },
        { x: 135, y: 140 },
      ],
    },
    {
      type: "wire",
      id: "w_c1",
      points: [
        { x: 185, y: 140 },
        { x: 235, y: 140 },
      ],
    },
    {
      type: "wire",
      id: "w_c2",
      points: [
        { x: 285, y: 140 },
        { x: 335, y: 140 },
      ],
    },
    {
      type: "wire",
      id: "w_cout",
      points: [
        { x: 385, y: 140 },
        { x: 440, y: 140 },
      ],
    },
    // Sum outputs
    {
      type: "wire",
      id: "w_s0",
      points: [
        { x: 60, y: 155 },
        { x: 60, y: 200 },
      ],
    },
    {
      type: "wire",
      id: "w_s1",
      points: [
        { x: 160, y: 155 },
        { x: 160, y: 200 },
      ],
    },
    {
      type: "wire",
      id: "w_s2",
      points: [
        { x: 260, y: 155 },
        { x: 260, y: 200 },
      ],
    },
    {
      type: "wire",
      id: "w_s3",
      points: [
        { x: 360, y: 155 },
        { x: 360, y: 200 },
      ],
    },
    {
      type: "wire",
      id: "w_cout_led",
      points: [
        { x: 440, y: 140 },
        { x: 440, y: 200 },
      ],
    },
    // LEDs - Result: 01000 (8)
    { type: "led", id: "led_s0", x: 60, y: 220, label: "0", color: "green" },
    { type: "led", id: "led_s1", x: 160, y: 220, label: "0", color: "green" },
    { type: "led", id: "led_s2", x: 260, y: 220, label: "0", color: "green" },
    {
      type: "led",
      id: "led_s3",
      x: 360,
      y: 220,
      label: "1",
      color: "green",
      highlight: true,
    },
    { type: "led", id: "led_cout", x: 440, y: 220, label: "0", color: "red" },
    { type: "label", id: "lbl_result", x: 250, y: 280, text: "S = 1000 (8) ✓" },
  ],
};

/** Step 11: Test 15 + 1 = 16 (overflow) */
export const step11: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "label",
      id: "lbl_title",
      x: 250,
      y: 20,
      text: "Test: 15 + 1 = 16 (Overflow)",
    },
    { type: "label", id: "lbl_a", x: 250, y: 60, text: "A = 1111 (15)" },
    { type: "label", id: "lbl_b", x: 250, y: 80, text: "B = 0001 (1)" },
    // FA blocks
    { type: "label", id: "fa0", x: 60, y: 140, text: "[FA0]" },
    { type: "label", id: "fa1", x: 160, y: 140, text: "[FA1]" },
    { type: "label", id: "fa2", x: 260, y: 140, text: "[FA2]" },
    { type: "label", id: "fa3", x: 360, y: 140, text: "[FA3]" },
    // Carry chain - all carries propagate
    {
      type: "wire",
      id: "w_c0",
      points: [
        { x: 85, y: 140 },
        { x: 135, y: 140 },
      ],
      highlight: true,
    },
    {
      type: "wire",
      id: "w_c1",
      points: [
        { x: 185, y: 140 },
        { x: 235, y: 140 },
      ],
      highlight: true,
    },
    {
      type: "wire",
      id: "w_c2",
      points: [
        { x: 285, y: 140 },
        { x: 335, y: 140 },
      ],
      highlight: true,
    },
    {
      type: "wire",
      id: "w_cout",
      points: [
        { x: 385, y: 140 },
        { x: 440, y: 140 },
      ],
      highlight: true,
    },
    // Sum outputs
    {
      type: "wire",
      id: "w_s0",
      points: [
        { x: 60, y: 155 },
        { x: 60, y: 200 },
      ],
    },
    {
      type: "wire",
      id: "w_s1",
      points: [
        { x: 160, y: 155 },
        { x: 160, y: 200 },
      ],
    },
    {
      type: "wire",
      id: "w_s2",
      points: [
        { x: 260, y: 155 },
        { x: 260, y: 200 },
      ],
    },
    {
      type: "wire",
      id: "w_s3",
      points: [
        { x: 360, y: 155 },
        { x: 360, y: 200 },
      ],
    },
    {
      type: "wire",
      id: "w_cout_led",
      points: [
        { x: 440, y: 140 },
        { x: 440, y: 200 },
      ],
    },
    // LEDs - Result: 10000 (16)
    { type: "led", id: "led_s0", x: 60, y: 220, label: "0", color: "green" },
    { type: "led", id: "led_s1", x: 160, y: 220, label: "0", color: "green" },
    { type: "led", id: "led_s2", x: 260, y: 220, label: "0", color: "green" },
    { type: "led", id: "led_s3", x: 360, y: 220, label: "0", color: "green" },
    {
      type: "led",
      id: "led_cout",
      x: 440,
      y: 220,
      label: "1",
      color: "red",
      highlight: true,
    },
    {
      type: "label",
      id: "lbl_result",
      x: 250,
      y: 280,
      text: "S = 10000 (16) — Cout indicates overflow!",
    },
  ],
};

/** Step 12: Test maximum (15 + 15 = 30) */
export const step12: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "label",
      id: "lbl_title",
      x: 250,
      y: 20,
      text: "Test: 15 + 15 = 30 (Maximum)",
    },
    { type: "label", id: "lbl_a", x: 250, y: 60, text: "A = 1111 (15)" },
    { type: "label", id: "lbl_b", x: 250, y: 80, text: "B = 1111 (15)" },
    // FA blocks
    { type: "label", id: "fa0", x: 60, y: 140, text: "[FA0]" },
    { type: "label", id: "fa1", x: 160, y: 140, text: "[FA1]" },
    { type: "label", id: "fa2", x: 260, y: 140, text: "[FA2]" },
    { type: "label", id: "fa3", x: 360, y: 140, text: "[FA3]" },
    // Carry chain
    {
      type: "wire",
      id: "w_c0",
      points: [
        { x: 85, y: 140 },
        { x: 135, y: 140 },
      ],
      highlight: true,
    },
    {
      type: "wire",
      id: "w_c1",
      points: [
        { x: 185, y: 140 },
        { x: 235, y: 140 },
      ],
      highlight: true,
    },
    {
      type: "wire",
      id: "w_c2",
      points: [
        { x: 285, y: 140 },
        { x: 335, y: 140 },
      ],
      highlight: true,
    },
    {
      type: "wire",
      id: "w_cout",
      points: [
        { x: 385, y: 140 },
        { x: 440, y: 140 },
      ],
      highlight: true,
    },
    // Sum outputs
    {
      type: "wire",
      id: "w_s0",
      points: [
        { x: 60, y: 155 },
        { x: 60, y: 200 },
      ],
    },
    {
      type: "wire",
      id: "w_s1",
      points: [
        { x: 160, y: 155 },
        { x: 160, y: 200 },
      ],
    },
    {
      type: "wire",
      id: "w_s2",
      points: [
        { x: 260, y: 155 },
        { x: 260, y: 200 },
      ],
    },
    {
      type: "wire",
      id: "w_s3",
      points: [
        { x: 360, y: 155 },
        { x: 360, y: 200 },
      ],
    },
    {
      type: "wire",
      id: "w_cout_led",
      points: [
        { x: 440, y: 140 },
        { x: 440, y: 200 },
      ],
    },
    // LEDs - Result: 11110 (30)
    { type: "led", id: "led_s0", x: 60, y: 220, label: "0", color: "green" },
    {
      type: "led",
      id: "led_s1",
      x: 160,
      y: 220,
      label: "1",
      color: "green",
      highlight: true,
    },
    {
      type: "led",
      id: "led_s2",
      x: 260,
      y: 220,
      label: "1",
      color: "green",
      highlight: true,
    },
    {
      type: "led",
      id: "led_s3",
      x: 360,
      y: 220,
      label: "1",
      color: "green",
      highlight: true,
    },
    {
      type: "led",
      id: "led_cout",
      x: 440,
      y: 220,
      label: "1",
      color: "red",
      highlight: true,
    },
    {
      type: "label",
      id: "lbl_result",
      x: 250,
      y: 280,
      text: "S = 11110 (30) — Maximum 4-bit result with carry",
    },
  ],
};

/** Indexed array */
export const binaryAdder4bitStepSchematics: SchematicData[] = [
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
  step11,
  step12,
];

/** Theory diagram */
export const binaryAdder4bitTheoryDiagram: SchematicData = step09;
