import { type SceneProcedureStep } from "@/labs/experiments/types";
import {
  SUPPLY,
  SYSTEM_PIC,
} from "@/labs/semesters/semester-04/04-embedded-systems/chip-bench";
import { LED } from "../components";
import { picRd0Diagrams } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Blink at 8 MHz",
  body: "Compile this with MPLAB XC8 and program the PIC18F4550 with a PICkit on its ICSP pins (MCLR, RB6 and RB7):\n#include <xc.h>\n#define _XTAL_FREQ 8000000UL\nvoid main(void) {\n  OSCCON = 0x70;            // 8 MHz internal clock (IRCF = 111)\n  TRISDbits.TRISD0 = 0;     // RD0 is an output\n  while (1) {\n    LATDbits.LATD0 = 1; __delay_ms(500);\n    LATDbits.LATD0 = 0; __delay_ms(500);\n  }\n}\nThe LED is on for 0.5 s and off for 0.5 s: one full blink takes 1.0 s.",
  show: [...SUPPLY, ...SYSTEM_PIC, ...LED],
  highlight: "led1",
  supplyVoltage: 5,
  ledBrightness: { led1: 1 },
  readings: { "Blink period": "1.0 s at 8 MHz" },
  schematic: picRd0Diagrams[3],
};
