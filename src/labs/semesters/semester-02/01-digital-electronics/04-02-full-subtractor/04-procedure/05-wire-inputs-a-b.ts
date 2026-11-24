import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Connect inputs A and B",
  body: "Red wire: A to XOR1. Blue wires: B to XOR1 and to XOR3. XOR1 now outputs x = A ⊕ B.",
  show: [
    "bb",
    "xor1",
    "and1",
    "r_diff",
    "led_diff",
    "r_bout",
    "led_bout",
    "w_a_xor1",
    "w_b_xor1",
    "w_b_xor3",
    "psu",
    "w_rail_link",
    "w_vcc_xor1",
    "w_gnd_xor1",
    "w_vcc_and1",
    "w_gnd_and1",
  ],
  highlight: "w_b_xor3",
};
