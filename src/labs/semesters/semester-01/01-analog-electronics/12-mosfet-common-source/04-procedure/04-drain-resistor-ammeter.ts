import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Connect the drain resistor and the ammeter.",
  body: "Mount the $1\\,\\text{k}\\Omega$ drain resistor $R_D$ from column 9 to column 12, so its right lead shares the drain column and needs no wire. Connect the ammeter in series between the $V_{DD}$ rail (+) and column 9 (−). The ammeter now reads the drain current $I_D$.",
  show: ["bb", "psu", "vgg", "m1", "w_src_gnd", "r_d", "am_d"],
  highlight: "r_d",
};
