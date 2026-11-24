import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step06 as schematic } from "@/labs/schematics/semester-01/01-analog-electronics/03-zener-diode";

export const step: SceneProcedureStep = {
  label: "Connect voltmeter across the forward-biased Zener.",
  body:
    "Take a second DMM and set it to **DC Voltage, 20 V range**.\n" +
    "**Red probe** (+): col 8, row a (anode).\n" +
    "**Black probe** (−): col 11, row a (cathode).\n" +
    "These probes measure $V_Z$ directly across the diode.",
  show: ["bb", "psu", "dmm", "r1", "zener_fwd", "w_zfwd_gnd", "vm_fwd"],
  schematic,
};
