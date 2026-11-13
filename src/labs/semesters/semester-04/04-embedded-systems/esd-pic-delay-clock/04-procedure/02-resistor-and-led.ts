import { type SceneProcedureStep } from "@/labs/experiments/types";
import { ledFromPin } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Insert the resistor and the LED",
  body: "Push the 330 ohm resistor across row c, from column 3 to column 6. Place the LED in row c with its anode (long leg) in column 6 and its cathode in column 7.",
  show: ["bb", "pic", "r1", "led1"],
  highlight: "led1",
  schematic: ledFromPin("PIC18 RD0", "330 ohm")[2],
};
