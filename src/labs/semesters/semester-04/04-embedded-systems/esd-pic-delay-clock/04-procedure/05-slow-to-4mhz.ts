import { type SceneProcedureStep } from "@/labs/experiments/types";
import {
  SUPPLY,
  SYSTEM_PIC,
} from "@/labs/semesters/semester-04/04-embedded-systems/chip-bench";
import { LED } from "../components";
import { picRd0Diagrams } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Change the clock to 4 MHz",
  body: "Change only the first line of main() to OSCCON = 0x60; (4 MHz) and keep the delays and _XTAL_FREQ unchanged. Program it again. The same __delay_ms(500) now lasts about twice as long in real time, so one blink takes about 2.0 s. The program did not change; the clock did.",
  show: [...SUPPLY, ...SYSTEM_PIC, ...LED],
  highlight: "led1",
  supplyVoltage: 5,
  ledBrightness: { led1: 0 },
  readings: { "Blink period": "about 2.0 s at 4 MHz" },
  schematic: picRd0Diagrams[3],
};
