import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step08 as schematic } from "@/labs/schematics/semester-01/03-FEE/kirchhoff-laws";

export const step: SceneProcedureStep = {
  label: "Measure I2.",
  body: "Do the same in the R2 branch. The I2 ammeter reads −0.31 mA. The sign is negative because node A is at 6.67 V, above the 6.00 V rail, so this current leaves the node toward V2.",
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
    "w_node_r3",
    "w_r3_gnd",
  ],
  highlight: "am2",
  readings: {
    psu1: "9.00 V",
    psu2: "6.00 V",
    am1: "2.33 mA",
    am2: "−0.31 mA",
  },
  schematic,
};
