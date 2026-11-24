import { type SceneProcedureStep } from "@/labs/experiments/types";
import { pointAt } from "../markers";

export const step: SceneProcedureStep = {
  label: "9. Analog pins A0 to A5",
  body: "The six pins A0 to A5 read voltages. The chip's ADC turns the voltage between 0 V and 5 V into a number from 0 to 1023, which analogRead() returns. A sensor that changes a voltage, such as a potentiometer, is wired to one of these pins.",
  show: ["bb", "uno", "usb", "bat"],
  highlight: "uno",
  markers: [pointAt("analogHeader")],
};
