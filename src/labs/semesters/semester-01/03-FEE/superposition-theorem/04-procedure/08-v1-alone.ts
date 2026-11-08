import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step08 as schematic } from "@/labs/schematics/semester-01/03-FEE/superposition-theorem";

export const step: SceneProcedureStep = {
  schematic,
  label: "Kill V2. Read V1 alone.",
  body: "Switch V2 off and replace it with a short across the bottom rail. V1 stays at 9.00 V. The load ammeter reads 1.55 mA and the voltmeter reads 5.12 V.",
  show: [
    "bb",
    "psu1",
    "w_kill_v2",
    "w_gnd_link",
    "r1",
    "w_v1_r1",
    "r2",
    "w_v2_r2",
    "w_node",
    "r3",
    "am3",
    "w_r3_gnd",
    "vm3",
  ],
  highlight: "am3",
  readings: { psu1: "9.00 V", am3: "1.55 mA", vm3: "5.12 V" },
};
