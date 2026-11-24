import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step05 as schematic } from "@/labs/schematics/semester-01/03-FEE/parallel-rlc-resonance";

export const step: SceneProcedureStep = {
  label: "Connect the generator, ammeter and CRO.",
  body: "Set the function generator to a 2 V peak-to-peak sine wave. Its output lands on column 4 and its ground on the blue rail. The ammeter runs from column 4 to the tank at column 10. Clip the CRO across the tank. Hold the CRO reading at 2.00 V peak-to-peak for every frequency.",
  show: [
    "bb",
    "r1",
    "l1",
    "w_tank_gnd",
    "c1",
    "w_c_gnd",
    "w_node_c",
    "fg",
    "am",
    "scope",
  ],
  highlight: "fg",
  readings: { fg: "1.00 kHz, 2 Vpp", am: "30.6 mA", scope: "2.00 Vpp" },
  schematic,
};
