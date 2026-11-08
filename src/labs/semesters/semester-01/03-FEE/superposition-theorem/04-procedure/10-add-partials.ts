import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step10 as schematic } from "@/labs/schematics/semester-01/03-FEE/superposition-theorem";

export const step: SceneProcedureStep = {
  label: "Add the two partial results.",
  body: "Remove both shorts and turn both supplies back on. The partial currents add: 1.55 + 0.47 = 2.02 mA. The voltages add: 5.12 + 1.55 = 6.67 V. The meters are back on those two-source readings.",
  show: [
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
  ],
  highlight: "vm3",
  readings: { psu1: "9.00 V", psu2: "6.00 V", am3: "2.02 mA", vm3: "6.67 V" },
  schematic,
};
