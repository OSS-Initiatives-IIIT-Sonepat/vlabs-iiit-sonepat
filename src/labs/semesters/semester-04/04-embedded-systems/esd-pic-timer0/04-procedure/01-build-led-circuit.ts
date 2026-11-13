import { type SceneProcedureStep } from "@/labs/experiments/types";
import { timerChain } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Build the LED circuit",
  body: "Place the trainer on the right and the 330 ohm resistor and LED as in the delay experiment: resistor across row c from column 3 to 6, LED anode in column 6, cathode in column 7. Wire RD0 to column 3, row a, VDD to the top rail, VSS and the LED cathode to the ground rail.",
  show: ["bb", "pic", "r1", "led1", "w_vdd", "w_rd0", "w_vss", "w_led_gnd"],
  highlight: "led1",
  schematic: timerChain()[0],
};
