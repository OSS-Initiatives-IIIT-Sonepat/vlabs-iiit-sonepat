import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Connect the voltmeter across the forward-biased diode.",
  body:
    "Set the voltmeter (DMM) to **DC Voltage, 20 V range**.\n" +
    "**Probe (+)**: connect to the diode anode (col 10).\n" +
    "**Probe (−)**: connect to the diode cathode (col 11).\n" +
    "These probes measure $V_D$ directly across the diode.",
  show: ["bb", "psu", "am1", "r1", "d1", "w_diode_r", "w_r_gnd", "vm1"],
};
