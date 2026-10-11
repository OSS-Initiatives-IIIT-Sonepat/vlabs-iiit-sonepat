import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Place the borrow gates (74HC86, 74HC08)",
  body: "Insert XOR3 (t = B ⊕ Bin), AND1 (g = x · t) and XOR4 (Bout = Bin ⊕ g). Together they select the borrow-out: Bout = B when A ≠ B, and Bout = Bin when A = B. Keep at least two free columns between ICs.",
  show: [
    "bb",
    "xor1",
    "xor2",
    "xor3",
    "and1",
    "xor4",
    "psu",
    "w_rail_link",
    "w_vcc_xor1",
    "w_gnd_xor1",
    "w_vcc_xor2",
    "w_gnd_xor2",
    "w_vcc_xor3",
    "w_gnd_xor3",
    "w_vcc_and1",
    "w_gnd_and1",
    "w_vcc_xor4",
    "w_gnd_xor4",
  ],
  highlight: "xor4",
};
