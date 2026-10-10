import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Load regulation: connect a second load in parallel.",
  body: "Set Vin back to 10 V. Mount the second 1 kΩ resistor RL2 (columns 19 to 22) and connect it in parallel with RL1: green wire from the output node (column 12) to its left lead, black wire from its right lead to the ground rail. The load resistance falls to 1 kΩ ∥ 1 kΩ = 500 Ω, so IL doubles to 5.1 / 500 = 10.2 mA. IR stays at 14.85 mA, so IZ falls to 14.85 − 10.2 = 4.65 mA. Vout stays at about 5.10 V. Compare this reading with the 10 V reading at RL = 1 kΩ to calculate the load regulation.",
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
    "dmm",
    "rl2",
    "w_dz_rl2",
    "w_rl2_gnd",
  ],
  highlight: "rl2",
  supplyVoltage: 10,
  readings: { dmm: "5.10 V" },
};
