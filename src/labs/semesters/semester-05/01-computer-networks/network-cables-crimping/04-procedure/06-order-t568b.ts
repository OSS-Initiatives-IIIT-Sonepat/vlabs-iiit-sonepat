import { type SceneProcedureStep } from "@/labs/experiments/types";
import { WORKBENCH } from "@/labs/networks/network-cables";
import { pinoutT568B } from "@/labs/schematics/semester-05/01-computer-networks/network-cables";

export const step: SceneProcedureStep = {
  label: "End A: lay the wires in T568B order",
  body: "Untwist the pairs at End A, no further back than the jacket, and straighten each wire between your fingers.\n\nLay the eight wires flat, side by side, in the T568B order from left to right: white-orange, orange, white-green, blue, white-blue, green, white-brown, brown. Hold the plug with the clip underneath and the open end toward you. Pin 1 is on your left.\n\nThe blue pair sits in the middle with green split around it. That is the part people get wrong.",
  show: [],
  schematic: pinoutT568B,
  net: {
    show: WORKBENCH,
    hot: ["endA"],
    focus: ["endA", "endB"],
    zoom: 0.85,
    ends: {
      endA: { stage: "ordered", standard: "T568B" },
      endB: { stage: "stripped" },
    },
    consoles: [
      {
        at: "endA",
        title: "T568B, pin 1 to pin 8",
        lines: [
          "1  white-orange    5  white-blue",
          "2  orange          6  green",
          "3  white-green     7  white-brown",
          "4  blue            8  brown",
        ],
      },
    ],
  },
};
