import { type SceneProcedureStep } from "@/labs/experiments/types";
import { ledFromPin } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Power the trainer",
  body: "Connect VCC to the top rail (red) and GND to the ground rail (black). Tie RST to ground so the chip runs and is not held in reset. The 8051 crystal is on the trainer, so XTAL1 and XTAL2 need no wires.",
  show: ["bb", "mcu", "w_vcc", "w_gnd", "w_rst"],
  highlight: "w_vcc",
  schematic: ledFromPin("8051 P1.0", "330 ohm")[0],
};
