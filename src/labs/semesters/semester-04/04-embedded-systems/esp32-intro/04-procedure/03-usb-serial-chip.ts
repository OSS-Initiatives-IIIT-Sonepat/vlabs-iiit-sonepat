import { type SceneProcedureStep } from "@/labs/experiments/types";
import { pointAt } from "../markers";

export const step: SceneProcedureStep = {
  label: "3. The USB-to-serial chip",
  body: "The ESP32 has no USB port of its own on this board. The small square chip behind the USB socket (a CP2102 or CH340) turns USB into a serial link the ESP32 understands. Your PC sees it as a COM port, which you choose in the Arduino IDE.",
  show: ["bb", "esp", "usb"],
  highlight: "esp",
  markers: [pointAt("usbChip")],
};
