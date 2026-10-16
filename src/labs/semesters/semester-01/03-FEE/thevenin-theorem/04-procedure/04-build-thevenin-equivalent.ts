import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step04 as schematic } from "@/labs/schematics/semester-01/03-FEE/thevenin-theorem";
export const step: SceneProcedureStep = {
  schematic,
  label: "Build Thevenin equivalent and test with R_L = R3.",
  body: "Restore supply. Build Thevenin equivalent: supply set to $V_{th}$ in series with $R_{th}$ resistor. Connect $R_L = 3.3\\,\\text{k}\\Omega$ across the output. Measure $V_L$ and $I_L$. Compare with original circuit under identical conditions.",
  show: [
    "bb",
    "r1",
    "r2",
    "r_load",
    "w_vcc_r1",
    "w_r1_r2",
    "w_r2_gnd",
    "w_r2_rload",
    "w_rload_gnd",
  ],
};
