import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Wire binary inputs B₃, B₂, B₁, and B₀.",
  body: "The binary inputs are tie columns 2 (B₃), 3 (B₂), 4 (B₁) and 5 (B₀) in the top bank. B₃ (red) goes to pin 1. B₂ (orange) goes to pins 2 and 4. B₁ (blue) goes to pins 5 and 9. B₀ (white) goes to pin 10. Each neighbouring pair of bits now meets at one XOR gate.",
  show: [
    "bb",
    "psu",
    "w_rail_link",
    "xor1",
    "w_vcc_xor1",
    "w_gnd_xor1",
    "w_b3_xor1",
    "w_b3_g3",
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
