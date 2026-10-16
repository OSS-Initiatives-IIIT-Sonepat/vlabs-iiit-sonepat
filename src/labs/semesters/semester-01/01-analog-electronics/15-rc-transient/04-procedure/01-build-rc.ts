import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Build the series RC circuit.",
  body: "Insert the 10 kΩ resistor in row c from column 5 to column 8. Insert the 0.1 µF capacitor in row a at columns 8 and 9, so that it shares column 8 with the resistor. Connect the capacitor's other lead (column 9) to the ground rail with a black wire. Column 8 is the capacitor voltage Vc. The time constant is $\\tau = RC = 10\\,000 \\times 0.1\\times10^{-6} = 1$ ms.",
  show: ["bb", "r_10k", "c1", "w_c_gnd"],
  highlight: "c1",
};
