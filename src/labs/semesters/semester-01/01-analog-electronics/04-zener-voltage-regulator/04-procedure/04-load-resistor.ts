import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Connect the load resistor RL1.",
  body: "Mount the load resistor RL1 = 1 kΩ (columns 13 to 16, row c). Join its left lead to the output node — the junction of Rs and the Zener cathode, column 12 — with a green wire and its right lead to the ground rail with a black wire. RL1 is now in parallel with the Zener diode, so the output voltage Vout is the voltage across both.",
  show: [
    "bb",
    "psu",
    "rs",
    "w_vcc_rs",
    "dz",
    "w_rs_dz",
    "w_dz_gnd",
    "rl1",
    "w_dz_rl1",
    "w_rl1_gnd",
  ],
  highlight: "rl1",
  supplyVoltage: 0,
};
