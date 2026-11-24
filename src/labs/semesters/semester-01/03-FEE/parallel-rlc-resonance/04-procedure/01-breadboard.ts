import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step01 as schematic } from "@/labs/schematics/semester-01/03-FEE/parallel-rlc-resonance";

export const step: SceneProcedureStep = {
  label: "Place the breadboard.",
  body: "Place the breadboard. The tank will be $R = 1\\,\\mathrm{k}\\Omega$, $L = 10\\,\\mathrm{mH}$ and $C = 0.1\\,\\mu\\mathrm{F}$ in parallel, driven at $2\\,\\mathrm{V}$ peak-to-peak.",
  show: ["bb"],
  schematic,
};
