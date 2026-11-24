import { type SceneProcedureStep } from "@/labs/experiments/types";
import { pointAt } from "../markers";

export const step: SceneProcedureStep = {
  label: "10. Power pins 5V, 3V3, GND, VIN",
  body: "The short header next to the analog pins gives power. 5V and 3V3 supply your parts. GND is the common ground: every part you build must reach one ground, and the Arduino's GND is that reference. VIN passes the raw voltage from the barrel jack, before the regulator.",
  show: ["bb", "uno", "usb", "bat"],
  highlight: "uno",
  markers: [pointAt("powerHeader")],
};
