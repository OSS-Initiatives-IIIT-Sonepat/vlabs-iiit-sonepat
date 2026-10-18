import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step02 as schematic } from "@/labs/schematics/semester-01/01-analog-electronics/02-pn-junction-diode";

export const step: SceneProcedureStep = {
  label: "Connect the milliammeter (DMM) in series.",
  body:
    "Place the **milliammeter** (DMM set to DC mA mode) beside the breadboard.\n" +
    "Connect the ammeter in series using jumper wires:\n" +
    "**Wire 1**: VCC rail → ammeter (+) input.\n" +
    "**Wire 2**: ammeter (−) output → col 5, row a (R₁ left lead).\n" +
    "All circuit current will now flow through the ammeter, measuring $I_D$ directly.",
  show: ["bb", "psu", "am1"],
  schematic,
};
