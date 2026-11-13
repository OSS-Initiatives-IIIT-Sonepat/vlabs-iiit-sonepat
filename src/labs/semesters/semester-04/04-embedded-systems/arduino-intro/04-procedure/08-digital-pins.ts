import { type SceneProcedureStep } from "@/labs/experiments/types";
import { pointAt } from "../markers";

export const step: SceneProcedureStep = {
  label: "8. Digital pins D0 to D13",
  body: "The long black header along the far edge has the digital pins D0 to D13. Each pin is either an input or an output, and it reads or drives 0 V (LOW) or 5 V (HIGH). Pins marked ~ (3, 5, 6, 9, 10, 11) can also output PWM with analogWrite. D0 and D1 are the serial pins, so leave them free for USB.",
  show: ["bb", "uno", "usb", "bat"],
  highlight: "uno",
  markers: [pointAt("digitalHeader")],
};
