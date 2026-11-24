import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Set up the breadboard, supply and ICs",
  body: "Connect the 5 V supply to the breadboard rails and link the top and bottom +5 V rails. Insert the 74HC32 (OR, columns 8–14), 74HC04 (NOT, 16–22) and 74HC08 (AND, 24–30) across the centre groove. Power each IC: pin 14 to +5 V, pin 7 to GND. The inputs I1, I2, I3 are tie columns 2, 3, 4; connect a column to +5 V for 1 or to GND for 0. Keep every input at 0 to begin.",
  show: [
    "bb",
    "psu",
    "w_rail_link",
    "or_a",
    "w_vcc_or_a",
    "w_gnd_or_a",
    "not_i2",
    "w_vcc_not_i2",
    "w_gnd_not_i2",
    "and_m",
    "w_vcc_and_m",
    "w_gnd_and_m",
  ],
};
