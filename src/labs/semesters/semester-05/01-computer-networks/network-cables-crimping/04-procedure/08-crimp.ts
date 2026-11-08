import { type SceneProcedureStep } from "@/labs/experiments/types";
import { WORKBENCH } from "@/labs/networks/network-cables";
import { crimpFlow } from "@/labs/schematics/semester-05/01-computer-networks/network-cables";

export const step: SceneProcedureStep = {
  label: "End A: crimp",
  body: "Put the plug into the 8P die of the crimping tool and squeeze the handles hard, until the ratchet lets go.\n\nThe tool pushes the eight gold pins down. Each pin cuts through the insulation of its wire and into the copper. The tool also presses the strain-relief tab onto the jacket, so a pull on the cable does not pull the wires out. Tug the plug gently to check it is held.",
  show: [],
  schematic: crimpFlow(6),
  net: {
    show: WORKBENCH,
    hot: ["endA", "crimper"],
    focus: ["endA", "endB", "crimper"],
    ends: {
      endA: { stage: "crimped", standard: "T568B" },
      endB: { stage: "stripped" },
    },
    note: {
      at: "endA",
      title: "Pins pressed down",
      text: "Each gold pin cuts through its wire's insulation into the copper.",
    },
  },
};
