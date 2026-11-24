import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step09 as schematic } from "@/labs/schematics/semester-01/01-analog-electronics/03-zener-diode";

export const step: SceneProcedureStep = {
  label: "Wire the reverse-bias path and reconnect voltmeter.",
  body:
    "**Purple wire**: R₁ right lead (col 8) → Zener cathode (col 15). Current enters the cathode — reverse bias.\n" +
    "**Black wire**: Zener anode (col 12) → GND rail.\n" +
    "**Voltmeter**: red probe on the anode (col 12, row a), black probe on the cathode (col 15, row a) — the same polarity as before.\n" +
    "DMM readings will show **negative** voltage — this is the reverse voltage $-V_Z$ across the Zener.",
  show: [
    "bb",
    "psu",
    "dmm",
    "r1",
    "zener_rev",
    "w_r1_zrev",
    "w_zrev_gnd",
    "vm_rev",
  ],
  schematic,
};
