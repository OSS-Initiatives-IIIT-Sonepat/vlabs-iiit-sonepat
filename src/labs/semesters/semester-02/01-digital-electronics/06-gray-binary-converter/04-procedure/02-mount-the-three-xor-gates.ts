import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Mount the three 74HC86 XOR gate ICs and wire power rails.",
  body:
    "Insert three 74HC86 XOR gate IC packages onto row e straddling the central isolation groove: " +
    "xor1 at column 8 (produces G₂), xor2 at column 22 (produces G₁), and xor3 at column 36 (produces G₀). " +
    "Connect pin 14 of each IC to the bottom +5 V rail using purple wires, and pin 7 of each IC to the top GND rail using black wires.",
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
  ],
  highlight: "xor1",
};
