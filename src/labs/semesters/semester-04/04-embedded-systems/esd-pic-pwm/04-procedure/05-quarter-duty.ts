import { type SceneProcedureStep } from "@/labs/experiments/types";
import {
  SUPPLY,
  SYSTEM_PIC,
} from "@/labs/semesters/semester-04/04-embedded-systems/chip-bench";
import { LED } from "../components";
import { picCcp1Diagrams } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "25 % duty",
  body: "Set CCPR1L = 64 in the same program. The duty is 64 / 256, about 25 %, and the LED is dim. The average voltage is about a quarter of 5 V.",
  show: [...SUPPLY, ...SYSTEM_PIC, ...LED],
  highlight: "led1",
  supplyVoltage: 5,
  ledBrightness: { led1: 0.25 },
  readings: { "Duty cycle": "25 % (CCPR1L = 64)" },
  schematic: picCcp1Diagrams[3],
};
