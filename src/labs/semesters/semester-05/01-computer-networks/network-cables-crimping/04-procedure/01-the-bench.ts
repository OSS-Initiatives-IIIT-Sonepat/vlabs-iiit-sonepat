import { type SceneProcedureStep } from "@/labs/experiments/types";
import { theoryDiagram } from "@/labs/schematics/semester-05/01-computer-networks/network-cables";

export const step: SceneProcedureStep = {
  label: "The workbench",
  body: "The room has two parts. On the left is the cable workbench: four sample cables, the tools, a cable tester, and one length of Cat 6 cable with two loose ends, End A and End B. On the right is a patch corner, where finished cables join PCs to a switch and to each other.\n\nYou will make two cables from the same length. First a straight-through cable, then a crossover, and test each one.",
  show: [],
  schematic: theoryDiagram,
  net: {
    note: {
      at: "endA",
      title: "One cable, two ends",
      text: "End A and End B are the two ends of the same 1.5 m length of Cat 6.",
    },
  },
};
