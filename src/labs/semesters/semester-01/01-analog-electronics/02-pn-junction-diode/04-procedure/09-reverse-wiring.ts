import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step09 as schematic } from "@/labs/schematics/semester-01/01-analog-electronics/02-pn-junction-diode";

export const step: SceneProcedureStep = {
  label: "Wire the reverse-bias path and reconnect voltmeter.",
  body:
    "**Wire**: R₁ right lead (col 8) → diode cathode (col 18). Current enters the cathode — reverse bias.\n" +
    "**Wire**: diode anode (col 15) → GND rail.\n" +
    "**Voltmeter probes**: (+) on the cathode (col 18), (−) on the anode (col 15).\n" +
    "DMM readings will show the reverse voltage $-V_D$ across the diode.",
  show: ["bb", "psu", "am1", "r1", "d1_rev", "w_r_d1rev", "w_d1rev_gnd", "vm1_rev"],
  schematic,
};
