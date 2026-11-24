import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Place the AND IC (74HC08)",
  body: "Insert one 74HC08 at columns 18 to 24 and power it. The borrow uses XOR3 (gate 3 of the 74HC86, t = B ⊕ Bin), AND1 (gate 1 of the 74HC08, g = x · t) and XOR4 (gate 4 of the 74HC86, Bout = Bin ⊕ g), so the whole subtractor needs only these two ICs. Together they select the borrow-out: Bout = B when A ≠ B, and Bout = Bin when A = B.",
  show: [
    "bb",
    "xor1",
    "and1",
    "psu",
    "w_rail_link",
    "w_vcc_xor1",
    "w_gnd_xor1",
    "w_vcc_and1",
    "w_gnd_and1",
  ],
};
