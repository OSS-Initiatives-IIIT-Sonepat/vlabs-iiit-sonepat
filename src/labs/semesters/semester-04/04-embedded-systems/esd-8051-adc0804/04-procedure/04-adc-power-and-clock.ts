import { type SceneProcedureStep } from "@/labs/experiments/types";
import {
  SUPPLY,
  SYSTEM_8051,
} from "@/labs/semesters/semester-04/04-embedded-systems/chip-bench";
import { ADC, DIVIDER, ADC_POWER } from "../components";
import { adc8051Diagrams } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Power and clock the ADC",
  body: "Connect VCC (pin 20) to the top + rail, and CS, VIN−, AGND and DGND (pins 1, 7, 8 and 10) to the bottom − rail. Grounding CS keeps the chip selected. For the clock, take CLKR (pin 19) to column 49, place the 10 kΩ resistor in row b from column 49 to 52, the 150 pF capacitor in row c from column 52 to 53, and join column 52 to CLKIN (pin 4) and column 53 to ground. The ADC now clocks itself at about 640 kHz.",
  show: [...SUPPLY, ...ADC, ...SYSTEM_8051, ...DIVIDER, ...ADC_POWER],
  highlight: "r_clk",
  supplyVoltage: 5,
  schematic: adc8051Diagrams[3],
};
