import { type SceneProcedureStep } from "@/labs/experiments/types";
import {
  SUPPLY,
  SYSTEM_8051,
} from "@/labs/semesters/semester-04/04-embedded-systems/chip-bench";
import { LADDER } from "../components";
import { dac8051Diagrams } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Build the R-2R ladder",
  body: "The ladder's spine runs along the top bank. The nodes are columns 40 (N0), 43 (N1), 46 (N2) and 49 (N3). Place the three 10 kΩ resistors between them, alternating rows e, d and e so no hole holds two legs. Place a 20 kΩ resistor from column 37 to N0 in row c and ground column 37: this is the ladder's end termination. Then run a white jumper from each node to the bottom bank (columns 35, 41, 47 and 53) and place a 20 kΩ resistor from each of those columns three columns to the right, in row h.",
  show: [...SUPPLY, ...SYSTEM_8051, ...LADDER],
  highlight: "r_l1",
  supplyVoltage: 5,
  schematic: dac8051Diagrams[4],
};
