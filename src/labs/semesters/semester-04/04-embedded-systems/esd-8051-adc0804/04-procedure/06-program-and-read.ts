import { type SceneProcedureStep } from "@/labs/experiments/types";
import {
  SUPPLY,
  SYSTEM_8051,
} from "@/labs/semesters/semester-04/04-embedded-systems/chip-bench";
import { ADC, DIVIDER, ADC_POWER, BUS } from "../components";
import { adc8051Diagrams } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Program and read the ADC",
  body: "Compile this with Keil C51 and write the hex file into the AT89S52 with an ISP programmer:\n#include <reg51.h>\nsbit RD   = P3^7;     // ADC0804 read (active low)\nsbit WR   = P3^6;     // ADC0804 write / start (active low)\nsbit INTR = P3^2;     // ADC0804 done (goes low)\nvoid delay(unsigned int ms) {\n  unsigned int i, j;\n  for (i = 0; i < ms; i++)\n    for (j = 0; j < 120; j++);\n}\nvoid main(void) {\n  unsigned char value;\n  while (1) {\n    WR = 0; WR = 1;          // start a conversion\n    while (INTR == 1);       // wait until done\n    P1 = 0xFF;               // make P1 an input\n    RD = 0; value = P1; RD = 1;   // read the 8-bit result\n    delay(200);\n  }\n}\nAt VIN = 2.5 V the result is 128 (1000 0000).",
  show: [...SUPPLY, ...ADC, ...SYSTEM_8051, ...DIVIDER, ...ADC_POWER, ...BUS],
  highlight: "u2",
  supplyVoltage: 5,
  readings: { "ADC0804 output": "128 (1000 0000) at 2.5 V" },
  schematic: adc8051Diagrams[5],
};
