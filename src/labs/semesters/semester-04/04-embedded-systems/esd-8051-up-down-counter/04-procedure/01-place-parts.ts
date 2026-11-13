import { type SceneProcedureStep } from "@/labs/experiments/types";
import { buttonOnPin } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Place the trainer, LEDs and button",
  body: "Place the breadboard and the 8051 trainer on the right. Build the four LED channels exactly as in the binary counter experiment (columns 2 to 21). Push the direction button across row c, from column 25 to column 27.",
  show: [
    "bb",
    "mcu",
    "r0",
    "led0",
    "r1",
    "led1",
    "r2",
    "led2",
    "r3",
    "led3",
    "btn1",
  ],
  highlight: "btn1",
  schematic: buttonOnPin("8051 P3.2", "up")[2],
};
