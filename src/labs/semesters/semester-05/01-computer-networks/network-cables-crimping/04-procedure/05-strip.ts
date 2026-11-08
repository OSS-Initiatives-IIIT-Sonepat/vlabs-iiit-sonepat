import { type SceneProcedureStep } from "@/labs/experiments/types";
import { WORKBENCH } from "@/labs/networks/network-cables";
import { crimpFlow } from "@/labs/schematics/semester-05/01-computer-networks/network-cables";

export const step: SceneProcedureStep = {
  label: "Strip 2.5 cm of jacket",
  body: "Cut both ends of the cable square with the crimping tool's blade. Put End A in the stripper, 2.5 cm from the end, turn it once around the cable, and pull the jacket off. Do the same at End B.\n\nThe four twisted pairs are now free. Check that no wire has been nicked. A nick can break later when the cable is bent.",
  show: [],
  schematic: crimpFlow(1),
  net: {
    show: WORKBENCH,
    hot: ["endA", "endB"],
    focus: ["endA", "endB"],
    ends: {
      endA: { stage: "stripped" },
      endB: { stage: "stripped" },
    },
    note: {
      at: "endA",
      title: "2.5 cm of pairs",
      text: "Long enough to sort the wires, short enough that the jacket goes into the plug.",
    },
  },
};
