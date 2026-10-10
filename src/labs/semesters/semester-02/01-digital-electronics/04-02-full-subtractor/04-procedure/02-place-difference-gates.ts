import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Place the difference XOR gates (74HC86)",
  body: "Insert XOR1 (columns 5 to 11) and XOR2 (columns 14 to 20). XOR1 produces x = A ⊕ B and XOR2 combines x with the borrow-in to give the Difference D = A ⊕ B ⊕ Bin.",
  show: [
    "bb",
    "xor1",
    "xor2",
    "psu",
    "w_rail_link",
    "w_vcc_xor1",
    "w_gnd_xor1",
    "w_vcc_xor2",
    "w_gnd_xor2",
  ],
  highlight: "xor2",
};
