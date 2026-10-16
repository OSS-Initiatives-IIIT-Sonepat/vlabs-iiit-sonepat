import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Build the RC low-pass filter.",
  body: "Insert the 1 kΩ resistor R in row c from column 5 to column 8. Insert the 0.1 µF capacitor C in row a at columns 8 and 9, so that one lead shares column 8 with the resistor; this column is the output node. Connect the other capacitor lead (column 9) to the ground rail with a black wire. The theoretical cut-off frequency is $f_c = \\frac{1}{2\\pi RC} = \\frac{1}{2\\pi \\times 1000 \\times 0.1\\times10^{-6}} \\approx 1591$ Hz.",
  show: ["bb", "r_lp", "c_lp", "w_clp_gnd"],
  highlight: "c_lp",
};
