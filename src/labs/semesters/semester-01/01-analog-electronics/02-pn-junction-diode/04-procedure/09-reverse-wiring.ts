import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Wire the reverse-bias path and reconnect voltmeter.",
  body:
    "**Wire**: R₁ right lead (col 8) → diode cathode. Current enters the cathode — reverse bias.\n" +
    "**Wire**: diode anode → GND rail.\n" +
    "**Voltmeter probes**: across the reversed diode.\n" +
    "DMM readings will show the reverse voltage $-V_D$ across the diode.",
  show: ["bb", "psu", "am1", "r1", "d1", "w_diode_r", "w_r_gnd", "vm1"],
};
