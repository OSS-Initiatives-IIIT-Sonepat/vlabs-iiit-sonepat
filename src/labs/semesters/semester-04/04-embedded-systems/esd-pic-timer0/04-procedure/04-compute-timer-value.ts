import { type SceneProcedureStep } from "@/labs/experiments/types";
import {
  SUPPLY,
  SYSTEM_PIC,
} from "@/labs/semesters/semester-04/04-embedded-systems/chip-bench";
import { LED } from "../components";
import { picRd0Diagrams } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Work out the timer value",
  body: "Clock 8 MHz gives Fosc/4 = 2 MHz. Prescale 1:64 gives 31 250 counts per second. For a 0.5 s overflow, the count needed is 15 625. Load TMR0 with 65 536 - 15 625 = 49 911 (0xC2F7) after every overflow.",
  show: [...SUPPLY, ...SYSTEM_PIC, ...LED],
  highlight: "u1",
  supplyVoltage: 5,
  readings: { "TMR0 reload": "49 911 (0xC2F7)" },
  schematic: picRd0Diagrams[3],
};
