import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step12 as schematic } from "@/labs/schematics/semester-01/03-FEE/kirchhoff-laws";

export const step: SceneProcedureStep = {
  label: "Raise V1 to 12 V.",
  body: "Leave V2 at 6.00 V and turn V1 up to 12.00 V. The meters move to I1 = 3.62 mA, I2 = −1.08 mA, I3 = 2.54 mA, and VR1 = 3.62 V, VR2 = −2.38 V, VR3 = 8.38 V. Both sums are still zero.",
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
  highlight: "psu1",
  readings: {
    psu1: "12.00 V",
    psu2: "6.00 V",
    am1: "3.62 mA",
    am2: "−1.08 mA",
    am3: "2.54 mA",
    vm1: "3.62 V",
    vm2: "−2.38 V",
    vm3: "8.38 V",
  },
  schematic,
};
