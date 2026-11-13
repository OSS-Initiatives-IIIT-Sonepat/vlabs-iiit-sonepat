import { type SceneProcedureStep } from "@/labs/experiments/types";
import { pointAtPin } from "../markers";

export const step: SceneProcedureStep = {
  label: "8. Power pins: 3V3, 5V and GND",
  body: "Three kinds of power pin sit at the ends of the rows. 3V3 is the regulator's 3.3 V output, for sensors and the breadboard rail. 5V is the USB 5 V, before the regulator. The GND pins are ground. Use 3V3, not 5V, for anything that connects back to a GPIO pin.",
  show: ["bb", "esp", "usb"],
  highlight: "esp",
  markers: [pointAtPin("3V3"), pointAtPin("5V"), pointAtPin("GND")],
};
