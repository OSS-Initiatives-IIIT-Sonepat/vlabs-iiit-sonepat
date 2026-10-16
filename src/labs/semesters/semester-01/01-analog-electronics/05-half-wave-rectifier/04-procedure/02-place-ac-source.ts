import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step02 as schematic } from "@/labs/schematics/semester-01/01-analog-electronics/05-half-wave-rectifier";

export const step: SceneProcedureStep = {
  label: "Connect the AC input source",
  body: "Bring in the AC supply (step-down transformer secondary or function generator) with a peak amplitude $V_m = 12\\,V$ at $50\\,Hz$. Its two leads feed the top VCC and GND rails.",
  show: ["bb", "ac_src"],
  highlight: "ac_src",
  supplyVoltage: 12.0,
  schematic,
};
