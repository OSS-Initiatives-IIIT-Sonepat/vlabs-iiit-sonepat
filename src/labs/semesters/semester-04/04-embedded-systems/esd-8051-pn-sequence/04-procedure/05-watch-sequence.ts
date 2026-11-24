import { type SceneProcedureStep } from "@/labs/experiments/types";
import {
  SUPPLY,
  SYSTEM_8051,
} from "@/labs/semesters/semester-04/04-embedded-systems/chip-bench";
import { LEDS } from "../components";
import { leds8051Diagrams } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Watch the sequence repeat",
  body: "Watch the four LEDs. The register starts at 0x01 and the pattern changes every step. Count the steps: the full 8-bit sequence repeats only after 255 steps, and the register never reaches 0x00. Shorten the delay to see more steps quickly.",
  show: [...SUPPLY, ...SYSTEM_8051, ...LEDS],
  highlight: "led1",
  supplyVoltage: 5,
  ledBrightness: { led0: 0, led1: 1, led2: 0, led3: 1 },
  readings: { Register: "0x8A after 7 steps", Period: "255 steps" },
  schematic: leds8051Diagrams[4],
};
