import { type SceneProcedureStep } from "@/labs/experiments/types";
import {
  SUPPLY,
  SYSTEM_PIC,
} from "@/labs/semesters/semester-04/04-embedded-systems/chip-bench";
import { LED } from "../components";
import { introPicDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "9. Watch it blink",
  body: "The LED is on for half a second and off for half a second. The #pragma config lines are the chip's configuration bits: they are written once with the program and choose the internal oscillator, switch off the watchdog timer and keep MCLR as a reset pin. Change the delays to change the blink rate.",
  show: [...SUPPLY, ...SYSTEM_PIC, ...LED],
  highlight: "led1",
  supplyVoltage: 5,
  ledBrightness: { led1: 0 },
  readings: { RD0: "LOW: LED off", "Blink period": "1.0 s" },
  schematic: introPicDiagrams[3],
};
