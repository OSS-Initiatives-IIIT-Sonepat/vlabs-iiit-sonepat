import { type SceneProcedureStep } from "@/labs/experiments/types";
import { ledFromPin } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Build the trainer and four LEDs",
  body: "Place the breadboard and the 8051 trainer on the right. Build the four LED channels as in the binary counter experiment, with P1.0 to P1.3 in columns 2, 7, 12 and 17, and the cathodes on the ground rail. Power the trainer and tie RST to ground.",
  show: ["bb", "mcu", "r0", "led0", "r1", "led1", "r2", "led2", "r3", "led3", "w_vcc", "w_gnd", "w_rst", "w_p10", "w_p11", "w_p12", "w_p13", "w_k0", "w_k1", "w_k2", "w_k3"],
  highlight: "r0",
  schematic: ledFromPin("8051 P1.0", "330 ohm")[3],
};
