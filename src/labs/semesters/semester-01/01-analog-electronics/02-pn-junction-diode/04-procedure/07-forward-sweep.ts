import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step07 as schematic } from "@/labs/schematics/semester-01/01-analog-electronics/02-pn-junction-diode";

export const step: SceneProcedureStep = {
  label: "Forward bias sweep: 0 → 1.5 V in 0.1 V steps.",
  body:
    "Power on. Increase $V_s$ from 0 V to 1.5 V in **0.1 V steps**. Record $V_D$ and $I_D$ at each step.\n" +
    "Expect: negligible current below $\\approx 0.5\\,\\text{V}$; exponential rise above the knee voltage $\\approx 0.7\\,\\text{V}$.\n" +
    "Take **finer steps** (0.05 V) near the knee region (0.5–0.8 V) for a smooth curve.",
  show: ["bb", "psu", "am1", "r1", "d1", "w_r_d1", "w_d1_gnd", "vm1"],
  highlight: "am1",
  activeInputs: { Vcc: 1 },
  supplyVoltage: 1.0,
  readings: { am1: "0.30 mA", vm1: "0.70 V" },
  schematic,
};
