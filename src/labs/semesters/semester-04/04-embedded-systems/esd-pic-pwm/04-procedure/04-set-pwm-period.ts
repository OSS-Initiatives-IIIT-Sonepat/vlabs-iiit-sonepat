import { type SceneProcedureStep } from "@/labs/experiments/types";
import {
  SUPPLY,
  SYSTEM_PIC,
} from "@/labs/semesters/semester-04/04-embedded-systems/chip-bench";
import { LED } from "../components";
import { picCcp1Diagrams } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Set the PWM period",
  body: "Compile this with MPLAB XC8 and program the PIC18F4550 with a PICkit on its ICSP pins (MCLR, RB6 and RB7). It sets PR2 = 255 at 8 MHz, so the PWM frequency is about 7.8 kHz, far above flicker. The duty is still zero here, so the LED is off:\n#include <xc.h>\nvoid main(void) {\n  OSCCON = 0x70;            // 8 MHz\n  TRISCbits.TRISC2 = 0;     // CCP1 pin is an output\n  PR2 = 255;                // PWM period\n  T2CON = 0b00000100;       // Timer2 on, prescale 1:1\n  CCP1CON = 0b00001100;     // CCP1 in PWM mode\n  CCPR1L = 0;               // duty 0 %\n  while (1);\n}",
  show: [...SUPPLY, ...SYSTEM_PIC, ...LED],
  highlight: "u1",
  supplyVoltage: 5,
  ledBrightness: { led1: 0 },
  readings: { "PWM frequency": "about 7.8 kHz" },
  schematic: picCcp1Diagrams[3],
};
