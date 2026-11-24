import { type SceneProcedureStep } from "@/labs/experiments/types";
import {
  SUPPLY,
  SYSTEM_PIC,
} from "@/labs/semesters/semester-04/04-embedded-systems/chip-bench";
import { DIVIDER, LED } from "../components";
import { adcPicDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Program the ADC",
  body: "Compile this with MPLAB XC8 and program the PIC18F4550 with a PICkit on its ICSP pins (MCLR, RB6 and RB7):\n#include <xc.h>\nvoid main(void) {\n  ADCON1 = 0x0E;            // AN0 analog, the rest digital\n  TRISAbits.TRISA0 = 1;     // RA0 input\n  TRISDbits.TRISD0 = 0;     // RD0 output\n  ADCON2 = 0b10101010;      // right-justified result, Tad = Fosc/32\n  ADCON0 = 0x01;            // channel AN0, ADC on\n  while (1) {\n    ADCON0bits.GO = 1;      // start a conversion\n    while (ADCON0bits.GO);  // wait until done\n    unsigned int v = ((unsigned int)ADRESH << 8) | ADRESL;   // 0 to 1023\n    LATDbits.LATD0 = (v > 512);\n  }\n}",
  show: [...SUPPLY, ...SYSTEM_PIC, ...DIVIDER, ...LED],
  highlight: "u1",
  supplyVoltage: 5,
  ledBrightness: { led1: 0 },
  readings: { "ADC result": "512 (about 2.5 V)" },
  schematic: adcPicDiagrams[4],
};
