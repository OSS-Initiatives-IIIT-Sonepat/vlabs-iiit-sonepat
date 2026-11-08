import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step10 as schematic } from "@/labs/schematics/semester-01/03-FEE/kirchhoff-laws";

export const step: SceneProcedureStep = {
  label: "Check KVL around loop 1.",
  body: "Loop 1 is V1, R1 and R3. The voltmeter across R1 reads 2.33 V. The voltmeter from node A to ground reads 6.67 V. KVL: 9.00 − 2.33 − 6.67 = 0.",
  show: [
    "bb",
    "psu1",
    "psu2",
    "w_gnd_link",
    "r1",
    "am1",
    "r2",
    "am2",
    "w_node",
    "r3",
    "am3",
    "w_r3_gnd",
    "vm1",
    "vm3",
  ],
  highlight: "vm1",
  readings: {
    psu1: "9.00 V",
    psu2: "6.00 V",
    am1: "2.33 mA",
    am2: "−0.31 mA",
    am3: "2.02 mA",
    vm1: "2.33 V",
    vm3: "6.67 V",
  },
  schematic,
};
