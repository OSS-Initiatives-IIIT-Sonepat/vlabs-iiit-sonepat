import { type SceneProcedureStep } from "@/labs/experiments/types";
import { ledFromPin } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Program the LFSR",
  body: "Compile this with Keil C51 and program the trainer:\n#include <reg51.h>\nvoid delay(unsigned int ms) {\n  unsigned int i, j;\n  for (i = 0; i < ms; i++)\n    for (j = 0; j < 120; j++);\n}\nvoid main(void) {\n  unsigned char lfsr = 0x01;    // seed: never 0\n  unsigned char fb;\n  while (1) {\n    P1 = lfsr & 0x0F;           // show the low nibble\n    fb = ((lfsr >> 7) ^ (lfsr >> 5) ^ (lfsr >> 4) ^ (lfsr >> 3)) & 1;\n    lfsr = (lfsr << 1) | fb;    // shift and insert the feedback bit\n    delay(200);\n  }\n}",
  show: [
    "bb",
    "mcu",
    "r0",
    "led0",
    "r1",
    "led1",
    "r2",
    "led2",
    "r3",
    "led3",
    "w_vcc",
    "w_gnd",
    "w_rst",
    "w_p10",
    "w_p11",
    "w_p12",
    "w_p13",
    "w_k0",
    "w_k1",
    "w_k2",
    "w_k3",
  ],
  highlight: "led0",
  readings: { "Register (hex)": "01 at the start" },
  schematic: ledFromPin("8051 P1.0", "330 ohm")[3],
};
