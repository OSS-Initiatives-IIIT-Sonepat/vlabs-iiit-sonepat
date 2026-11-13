import { type SceneProcedureStep } from "@/labs/experiments/types";
import { pointAt } from "../markers";

export const step: SceneProcedureStep = {
  label: "7. The power LED",
  body: "The small red LED is the power indicator: it is on whenever 3.3 V is present. Unlike some ESP32 boards, the DevKitC has no LED of its own on a GPIO pin, so the ESP32 experiments wire an external LED to GPIO2.",
  show: ["bb", "esp", "usb"],
  highlight: "esp",
  markers: [pointAt("powerLed", 0.12)],
};
