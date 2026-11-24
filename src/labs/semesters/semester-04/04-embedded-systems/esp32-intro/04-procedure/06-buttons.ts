import { type SceneProcedureStep } from "@/labs/experiments/types";
import { pointAt } from "../markers";

export const step: SceneProcedureStep = {
  label: "6. EN and BOOT",
  body: "EN is the reset button: it restarts the program. BOOT holds GPIO0 LOW: if it is held while EN is pressed, the chip waits for a new program instead of running the old one. The Arduino IDE normally does this by itself. If an upload stalls at Connecting..., hold BOOT until it starts.",
  show: ["bb", "esp", "usb"],
  highlight: "esp",
  markers: [pointAt("enButton"), pointAt("bootButton")],
};
