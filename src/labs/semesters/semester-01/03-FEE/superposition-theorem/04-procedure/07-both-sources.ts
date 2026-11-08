import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step07 as schematic } from "@/labs/schematics/semester-01/03-FEE/superposition-theorem";

const built = [
  "bb",
  "psu1",
  "psu2",
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
];

export const step: SceneProcedureStep = {
  schematic,
  label: "Both sources on. Read the load.",
  body: "Replace the jumper into R3 with the ammeter, and clip the voltmeter from node N to ground. With both supplies on, the ammeter reads 2.02 mA and the voltmeter reads 6.67 V.",
  show: built,
  highlight: "am3",
  readings: { psu1: "9.00 V", psu2: "6.00 V", am3: "2.02 mA", vm3: "6.67 V" },
};
