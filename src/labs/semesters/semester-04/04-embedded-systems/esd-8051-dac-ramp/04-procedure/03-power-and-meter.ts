import { type SceneProcedureStep } from "@/labs/experiments/types";
import { r2rLadder } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Power the trainer and connect the voltmeter",
  body: "Connect VCC to the top rail, GND to the ground rail, and RST to ground. Connect the voltmeter's red probe to the ladder output (column 21, row d) and its black probe to the ground rail at column 22.",
  show: ["bb", "mcu", "r1", "r2", "r3", "r4", "w_vcc", "w_gnd", "w_rst", "w_p10", "w_j1", "w_p11", "w_j2", "w_p12", "w_j3", "w_p13", "vm"],
  highlight: "vm",
  schematic: r2rLadder()[4],
};
