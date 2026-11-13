import { type SceneProcedureStep } from "@/labs/experiments/types";
import { buttonOnPin } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Wire the ports, power and button",
  body: "Connect VCC and GND to the rails, RST to ground, P1.0 to P1.3 to the LED channels as before. Connect P3.2 (purple) to column 24, row a. Connect the button's right leg (column 26) to the ground rail.",
  show: ["bb", "mcu", "r0", "led0", "r1", "led1", "r2", "led2", "r3", "led3", "btn1", "w_vcc", "w_gnd", "w_rst", "w_p10", "w_p11", "w_p12", "w_p13", "w_k0", "w_k1", "w_k2", "w_k3", "w_p32", "w_btn_gnd"],
  highlight: "w_p32",
  schematic: buttonOnPin("8051 P3.2", "up")[3],
};
