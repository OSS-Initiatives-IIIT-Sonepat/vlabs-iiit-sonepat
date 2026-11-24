import { type SceneProcedureStep } from "@/labs/experiments/types";
import { pointAt } from "../markers";

export const step: SceneProcedureStep = {
  label: "7. Status LEDs",
  body: "The green LED marked ON lights when the board has power. The yellow LED marked L is wired to digital pin 13, so a sketch can blink it with no wires at all. The two small red LEDs by the header are TX and RX: they flash when data moves between the PC and the chip.",
  show: ["bb", "uno", "usb", "bat"],
  highlight: "uno",
  markers: [pointAt("powerLed"), pointAt("pinLed")],
};
