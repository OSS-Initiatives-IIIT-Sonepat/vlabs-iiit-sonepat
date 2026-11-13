import { type SceneProcedureStep } from "@/labs/experiments/types";
import { buttonOnPin } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Program the up/down counter",
  body: "Compile this with Keil C51 and program the trainer:\n#include <reg51.h>\nsbit DIR = P3^2;          // button to GND: pressed = 0\nvoid delay(unsigned int ms) {\n  unsigned int i, j;\n  for (i = 0; i < ms; i++)\n    for (j = 0; j < 120; j++);\n}\nvoid main(void) {\n  unsigned char count = 0;\n  DIR = 1;                // enable the internal pull-up\n  while (1) {\n    P1 = count & 0x0F;\n    delay(300);\n    if (DIR) count++;      // released: count up\n    else     count--;      // pressed: count down\n    count &= 0x0F;\n  }\n}",
  show: ["bb", "mcu", "r0", "led0", "r1", "led1", "r2", "led2", "r3", "led3", "btn1", "w_vcc", "w_gnd", "w_rst", "w_p10", "w_p11", "w_p12", "w_p13", "w_k0", "w_k1", "w_k2", "w_k3", "w_p32", "w_btn_gnd"],
  highlight: "led0",
  readings: { "Direction": "up (button released)" },
  schematic: buttonOnPin("8051 P3.2", "up")[3],
};
