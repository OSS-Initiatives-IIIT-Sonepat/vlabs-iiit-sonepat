import { type SceneProcedureStep } from "@/labs/experiments/types";
import { dividerOnPin } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Power the divider and tap the middle",
  body: "Connect VDD to the top rail (red) and from the rail, column 2, to the top resistor. Connect RA0 (yellow) to column 5, row a, the middle point. Connect VSS to the ground rail, and the bottom resistor's far leg (column 8) to the same rail.",
  show: ["bb", "pic", "r_top", "r_bot", "w_vdd", "w_top", "w_ra0", "w_bot", "w_vss"],
  highlight: "w_ra0",
  schematic: dividerOnPin("PIC18 RA0 (AN0)")[4],
};
