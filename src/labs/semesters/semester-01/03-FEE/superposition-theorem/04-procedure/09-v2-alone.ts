import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step09 as schematic } from "@/labs/schematics/semester-01/03-FEE/superposition-theorem";

export const step: SceneProcedureStep = {
  label: "Kill V1. Read V2 alone.",
  body: "Put V2 back at 6.00 V. Switch V1 off and short the top rail instead. The load ammeter reads 0.47 mA and the voltmeter reads 1.55 V.",
  show: [
    "bb",
    "psu2",
    "w_kill_v1",
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
  readings: { psu2: "6.00 V", am3: "0.47 mA", vm3: "1.55 V" },
  schematic,
};
