import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Connect the power pins of the inverting amplifier.",
  body: "With the supply switched off, connect pin 7 to the +12 V rail (red wire) and pin 4 to the −12 V rail (white wire). Connect pin 3, the non-inverting input, to the ground rail (black wire). Leave pins 1, 5 and 8 unconnected.",
  show: [
    "bb",
    "op_inv",
    "psu",
    "psu_neg",
    "w_gnd_link",
    "w_inv_pin7",
    "w_inv_pin4",
    "w_inv_pin3",
  ],
  highlight: "op_inv",
};
