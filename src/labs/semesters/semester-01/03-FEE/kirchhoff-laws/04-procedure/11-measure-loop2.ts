import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step11 as schematic } from "@/labs/schematics/semester-01/03-FEE/kirchhoff-laws";

export const step: SceneProcedureStep = {
  label: "Check KVL around loop 2.",
  body: "Add the voltmeter across R2. It reads −0.67 V, the same sign as I2. Loop 2: 6.00 − (−0.67) − 6.67 = 0.",
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
    "vm2",
    "vm3",
  ],
  highlight: "vm2",
  readings: {
    psu1: "9.00 V",
    psu2: "6.00 V",
    am1: "2.33 mA",
    am2: "−0.31 mA",
    am3: "2.02 mA",
    vm1: "2.33 V",
    vm2: "−0.67 V",
    vm3: "6.67 V",
  },
  schematic,
};
