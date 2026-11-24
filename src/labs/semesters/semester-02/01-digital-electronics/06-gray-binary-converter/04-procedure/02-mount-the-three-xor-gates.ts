import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Mount the 74HC86 XOR IC.",
  body: "Insert one 74HC86 at columns 7–13, straddling the centre groove, and power it (purple jumper to pin 14, black jumper from pin 7). It holds four XOR gates; binary → Gray needs three: gate 1 makes G₂, gate 2 makes G₁ and gate 3 makes G₀.",
  show: ["bb", "psu", "w_rail_link", "xor1", "w_vcc_xor1", "w_gnd_xor1"],
  highlight: "xor1",
};
