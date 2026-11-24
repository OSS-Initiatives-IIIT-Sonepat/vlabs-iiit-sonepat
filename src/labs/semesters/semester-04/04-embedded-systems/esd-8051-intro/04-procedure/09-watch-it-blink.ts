import { type SceneProcedureStep } from "@/labs/experiments/types";
import {
  SUPPLY,
  SYSTEM_8051,
} from "@/labs/semesters/semester-04/04-embedded-systems/chip-bench";
import { LED } from "../components";
import { intro8051Diagrams } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "9. Watch it blink",
  body: "The LED is on for half a second and off for half a second. Press nothing: after power-up the reset network starts the program by itself. Switch the supply off and on again and it starts over. Change delay(500) to delay(100) and the blink gets five times faster.",
  show: [...SUPPLY, ...SYSTEM_8051, ...LED],
  highlight: "led1",
  supplyVoltage: 5,
  ledBrightness: { led1: 0 },
  readings: { "P1.0": "HIGH: LED off", "Blink period": "about 1 s" },
  schematic: intro8051Diagrams[4],
};
