import { type SceneProcedureStep } from "@/labs/experiments/types";
import { ledFromPin } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Program the binary counter",
  body: "Compile this with Keil C51 and program the trainer:\n#include <reg51.h>\n#define STOP 15                 // stop value, 0 to 255\nvoid delay(unsigned int ms) {\n  unsigned int i, j;\n  for (i = 0; i < ms; i++)\n    for (j = 0; j < 120; j++);\n}\nvoid main(void) {\n  unsigned char count = 0;\n  while (1) {\n    P1 = count & 0x0F;      // show the low 4 bits on P1.0 to P1.3\n    delay(500);             // about half a second per count\n    count++;\n    if (count > STOP) count = 0;\n  }\n}",
  show: [
    "bb",
    "mcu",
    "w_vcc",
    "w_gnd",
    "w_rst",
    "r0",
    "led0",
    "r1",
    "led1",
    "r2",
    "led2",
    "r3",
    "led3",
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
  readings: { "P1 (binary)": "0000 at reset, then counting" },
  schematic: ledFromPin("8051 P1.0", "330 ohm")[3],
};
