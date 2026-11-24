import { type SceneProcedureStep } from "@/labs/experiments/types";
import {
  SUPPLY,
  SYSTEM_8051,
} from "@/labs/semesters/semester-04/04-embedded-systems/chip-bench";
import { LED } from "../components";
import { intro8051Diagrams } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "8. Program: blink P1.0",
  body: "Compile this with Keil C51 and write the hex file into the AT89S52 with an ISP programmer:\n#include <reg51.h>\nsbit LED = P1^0;\nvoid delay(unsigned int ms) {\n  unsigned int i, j;\n  for (i = 0; i < ms; i++)\n    for (j = 0; j < 120; j++);   // about 1 ms at 11.0592 MHz\n}\nvoid main(void) {\n  while (1) {\n    LED = 0; delay(500);   // pin LOW: LED on\n    LED = 1; delay(500);   // pin HIGH: LED off\n  }\n}",
  show: [...SUPPLY, ...SYSTEM_8051, ...LED],
  highlight: "led1",
  supplyVoltage: 5,
  ledBrightness: { led1: 1 },
  readings: { "P1.0": "LOW: LED on" },
  schematic: intro8051Diagrams[4],
};
