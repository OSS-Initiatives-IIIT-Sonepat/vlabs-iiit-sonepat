import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step09 as schematic } from "@/labs/schematics/semester-01/03-FEE/kirchhoff-laws";

export const step: SceneProcedureStep = {
  label: "Measure I3 and check KCL.",
  body: "Put the I3 ammeter between node A and R3. It reads 2.02 mA, out of the node to ground. KCL: 2.33 + (−0.31) − 2.02 = 0.",
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
  ],
  highlight: "am3",
  readings: {
    psu1: "9.00 V",
    psu2: "6.00 V",
    am1: "2.33 mA",
    am2: "−0.31 mA",
    am3: "2.02 mA",
  },
  schematic,
};
