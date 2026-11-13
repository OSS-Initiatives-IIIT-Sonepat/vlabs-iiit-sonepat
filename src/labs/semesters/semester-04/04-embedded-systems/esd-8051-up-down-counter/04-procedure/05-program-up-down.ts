import { type SceneProcedureStep } from "@/labs/experiments/types";
import {
  SUPPLY,
  SYSTEM_8051,
} from "@/labs/semesters/semester-04/04-embedded-systems/chip-bench";
import { LEDS, BUTTON } from "../components";
import { upDown8051Diagrams } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Program the up/down counter",
  body: "Compile this with Keil C51 and write the hex file into the AT89S52 with an ISP programmer:\n#include <reg51.h>\nsbit DIR = P3^2;          // button to GND: pressed = 0\nvoid delay(unsigned int ms) {\n  unsigned int i, j;\n  for (i = 0; i < ms; i++)\n    for (j = 0; j < 120; j++);\n}\nvoid main(void) {\n  unsigned char count = 0;\n  DIR = 1;                // enable the internal pull-up\n  while (1) {\n    P1 = ~count;          // LOW pin = LED on\n    delay(300);\n    if (DIR) count++;      // released: count up\n    else     count--;      // pressed: count down\n    count &= 0x0F;\n  }\n}",
  show: [...SUPPLY, ...SYSTEM_8051, ...LEDS, ...BUTTON],
  highlight: "led0",
  supplyVoltage: 5,
  ledBrightness: { led0: 1, led1: 1, led2: 0, led3: 0 },
  readings: { Direction: "up (button released)" },
  schematic: upDown8051Diagrams[5],
};
