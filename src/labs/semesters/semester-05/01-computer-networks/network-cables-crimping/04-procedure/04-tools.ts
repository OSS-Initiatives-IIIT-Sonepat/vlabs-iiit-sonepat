import { type SceneProcedureStep } from "@/labs/experiments/types";
import { WORKBENCH } from "@/labs/networks/network-cables";
import { crimpFlow } from "@/labs/schematics/semester-05/01-computer-networks/network-cables";

export const step: SceneProcedureStep = {
  label: "Get the tools ready",
  body: "On the right of the bench are the tools. The stripper cuts the jacket without nicking the wires. The crimping tool has a blade to cut the wires square and an 8P die that pushes the plug's pins into the wires. The RJ45 plugs are clear, so you can see the colours inside. The tester checks the finished cable.\n\nThe corner card shows the eight jobs for each end of the cable.",
  show: [],
  schematic: crimpFlow(0),
  net: {
    show: WORKBENCH,
    hot: ["crimper", "stripper", "plugs", "tester"],
    focus: ["crimper", "stripper", "plugs", "tester"],
    note: {
      at: "crimper",
      title: "Crimping tool",
      text: "The blade cuts the wires square. The 8P die presses the pins down into them.",
    },
  },
};
