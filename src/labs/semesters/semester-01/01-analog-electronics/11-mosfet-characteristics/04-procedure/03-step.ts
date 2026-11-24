import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Place the drain resistor and the MOSFET",
  body: "Insert the 2N7000 in row c with its flat face towards you: the legs are Source, Gate, Drain from left to right (cols 13, 14, 15). Insert the 100 Ω drain resistor $R_D$ from col 12 to col 15, so its right lead shares the drain column.",
  show: ["bb", "psu_vds", "r_d", "q1"],
  highlight: "q1",
};
