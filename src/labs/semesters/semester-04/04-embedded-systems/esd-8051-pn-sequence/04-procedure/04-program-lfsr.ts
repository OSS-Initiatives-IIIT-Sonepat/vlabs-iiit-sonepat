import { type SceneProcedureStep } from "@/labs/experiments/types";
import {
  SUPPLY,
  SYSTEM_8051,
} from "@/labs/semesters/semester-04/04-embedded-systems/chip-bench";
import { LEDS } from "../components";
import { leds8051Diagrams } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Program the LFSR",
  body: "Compile this with Keil C51 and write the hex file into the AT89S52 with an ISP programmer:\n#include <reg51.h>\nvoid delay(unsigned int ms) {\n  unsigned int i, j;\n  for (i = 0; i < ms; i++)\n    for (j = 0; j < 120; j++);\n}\nvoid main(void) {\n  unsigned char lfsr = 0x01;    // seed: never 0\n  unsigned char fb;\n  while (1) {\n    P1 = ~lfsr;                 // LOW pin = LED on (low nibble shown)\n    fb = ((lfsr >> 7) ^ (lfsr >> 5) ^ (lfsr >> 4) ^ (lfsr >> 3)) & 1;\n    lfsr = (lfsr << 1) | fb;    // shift and insert the feedback bit\n    delay(200);\n  }\n}",
  show: [...SUPPLY, ...SYSTEM_8051, ...LEDS],
  highlight: "u1",
  supplyVoltage: 5,
  ledBrightness: { led0: 1, led1: 0, led2: 0, led3: 0 },
  readings: { Register: "0x01 (seed)" },
  schematic: leds8051Diagrams[4],
};
