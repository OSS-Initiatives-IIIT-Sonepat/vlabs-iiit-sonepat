import { type SceneProcedureStep } from "@/labs/experiments/types";
import { pointAt } from "../markers";

export const step: SceneProcedureStep = {
  label: "3. Barrel jack and voltage regulator",
  body: "The black barrel jack takes 7 to 12 V from a plug-in adapter or a 9 V battery, like the one plugged in here, for when the board is not on USB. The small black regulator next to it turns that into a steady 5 V for the chip and the pins. The board picks whichever source is present, so USB and the barrel jack are interchangeable.",
  show: ["bb", "uno", "usb", "bat"],
  highlight: "uno",
  markers: [pointAt("powerJack"), pointAt("regulator")],
};
