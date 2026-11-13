import { type SceneProcedureStep } from "@/labs/experiments/types";
import {
  SUPPLY,
  SYSTEM_PIC,
} from "@/labs/semesters/semester-04/04-embedded-systems/chip-bench";
import { DIVIDER, LED } from "../components";
import { adcPicDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Change the divider",
  body: "Replace the bottom resistor R3 with a 20 kΩ one. The middle point rises to 5 × 20 / 30 = 3.33 V and the reading becomes about 682. The LED now stays on. Replace it with 5 kΩ and the reading falls to about 341 and the LED goes off.",
  show: [...SUPPLY, ...SYSTEM_PIC, ...DIVIDER, ...LED],
  highlight: "r_bot",
  supplyVoltage: 5,
  ledBrightness: { led1: 1 },
  readings: { "ADC result": "682 (about 3.3 V)" },
  schematic: adcPicDiagrams[4],
};
