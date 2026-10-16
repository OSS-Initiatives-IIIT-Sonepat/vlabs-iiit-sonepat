import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step10 as schematic } from "@/labs/schematics/semester-01/01-analog-electronics/02-pn-junction-diode";

export const step: SceneProcedureStep = {
  label: "Reverse bias sweep: 0 → 15 V.",
  body:
    "Power on. Increase $V_s$ from 0 to 15 V in **1 V steps**.\n" +
    "Observe: the reverse current $I_0$ remains nearly constant (a few $\\mu\\text{A}$ at most) — this is the **reverse saturation region**.\n" +
    "Do **not** exceed the 1N4148 rated breakdown voltage ($V_{BR} \\approx 100\\,\\text{V}$). The current should stay flat across the entire sweep range.",
  show: ["bb", "psu", "am1", "r1", "d1", "w_diode_r", "w_r_gnd", "vm1"],
  highlight: "vm1",
  activeInputs: { Vcc: 1 },
  supplyVoltage: 10.0,
  readings: { am1: "0.02 mA", vm1: "10.00 V" },
  schematic,
};
