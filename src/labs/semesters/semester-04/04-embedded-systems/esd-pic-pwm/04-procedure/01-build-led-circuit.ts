import { type SceneProcedureStep } from "@/labs/experiments/types";
import { pwmChain } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Build the LED circuit",
  body: "Place the trainer on the right. Build the 330 ohm and LED circuit across row c, columns 3 to 7. Wire RC2 (purple) to column 3, row a, VDD to the top rail, VSS and the LED cathode to the ground rail.",
  show: ["bb", "pic", "r1", "led1", "w_vdd", "w_rc2", "w_vss", "w_led_gnd"],
  highlight: "w_rc2",
  schematic: pwmChain()[0],
};
