import { type SceneProcedureStep } from "@/labs/experiments/types";
import { ledFromPin } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Wire RD0 and power the chip",
  body: "Connect an orange jumper from pin RD0 to column 3, row a. Connect a red jumper from VDD to the top power rail (column 1) and a black jumper from VSS to the ground rail (column 2). The chip is now powered and RD0 drives the LED.",
  show: ["bb", "pic", "r1", "led1", "w_rd0", "w_vdd", "w_vss"],
  highlight: "w_rd0",
  schematic: ledFromPin("PIC18 RD0", "330 ohm")[2],
};
