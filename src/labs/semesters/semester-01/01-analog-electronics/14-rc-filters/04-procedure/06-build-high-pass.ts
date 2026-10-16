import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Build the RC high-pass filter.",
  body: "On the right of the board, insert the second 0.1 µF capacitor C in row c at columns 16 and 17, and the second 1 kΩ resistor R in row b from column 17 to column 20. Column 17 is the output node. Connect the far end of R (column 20) to the ground rail. Connect the second generator output to column 16 and CRO channel 1 to column 17, with both ground leads on the ground rail. The cut-off frequency is the same, about 1.59 kHz.",
  show: [
    "bb", "r_lp", "c_lp", "w_clp_gnd", "fg_lp", "scope_lp",
    "c_hp", "r_hp", "w_rhp_gnd", "fg_hp", "scope_hp",
  ],
  highlight: "c_hp",
  readings: {
    fg_lp: "Output off",
    scope_lp: "No signal",
    fg_hp: "Output off",
    scope_hp: "No signal",
  },
};
