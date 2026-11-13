import { type SceneProcedureStep } from "@/labs/experiments/types";
import { pointAt } from "../markers";

export const step: SceneProcedureStep = {
  label: "4. The 3.3 V regulator",
  body: "The ESP32 runs at 3.3 V, not 5 V. The regulator (an AMS1117) turns the 5 V from USB into 3.3 V. So the ESP32's pins are 3.3 V logic: a HIGH output is 3.3 V, and an input must never get more than 3.6 V. Feeding a 5 V signal into a GPIO pin can destroy the chip.",
  show: ["bb", "esp", "usb"],
  highlight: "esp",
  markers: [pointAt("regulator")],
};
