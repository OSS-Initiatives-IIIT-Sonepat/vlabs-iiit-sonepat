import { type SceneProcedureStep } from "@/labs/experiments/types";
import { WORKBENCH } from "@/labs/networks/network-cables";
import { pinoutStraight } from "@/labs/schematics/semester-05/01-computer-networks/network-cables";

export const step: SceneProcedureStep = {
  label: "End B: T568B again",
  body: "Make End B the same way: untwist, lay the wires in the T568B order, trim, insert, and crimp.\n\nBoth ends now use T568B, so the wire on pin 1 at End A is on pin 1 at End B, and so on for all eight. This is a straight-through cable.",
  show: [],
  schematic: pinoutStraight,
  net: {
    show: WORKBENCH,
    hot: ["endB"],
    focus: ["endA", "endB"],
    zoom: 0.85,
    ends: {
      endA: { stage: "crimped", standard: "T568B" },
      endB: { stage: "crimped", standard: "T568B" },
    },
    note: {
      at: "endB",
      title: "Same order both ends",
      text: "T568B at End A and at End B. Pin n is joined to pin n.",
    },
  },
};
