import { type SceneProcedureStep } from "@/labs/experiments/types";
import { r2rLadder } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Program the ramp",
  body: "Compile this with Keil C51 and program the trainer:\n#include <reg51.h>\nvoid delay(unsigned int ms) {\n  unsigned int i, j;\n  for (i = 0; i < ms; i++)\n    for (j = 0; j < 120; j++);\n}\nvoid main(void) {\n  unsigned char code = 0;\n  while (1) {\n    P1 = code & 0x0F;          // 4-bit code to the ladder\n    delay(100);                // hold each step\n    code = (code + 1) & 0x0F;  // 0 to 15, then wrap\n  }\n}\nThe voltmeter now rises in steps of about 0.31 V, from 0 V up to about 4.7 V, then drops back to 0 V.",
  show: [
    "bb",
    "mcu",
    "r1",
    "r2",
    "r3",
    "r4",
    "w_vcc",
    "w_gnd",
    "w_rst",
    "w_p10",
    "w_j1",
    "w_p11",
    "w_j2",
    "w_p12",
    "w_j3",
    "w_p13",
    "vm",
  ],
  highlight: "vm",
  readings: { Vout: "0 V to 4.69 V in 0.31 V steps" },
  schematic: r2rLadder()[4],
};
