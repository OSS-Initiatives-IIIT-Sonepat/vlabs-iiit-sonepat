import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step09 as schematic } from "@/labs/schematics/semester-01/01-analog-electronics/03-zener-diode";

export const step: SceneProcedureStep = {
  label: "Wire the reverse-bias path and reconnect voltmeter.",
  body:
    "**Purple wire**: R₁ right lead (col 8) → Zener cathode (col 18). Current enters the cathode — reverse bias.\n" +
    "**Black wire**: Zener anode (col 15) → GND rail.\n" +
    "**Blue wires**: voltmeter probes across the reversed Zener (col 15 and col 18, spanning rows a → e).\n" +
    "DMM readings will show **negative** voltage — this is the reverse voltage $-V_Z$ across the Zener.",
  show: [
    "bb",
    "psu",
    "dmm",
    "w_amm_in",
    "w_amm_out",
    "r1",
    "zener_rev",
    "w_r1_zrev",
    "w_zrev_gnd",
    "w_vm_rev_pos",
    "w_vm_rev_neg",
  ],
  schematic,
};
