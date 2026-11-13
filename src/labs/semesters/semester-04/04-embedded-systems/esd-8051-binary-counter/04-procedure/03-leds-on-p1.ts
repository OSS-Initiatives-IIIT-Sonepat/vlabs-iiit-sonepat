import { type SceneProcedureStep } from "@/labs/experiments/types";
import { ledFromPin } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Build the four LED channels",
  body: "Build four identical channels. Each has a 330 ohm resistor across row c (columns 2-5, 7-10, 12-15, 17-20), an LED with its anode at the resistor's far end, and its cathode in the next free column on the ground rail. Connect P1.0 to column 2, P1.1 to column 7, P1.2 to column 12 and P1.3 to column 17, all on row a.",
  show: ["bb", "mcu", "w_vcc", "w_gnd", "w_rst", "r0", "led0", "r1", "led1", "r2", "led2", "r3", "led3", "w_p10", "w_p11", "w_p12", "w_p13", "w_k0", "w_k1", "w_k2", "w_k3"],
  highlight: "r0",
  schematic: ledFromPin("8051 P1.0", "330 ohm")[3],
};
