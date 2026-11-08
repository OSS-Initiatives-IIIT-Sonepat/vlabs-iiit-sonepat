import { type SceneProcedureStep } from "@/labs/experiments/types";
import { WORKBENCH } from "@/labs/networks/network-cables";
import { pinoutCross } from "@/labs/schematics/semester-05/01-computer-networks/network-cables";

export const step: SceneProcedureStep = {
  label: "Re-make End B with T568A",
  body: "Take the cable out of the tester. Cut the plug off End B, strip it again, and this time lay the wires in the T568A order: white-green, green, white-orange, blue, white-blue, orange, white-brown, brown. Trim, insert, and crimp.\n\nOnly the orange and green pairs have changed places. Those are the pairs on pins 1-2 and 3-6, the send and receive pairs of 10 and 100 Mbit/s Ethernet.",
  show: [],
  schematic: pinoutCross,
  net: {
    show: WORKBENCH,
    hot: ["endB"],
    focus: ["endA", "endB"],
    zoom: 0.85,
    ends: {
      endA: { stage: "crimped", standard: "T568B" },
      endB: { stage: "crimped", standard: "T568A" },
    },
    consoles: [
      {
        at: "endB",
        title: "T568A, pin 1 to pin 8",
        lines: [
          "1  white-green     5  white-blue",
          "2  green           6  orange",
          "3  white-orange    7  white-brown",
          "4  blue            8  brown",
        ],
      },
    ],
  },
};
