import { type SceneProcedureStep } from "@/labs/experiments/types";
import { ledFromPin } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Watch the sequence repeat",
  body: "Watch the four LEDs. The register starts at 0x01 and the pattern changes every step. Count the steps: the full 8-bit sequence repeats only after 255 steps, and the register never reaches 0x00. Shorten the delay to see more steps quickly.",
  show: ["bb", "mcu", "r0", "led0", "r1", "led1", "r2", "led2", "r3", "led3", "w_vcc", "w_gnd", "w_rst", "w_p10", "w_p11", "w_p12", "w_p13", "w_k0", "w_k1", "w_k2", "w_k3"],
  highlight: "led2",
  readings: { "Register (hex)": "01, 02, 05, 0A, 14, ..." },
  schematic: ledFromPin("8051 P1.0", "330 ohm")[3],
};
