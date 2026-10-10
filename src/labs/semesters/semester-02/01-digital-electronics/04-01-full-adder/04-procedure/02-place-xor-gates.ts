import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Place the XOR gates (74HC86)",
  body: "Insert two XOR gates. XOR1 (columns 5 to 11) produces the partial sum A ⊕ B. XOR2 (columns 23 to 29) adds Cin to that partial sum to give the final Sum. Power each IC: purple wire from the bottom +5 V rail to pin 14 (VCC), black wire from pin 7 (GND) to the ground rail.",
  show: [
    "bb",
    "psu",
    "w_rail_link",
    "xor1",
    "xor2",
    "w_vcc_xor1",
    "w_gnd_xor1",
    "w_vcc_xor2",
    "w_gnd_xor2",
  ],
  highlight: "xor2",
};
