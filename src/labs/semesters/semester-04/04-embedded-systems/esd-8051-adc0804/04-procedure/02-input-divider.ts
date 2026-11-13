import { type SceneProcedureStep } from "@/labs/experiments/types";
import { adcChain } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Build the input divider",
  body: "Place the two 10 kohm resistors across row c: R1 from column 2 to 5, R2 from column 5 to 8. Connect the middle point (column 5, row a) to VIN+ (yellow). Connect VIN- and the bottom resistor's far leg to ground. VIN+ is now 2.5 V.",
  show: ["bb", "mcu", "adc", "r_top", "r_bot", "w_top", "w_vinp", "w_bot", "w_vinn"],
  highlight: "w_vinp",
  schematic: adcChain()[1],
};
