import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Observe output saturation.",
  body: "With Rf = 100 kΩ still fitted, slowly increase the input amplitude from 1 V towards 3 V peak-to-peak while watching the output. When the amplified peaks would exceed the output swing of the LM741, they flatten (clip) a volt or two below the supply voltages. Reduce the input amplitude to zero afterwards.",
  show: [
    "bb",
    "op_inv",
    "psu",
    "psu_neg",
    "w_gnd_link",
    "w_inv_pin7",
    "w_inv_pin4",
    "w_inv_pin3",
    "r_in",
    "r_f_inv",
    "w_rin_pin2",
    "w_inv_pin6_rf",
    "w_inv_rf_pin2",
    "fg_inv",
    "scope_inv",
  ],
  highlight: "scope_inv",
  readings: {
    fg_inv: "1 kHz, 3 Vpp",
    scope_inv: "Vo clipped at about ±10.5 V",
  },
};
