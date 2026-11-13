import { type SceneProcedureStep } from "@/labs/experiments/types";
import {
  SUPPLY,
  SYSTEM_PIC,
} from "@/labs/semesters/semester-04/04-embedded-systems/chip-bench";
import { INPUT, LED } from "../components";
import { ioPicDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Program and press the button",
  body: "Compile this with MPLAB XC8 and program the PIC18F4550 with a PICkit on its ICSP pins (MCLR, RB6 and RB7):\n#include <xc.h>\nvoid main(void) {\n  ADCON1 = 0x0F;              // all pins digital\n  TRISBbits.TRISB0 = 1;       // RB0 input: the button\n  TRISDbits.TRISD0 = 0;       // RD0 output: the LED\n  while (1) {\n    LATDbits.LATD0 = PORTBbits.RB0;   // LED follows the button\n  }\n}\nWith the button open the LED is off. Press and hold the button and the LED turns on.",
  show: [...SUPPLY, ...SYSTEM_PIC, ...INPUT, ...LED],
  highlight: "btn1",
  supplyVoltage: 5,
  ledBrightness: { led1: 1 },
  readings: { RB0: "HIGH while pressed" },
  schematic: ioPicDiagrams[4],
};
