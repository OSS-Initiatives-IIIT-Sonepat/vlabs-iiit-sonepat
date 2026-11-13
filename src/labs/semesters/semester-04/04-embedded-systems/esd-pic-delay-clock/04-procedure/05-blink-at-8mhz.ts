import { type SceneProcedureStep } from "@/labs/experiments/types";
import { ledFromPin } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Blink at 8 MHz",
  body: "Compile and program this code with MPLAB XC8:\n#include <xc.h>\n#define _XTAL_FREQ 8000000UL\nvoid main(void) {\n  OSCCON = 0x70;            // 8 MHz internal clock (IRCF = 111)\n  TRISDbits.TRISD0 = 0;     // RD0 is an output\n  while (1) {\n    LATDbits.LATD0 = 1; __delay_ms(500);\n    LATDbits.LATD0 = 0; __delay_ms(500);\n  }\n}\nThe LED is on for 0.5 s and off for 0.5 s: one full blink takes 1.0 s.",
  show: ["bb", "pic", "r1", "led1", "w_rd0", "w_vdd", "w_vss", "w_led_gnd"],
  highlight: "led1",
  ledBrightness: { led1: 1 },
  readings: { "Blink period": "1.0 s at 8 MHz" },
  schematic: ledFromPin("PIC18 RD0", "330 ohm")[3],
};
