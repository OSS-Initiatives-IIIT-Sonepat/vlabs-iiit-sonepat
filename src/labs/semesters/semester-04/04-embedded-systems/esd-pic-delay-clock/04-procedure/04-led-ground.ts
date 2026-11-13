import { type SceneProcedureStep } from "@/labs/experiments/types";
import { ledFromPin } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Return the LED to ground",
  body: "Connect a black jumper from the LED cathode (column 7) to the ground rail. The LED now has a complete path: RD0, resistor, LED, ground.",
  show: ["bb", "pic", "r1", "led1", "w_rd0", "w_vdd", "w_vss", "w_led_gnd"],
  highlight: "w_led_gnd",
  schematic: ledFromPin("PIC18 RD0", "330 ohm")[3],
};
