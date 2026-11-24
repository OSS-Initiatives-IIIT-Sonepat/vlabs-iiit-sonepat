import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Place the XOR IC (74HC86)",
  body: "Insert one 74HC86 at columns 8 to 14 and power it (purple wire to pin 14, black wire from pin 7). All four of its XOR gates are used: XOR1 (gate 1) produces x = A ⊕ B and XOR2 (gate 2) combines x with the borrow-in to give the Difference D = A ⊕ B ⊕ Bin.",
  show: ["bb", "xor1", "psu", "w_rail_link", "w_vcc_xor1", "w_gnd_xor1"],
};
