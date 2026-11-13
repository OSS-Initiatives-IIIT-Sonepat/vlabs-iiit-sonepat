import { type SceneProcedureStep } from "@/labs/experiments/types";
import {
  SUPPLY,
  SYSTEM_PIC,
} from "@/labs/semesters/semester-04/04-embedded-systems/chip-bench";
import { LED } from "../components";
import { picRd0Diagrams } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Program the timer and the interrupt",
  body: "Compile this with MPLAB XC8 and program the PIC18F4550 with a PICkit on its ICSP pins (MCLR, RB6 and RB7):\n#include <xc.h>\nvoid __interrupt() isr(void) {\n  if (INTCONbits.TMR0IF) {\n    INTCONbits.TMR0IF = 0;   // clear the overflow flag\n    TMR0 = 49911;            // reload for 0.5 s\n    LATDbits.LATD0 ^= 1;     // toggle the LED\n  }\n}\nvoid main(void) {\n  OSCCON = 0x70;             // 8 MHz\n  TRISDbits.TRISD0 = 0;      // RD0 output\n  T0CON = 0x85;              // Timer0 on, 16-bit, prescale 1:64\n  INTCONbits.TMR0IE = 1;     // enable the Timer0 interrupt\n  INTCONbits.GIE = 1;        // global interrupts on\n  while (1) { }              // the CPU does nothing here\n}",
  show: [...SUPPLY, ...SYSTEM_PIC, ...LED],
  highlight: "led1",
  supplyVoltage: 5,
  ledBrightness: { led1: 1 },
  readings: { "Timer0 overflow": "every 0.5 s" },
  schematic: picRd0Diagrams[3],
};
