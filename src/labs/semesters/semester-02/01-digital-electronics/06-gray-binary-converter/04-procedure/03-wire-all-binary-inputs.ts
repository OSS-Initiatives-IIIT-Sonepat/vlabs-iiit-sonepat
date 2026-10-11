import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Wire binary inputs B₃, B₂, B₁, and B₀.",
  body:
    "Distribute 4-bit binary inputs from tie-point columns 1–4: " +
    "B₃ (red wires) to xor1.A (col 8) and tie-point column 12 for the G₃ pass-through line; " +
    "B₂ (orange wires) to xor1.B (col 9) and xor2.A (col 22); " +
    "B₁ (blue wires) to xor2.B (col 23) and xor3.A (col 36); " +
    "and B₀ (green wire) to xor3.B (col 37).",
  show: [
    "bb",
    "psu",
    "w_rail_link",
    "xor1",
    "xor2",
    "xor3",
    "w_vcc_xor1",
    "w_gnd_xor1",
    "w_vcc_xor2",
    "w_gnd_xor2",
    "w_vcc_xor3",
    "w_gnd_xor3",
    "w_b3_xor1",
    "w_b3_g3",
    "w_b3_to_r",
    "w_b2_xor1",
    "w_b2_xor2",
    "w_b1_xor2",
    "w_b1_xor3",
    "w_b0_xor3",
  ],
  highlight: "w_b3_xor1",
  activeInputs: {
    B3: 0,
    B2: 0,
    B1: 0,
    B0: 0,
  },
};
