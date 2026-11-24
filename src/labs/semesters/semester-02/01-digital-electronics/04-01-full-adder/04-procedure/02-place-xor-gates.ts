import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Place the XOR IC (74HC86)",
  body: "Insert one 74HC86 at columns 8 to 14 — it holds four XOR gates and both are needed here. Gate 1 (XOR1, pins 1–3) produces the partial sum A ⊕ B; gate 2 (XOR2, pins 4–6) adds Cin to give the final Sum. Power the IC: purple wire from the bottom +5 V rail to pin 14 (VCC), black wire from pin 7 (GND) to the ground rail.",
  show: ["bb", "psu", "w_rail_link", "xor1", "w_vcc_xor1", "w_gnd_xor1"],
};
