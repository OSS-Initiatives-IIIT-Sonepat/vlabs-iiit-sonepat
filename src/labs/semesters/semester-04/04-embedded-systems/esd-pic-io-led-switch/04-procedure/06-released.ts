import { type SceneProcedureStep } from "@/labs/experiments/types";
import {
  SUPPLY,
  SYSTEM_PIC,
} from "@/labs/semesters/semester-04/04-embedded-systems/chip-bench";
import { INPUT, LED } from "../components";
import { ioPicDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Release the button",
  body: "Release the button. The pull-down pulls RB0 back to 0 V and the LED turns off. The LED state is the same as the button state, one read per loop.",
  show: [...SUPPLY, ...SYSTEM_PIC, ...INPUT, ...LED],
  highlight: "btn1",
  supplyVoltage: 5,
  ledBrightness: { led1: 0 },
  readings: { RB0: "LOW while released" },
  schematic: ioPicDiagrams[4],
};
