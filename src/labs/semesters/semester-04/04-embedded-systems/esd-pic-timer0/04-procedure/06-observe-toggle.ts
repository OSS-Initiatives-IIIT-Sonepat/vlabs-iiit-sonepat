import { type SceneProcedureStep } from "@/labs/experiments/types";
import {
  SUPPLY,
  SYSTEM_PIC,
} from "@/labs/semesters/semester-04/04-embedded-systems/chip-bench";
import { LED } from "../components";
import { picRd0Diagrams } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Watch the toggle",
  body: "Each overflow toggles the LED, so it switches state every 0.5 s and blinks with a period of 1.0 s. Add a second task to the main loop, for example a counter, to show that the blink does not stop while the CPU is busy.",
  show: [...SUPPLY, ...SYSTEM_PIC, ...LED],
  highlight: "led1",
  supplyVoltage: 5,
  ledBrightness: { led1: 0 },
  readings: { "Blink period": "1.0 s" },
  schematic: picRd0Diagrams[3],
};
