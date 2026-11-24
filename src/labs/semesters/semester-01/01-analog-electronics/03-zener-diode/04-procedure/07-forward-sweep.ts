import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step07 as schematic } from "@/labs/schematics/semester-01/01-analog-electronics/03-zener-diode";

export const step: SceneProcedureStep = {
  label: "Forward bias sweep: 0 → 2 V in 0.1 V steps.",
  body:
    "Power on. Increase $V_s$ from 0 V to 2.0 V in **0.1 V steps**. Record $V_Z$ and $I_Z$ at each step.\n" +
    "Expect: no current below $\\approx 0.55\\,\\text{V}$; exponential rise above $0.65\\,\\text{V}$.\n" +
    "Calculate dynamic resistance in the conducting region: $r_d = \\Delta V / \\Delta I \\approx 26/I_{\\text{mA}}\\,\\Omega$ at $25^\\circ\\text{C}$.",
  show: ["bb", "psu", "dmm", "r1", "zener_fwd", "w_zfwd_gnd", "vm_fwd"],
  activeInputs: { Vcc: 1 },
  supplyVoltage: 1.0,
  readings: { psu: "1.00 V", dmm: "0.81 mA", vm_fwd: "0.62 V" },
  ledBrightness: { zener_fwd: 0.08 },
  schematic,
};
