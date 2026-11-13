import { type SceneProcedureStep } from "@/labs/experiments/types";
import { pointAt } from "../markers";

export const step: SceneProcedureStep = {
  label: "2. USB jack (power and link to the PC)",
  body: "The silver USB-B socket on the left edge connects the board to your PC. It does three things. It powers the board at 5 V. It carries the sketch you upload from the Arduino IDE. And it is the serial link that Serial.println() uses to send numbers back to the PC.",
  show: ["bb", "uno", "usb"],
  highlight: "uno",
  markers: [pointAt("usb")],
};
