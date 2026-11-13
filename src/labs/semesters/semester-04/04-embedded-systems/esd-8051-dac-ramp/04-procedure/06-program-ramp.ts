import { type SceneProcedureStep } from "@/labs/experiments/types";
import {
  SUPPLY,
  SYSTEM_8051,
} from "@/labs/semesters/semester-04/04-embedded-systems/chip-bench";
import { LADDER, BITS, METER } from "../components";
import { dac8051Diagrams } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Program the ramp",
  body: "Compile this with Keil C51 and write the hex file into the AT89S52 with an ISP programmer:\n#include <reg51.h>\nvoid delay(unsigned int ms) {\n  unsigned int i, j;\n  for (i = 0; i < ms; i++)\n    for (j = 0; j < 120; j++);\n}\nvoid main(void) {\n  unsigned char code = 0;\n  while (1) {\n    P1 = code & 0x0F;          // 4-bit code to the ladder\n    delay(100);                // hold each step\n    code = (code + 1) & 0x0F;  // 0 to 15, then wrap\n  }\n}\nThe voltmeter now rises in steps of about 0.31 V, from 0 V up to about 4.69 V, then drops back to 0 V.",
  show: [...SUPPLY, ...SYSTEM_8051, ...LADDER, ...BITS, ...METER],
  highlight: "vm",
  supplyVoltage: 5,
  readings: { vm: "2.50 V at code 8" },
  schematic: dac8051Diagrams[5],
};
