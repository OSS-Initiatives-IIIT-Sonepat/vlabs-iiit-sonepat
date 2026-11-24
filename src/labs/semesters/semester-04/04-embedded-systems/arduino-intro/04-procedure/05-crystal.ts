import { type SceneProcedureStep } from "@/labs/experiments/types";
import { pointAt } from "../markers";

export const step: SceneProcedureStep = {
  label: "5. The clock: 16 MHz crystal",
  body: "The silver can marked 16MHz is a quartz crystal. It vibrates 16 million times a second and sets the chip's clock. The chip does one instruction for each tick, so delay(1000) is timed from this crystal. A cheap RC oscillator would drift; the crystal keeps time accurately.",
  show: ["bb", "uno", "usb", "bat"],
  highlight: "uno",
  markers: [pointAt("crystal")],
};
