import { type SceneProcedureStep } from "@/labs/experiments/types";
import { buttonOnPin } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Program and press the button",
  body: "Compile and program this code with MPLAB XC8:\n#include <xc.h>\nvoid main(void) {\n  ADCON1 = 0x0F;              // all pins digital\n  TRISBbits.TRISB0 = 1;       // RB0 input: the button\n  TRISDbits.TRISD0 = 0;       // RD0 output: the LED\n  while (1) {\n    LATDbits.LATD0 = PORTBbits.RB0;   // LED follows the button\n  }\n}\nWith the button open the LED is off. Press and hold the button and the LED turns on.",
  show: ["bb", "pic", "btn1", "r_pd", "r1", "led1", "w_rb0", "w_btn_vdd", "w_pd_gnd", "w_vdd", "w_vss", "w_rd0", "w_led_gnd"],
  highlight: "btn1",
  ledBrightness: { led1: 1 },
  readings: { RB0: "HIGH while pressed" },
  schematic: buttonOnPin("PIC18 RB0", "down")[3],
};
