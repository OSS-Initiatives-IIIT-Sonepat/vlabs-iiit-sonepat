import { type SceneProcedureStep } from "@/labs/experiments/types";
import {
  SUPPLY,
  SYSTEM_PIC,
} from "@/labs/semesters/semester-04/04-embedded-systems/chip-bench";
import { LED } from "../components";
import { picCcp1Diagrams } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "50 % and then near 100 %",
  body: "Change CCPR1L to 128 and program again: the duty is 50 % and the LED is half bright. Then use 255: the duty is about 100 % and the LED is at full brightness. A loop that steps CCPR1L from 0 to 255 fades the LED smoothly.",
  show: [...SUPPLY, ...SYSTEM_PIC, ...LED],
  highlight: "led1",
  supplyVoltage: 5,
  ledBrightness: { led1: 1 },
  readings: { "Duty cycle": "50 % then about 100 %" },
  schematic: picCcp1Diagrams[3],
};
