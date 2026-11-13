import { type SceneProcedureStep } from "@/labs/experiments/types";
import { pwmChain } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Set the PWM period",
  body: "Compile and program this code with MPLAB XC8. It sets a 8 MHz PWM period with PR2 = 255, so the output frequency is about 31 kHz, above flicker. The duty is still zero here, so the LED is off.\n#include <xc.h>\nvoid main(void) {\n  OSCCON = 0x70;            // 8 MHz\n  TRISCbits.TRISC2 = 0;     // CCP1 pin is an output\n  PR2 = 255;                // PWM period\n  T2CON = 0b00000100;       // Timer2 on, prescale 1:1\n  CCP1CON = 0b00001100;     // CCP1 in PWM mode\n  CCPR1L = 0;               // duty 0 %\n  while (1);\n}",
  show: ["bb", "pic", "r1", "led1", "w_vdd", "w_rc2", "w_vss", "w_led_gnd"],
  highlight: "duty",
  ledBrightness: { led1: 0 },
  readings: { "PWM frequency": "about 31 kHz" },
  schematic: pwmChain()[1],
};
