import { type SceneProcedureStep } from "@/labs/experiments/types";
import {
  SUPPLY,
  SYSTEM_8051,
} from "@/labs/semesters/semester-04/04-embedded-systems/chip-bench";
import { LEDS, BUTTON } from "../components";
import { upDown8051Diagrams } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Press to count down",
  body: "Press and hold the button. P3.2 is pulled to ground, the program sees DIR = 0 and the count runs down: 15, 14, 13 and so on. Release the button and the count goes back up.",
  show: [...SUPPLY, ...SYSTEM_8051, ...LEDS, ...BUTTON],
  highlight: "btn1",
  supplyVoltage: 5,
  ledBrightness: { led0: 0, led1: 1, led2: 1, led3: 1 },
  readings: { Direction: "down (button pressed)", Count: "14 (1110)" },
  schematic: upDown8051Diagrams[5],
};
