import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step09 as schematic } from "@/labs/schematics/semester-01/03-FEE/thevenin-theorem";

export const step: SceneProcedureStep = {
  label: "Build the equivalent with 3.3 kΩ.",
  body: "Clear the divider. Set the same supply to Vth = 6.19 V, put the 688 Ω resistor in series, and connect the 3.3 kΩ load. This one series circuit is the Thevenin equivalent. The voltmeter reads 5.12 V and the ammeter reads 1.55 mA, the same as the original.",
  show: ["bb", "psu", "r_th", "w_v_rth", "r_load", "w_load_gnd", "am_eq", "vm_eq"],
  highlight: "r_th",
  readings: { psu: "6.19 V", vm_eq: "5.12 V", am_eq: "1.55 mA" },
  schematic,
};
