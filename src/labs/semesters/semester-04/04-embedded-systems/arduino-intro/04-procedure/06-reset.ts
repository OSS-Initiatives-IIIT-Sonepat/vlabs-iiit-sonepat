import { type SceneProcedureStep } from "@/labs/experiments/types";
import { pointAt } from "../markers";

export const step: SceneProcedureStep = {
  label: "6. Reset button",
  body: "The red button is RESET. Pressing it pulls the chip's reset pin to ground and restarts the sketch from setup(). The board also resets itself each time you upload a new sketch, which is why the upload works without pressing anything.",
  show: ["bb", "uno", "usb", "bat"],
  highlight: "uno",
  markers: [pointAt("resetButton")],
};
