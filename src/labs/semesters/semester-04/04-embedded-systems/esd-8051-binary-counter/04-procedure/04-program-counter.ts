import { type SceneProcedureStep } from "@/labs/experiments/types";
import {
  SUPPLY,
  SYSTEM_8051,
} from "@/labs/semesters/semester-04/04-embedded-systems/chip-bench";
import { LEDS } from "../components";
import { leds8051Diagrams } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Program the binary counter",
  body: "Compile this with Keil C51 and write the hex file into the AT89S52 with an ISP programmer:\n#include <reg51.h>\n#define STOP 15                 // stop value, 0 to 255\nvoid delay(unsigned int ms) {\n  unsigned int i, j;\n  for (i = 0; i < ms; i++)\n    for (j = 0; j < 120; j++);\n}\nvoid main(void) {\n  unsigned char count = 0;\n  while (1) {\n    P1 = ~count;            // a 1 bit pulls its pin LOW and lights the LED\n    delay(500);             // about half a second per count\n    count++;\n    if (count > STOP) count = 0;\n  }\n}",
  show: [...SUPPLY, ...SYSTEM_8051, ...LEDS],
  highlight: "u1",
  supplyVoltage: 5,
  readings: { "P1 (binary)": "0000 at reset, then counting" },
  schematic: leds8051Diagrams[4],
};
