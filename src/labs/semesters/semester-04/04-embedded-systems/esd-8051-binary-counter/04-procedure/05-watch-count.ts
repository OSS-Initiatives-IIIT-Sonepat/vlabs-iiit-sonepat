import { type SceneProcedureStep } from "@/labs/experiments/types";
import {
  SUPPLY,
  SYSTEM_8051,
} from "@/labs/semesters/semester-04/04-embedded-systems/chip-bench";
import { LEDS } from "../components";
import { leds8051Diagrams } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Watch the count",
  body: "The LEDs show the count in binary, one step per half second. Count 5 is LED0 and LED2 on (0101). Count 15 is all four on, and the next step returns to 0. Change STOP to 9 and the count restarts after 9. Change the delay to slow or speed up the count.",
  show: [...SUPPLY, ...SYSTEM_8051, ...LEDS],
  highlight: "led2",
  supplyVoltage: 5,
  ledBrightness: { led0: 1, led1: 0, led2: 1, led3: 0 },
  readings: { Count: "5 (0101)" },
  schematic: leds8051Diagrams[4],
};
