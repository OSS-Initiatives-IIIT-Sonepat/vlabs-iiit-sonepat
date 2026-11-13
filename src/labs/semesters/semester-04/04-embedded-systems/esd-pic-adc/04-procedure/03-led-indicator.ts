import { type SceneProcedureStep } from "@/labs/experiments/types";
import { dividerOnPin } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Add the threshold LED",
  body: "Place the 330 ohm resistor from column 12 to column 15 and the LED with its anode in column 15 and cathode in column 16. Run an orange jumper from RD0 to column 12, row a, and a black jumper from the cathode to the ground rail.",
  show: ["bb", "pic", "r_top", "r_bot", "w_vdd", "w_top", "w_ra0", "w_bot", "w_vss", "r1", "led1", "w_rd0", "w_led_gnd"],
  highlight: "led1",
  schematic: dividerOnPin("PIC18 RA0 (AN0)")[4],
};
