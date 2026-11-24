import { type SceneProcedureStep } from "@/labs/experiments/types";
import {
  SUPPLY,
  SYSTEM_8051,
  markPin,
} from "@/labs/semesters/semester-04/04-embedded-systems/chip-bench";
import { intro8051Diagrams } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "6. Power-on reset on RST",
  body: "RST (pin 9) is active HIGH: while it is HIGH for at least two machine cycles, the chip resets and starts the program from address 0000h. A 10 µF capacitor from +5 V to RST and a 10 kΩ resistor from RST to ground do this by themselves. At switch-on the empty capacitor holds RST at 5 V; as it charges through the resistor, RST falls to 0 V in about 0.1 s and the program starts. Wire RST to column 27 and build the two parts there.",
  show: [...SUPPLY, ...SYSTEM_8051],
  highlight: "c_rst",
  markers: [markPin("at89s52", "RST")],
  supplyVoltage: 5,
  schematic: intro8051Diagrams[3],
};
