import { type SceneProcedureStep } from "@/labs/experiments/types";
import { r2rLadder } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Connect the bit lines and the junctions",
  body: "Connect P1.0 to column 3, row a (orange). Connect the junction between R1 and R2 (column 6, row d) to R2's left leg (white). Connect P1.1 to column 11, row b (yellow), P1.2 to column 16, row b (green), and P1.3 to column 21, row b (blue). Join each junction to the next resistor's left leg with a white jumper.",
  show: [
    "bb",
    "mcu",
    "r1",
    "r2",
    "r3",
    "r4",
    "w_p10",
    "w_j1",
    "w_p11",
    "w_j2",
    "w_p12",
    "w_j3",
    "w_p13",
  ],
  highlight: "w_j2",
  schematic: r2rLadder()[3],
};
