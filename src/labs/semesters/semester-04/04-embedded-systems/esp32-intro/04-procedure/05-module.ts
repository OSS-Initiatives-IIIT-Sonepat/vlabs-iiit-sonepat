import { type SceneProcedureStep } from "@/labs/experiments/types";
import { pointAt } from "../markers";

export const step: SceneProcedureStep = {
  label: "5. The ESP-WROOM-32 module",
  body: "Inside the shield are the ESP32 chip, with two 32-bit cores at up to 240 MHz, and 4 MB of flash that stores your program. The printed zigzag at the end is the Wi-Fi and Bluetooth antenna: keep metal and fingers off it, or the range drops.",
  show: ["bb", "esp", "usb"],
  highlight: "esp",
  markers: [pointAt("module", 0.5)],
};
