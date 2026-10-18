import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step06 as schematic } from "@/labs/schematics/semester-01/01-analog-electronics/02-pn-junction-diode";

export const step: SceneProcedureStep = {
  label: "Connect the voltmeter across the forward-biased diode.",
  body:
    "Set the voltmeter (DMM) to **DC Voltage, 20 V range**.\n" +
    "**Probe (+)**: connect to the diode anode (col 10).\n" +
    "**Probe (−)**: connect to the diode cathode (col 13).\n" +
    "These probes measure $V_D$ directly across the diode.",
  show: ["bb", "psu", "am1", "r1", "d1", "w_r_d1", "w_d1_gnd", "vm1"],
  schematic,
};
