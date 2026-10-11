import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Mount the 74HC logic gate IC packages across the centre groove.",
  body:
    "Insert the 74HC logic gate IC packages onto row e straddling the central isolation groove: " +
    "or_cd (74HC32) at col 5, and_b_t (74HC08) at col 13, or_w (74HC32) at col 21, " +
    "xor_x (74HC86) at col 29, xor_cd (74HC86) at col 37, not_y (74HC04) at col 45, and not_z (74HC04) at col 53. " +
    "Ensure each IC notch faces left with pin 1 positioned in row e.",
  show: [
    "bb",
    "psu",
    "w_rail_link",
    "or_cd",
    "and_b_t",
    "or_w",
    "xor_x",
    "xor_cd",
    "not_y",
    "not_z",
  ],
  highlight: "or_cd",
};
