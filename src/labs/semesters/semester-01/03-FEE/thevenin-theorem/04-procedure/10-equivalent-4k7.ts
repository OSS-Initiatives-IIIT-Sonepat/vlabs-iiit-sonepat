import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step10 as schematic } from "@/labs/schematics/semester-01/03-FEE/thevenin-theorem";

export const step: SceneProcedureStep = {
  label: "Repeat the equivalent with 4.7 kΩ.",
  body: "Keep Vth and Rth. Swap the load for 4.7 kΩ. The voltmeter reads 5.40 V and the ammeter reads 1.15 mA, again matching the original divider.",
  show: ["bb", "psu", "r_th", "w_v_rth", "r4", "w_r4_gnd", "am_eq4", "vm_eq4"],
  highlight: "r4",
  readings: { psu: "6.19 V", vm_eq4: "5.40 V", am_eq4: "1.15 mA" },
  schematic,
};
