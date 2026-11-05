import { type SceneProcedureStep } from "@/labs/experiments/types";
import { boothTraceStepSchematics as fig } from "@/labs/schematics/semester-03/05-computer-arithmetic/booth-trace";

export const procedureSteps: SceneProcedureStep[] = [
  {
    label: "Cycle 1 subtracts",
    body: "Q0 Q-1 starts as 10, so subtract BR from AC. 00000 + 01001 = 01001, then the arithmetic shift gives AC = 00100, Q = 11001, Q-1 = 1.",
    show: [],
    schematic: fig[0],
  },
  {
    label: "Cycle 2 only shifts",
    body: "Q0 Q-1 is now 11. Booth does nothing to AC and shifts. AC = 00010, Q = 01100, Q-1 = 1.",
    show: [],
    schematic: fig[1],
  },
  {
    label: "Cycle 3 adds",
    body: "Q0 Q-1 is 01, so add BR. 00010 + 10111 = 11001, and the shift gives AC = 11100, Q = 10110, Q-1 = 0.",
    show: [],
    schematic: fig[2],
  },
  {
    label: "Cycle 4 only shifts",
    body: "Q0 Q-1 is 00. Shift only. AC = 11110, Q = 01011, Q-1 = 0.",
    show: [],
    schematic: fig[3],
  },
  {
    label: "Cycle 5 is the product",
    body: "Q0 Q-1 is 10, so subtract BR once more. After the shift, AC Q = 00011 10101, which is 117. (−9) × (−13) = 117.",
    show: [],
    schematic: fig[4],
  },
];
