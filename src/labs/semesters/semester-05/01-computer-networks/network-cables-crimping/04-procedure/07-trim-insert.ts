import { type SceneProcedureStep } from "@/labs/experiments/types";
import { WORKBENCH } from "@/labs/networks/network-cables";
import { crimpFlow } from "@/labs/schematics/semester-05/01-computer-networks/network-cables";

export const step: SceneProcedureStep = {
  label: "End A: trim and push into the plug",
  body: "Hold the eight wires flat and cut them straight across with the blade, about 1.3 cm from the jacket.\n\nPush the wires into the plug with the clip underneath. Every wire must reach the far end of the plug, and the jacket must go in past the strain-relief tab. Look through the clear plastic from the tip: you should see eight copper ends against the front, in the same order.",
  show: [],
  schematic: crimpFlow(5),
  net: {
    show: WORKBENCH,
    hot: ["endA"],
    focus: ["endA", "endB"],
    zoom: 0.85,
    ends: {
      endA: { stage: "inserted", standard: "T568B" },
      endB: { stage: "stripped" },
    },
    note: {
      at: "endA",
      title: "Every wire to the tip",
      text: "A wire that stops short leaves its pin with nothing to bite into.",
    },
  },
};
