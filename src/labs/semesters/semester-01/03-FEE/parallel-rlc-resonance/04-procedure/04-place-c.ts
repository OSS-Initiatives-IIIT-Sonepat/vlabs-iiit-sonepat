import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step04 as schematic } from "@/labs/schematics/semester-01/03-FEE/parallel-rlc-resonance";

export const step: SceneProcedureStep = {
  label: "Place the capacitor in parallel.",
  body: "Insert the $0.1\\,\\mu\\mathrm{F}$ capacitor at columns 16 and 17. Join column 16 to the tank node at column 10, and column 17 to ground. $f_0 = 1/(2\\pi\\sqrt{LC}) = 5.03\\,\\mathrm{kHz}$.",
  show: ["bb", "r1", "l1", "w_tank_gnd", "c1", "w_c_gnd", "w_node_c"],
  highlight: "c1",
  schematic,
};
