import { type SceneProcedureStep } from "@/labs/experiments/types";
import { pointAt } from "../markers";

export const step: SceneProcedureStep = {
  label: "2. Micro-USB: power, upload and serial",
  body: "The micro-USB socket on the left edge does three jobs, as on the Arduino. It brings 5 V in to power the board, it carries the sketch you upload from the Arduino IDE, and it is the serial link that Serial.println() uses. Use a data cable: some micro-USB cables only charge.",
  show: ["bb", "esp", "usb"],
  highlight: "esp",
  markers: [pointAt("usb")],
};
