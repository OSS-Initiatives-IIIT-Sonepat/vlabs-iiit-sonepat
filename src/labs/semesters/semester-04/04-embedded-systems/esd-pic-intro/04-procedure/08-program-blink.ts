import { type SceneProcedureStep } from "@/labs/experiments/types";
import {
  SUPPLY,
  SYSTEM_PIC,
} from "@/labs/semesters/semester-04/04-embedded-systems/chip-bench";
import { LED } from "../components";
import { introPicDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "8. Program: blink RD0",
  body: "Compile this with MPLAB XC8 and program the PIC18F4550 with a PICkit on its ICSP pins (MCLR, RB6 and RB7):\n#include <xc.h>\n#pragma config FOSC = INTOSCIO_EC   // internal oscillator, RA6 is I/O\n#pragma config WDT = OFF, LVP = OFF, MCLRE = ON\n#define _XTAL_FREQ 8000000UL\nvoid main(void) {\n  OSCCON = 0x70;          // 8 MHz\n  TRISDbits.TRISD0 = 0;   // RD0 is an output\n  while (1) {\n    LATDbits.LATD0 = 1; __delay_ms(500);   // LED on\n    LATDbits.LATD0 = 0; __delay_ms(500);   // LED off\n  }\n}",
  show: [...SUPPLY, ...SYSTEM_PIC, ...LED],
  highlight: "led1",
  supplyVoltage: 5,
  ledBrightness: { led1: 1 },
  readings: { RD0: "HIGH: LED on" },
  schematic: introPicDiagrams[3],
};
