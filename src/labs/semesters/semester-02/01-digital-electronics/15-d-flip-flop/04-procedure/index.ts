import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step as s01 } from "./01-breadboard-and-supply";
import { step as s02 } from "./02-place-ic";
import { step as s03 } from "./03-async-inputs";
import { step as s04 } from "./04-d-and-clk";
import { step as s05 } from "./05-leds";
import { step as s06 } from "./06-output-wires";
import { step as s07 } from "./07-d-high-clk-low";
import { step as s08 } from "./08-rising-edge-set";
import { step as s09 } from "./09-falling-edge";
import { step as s10 } from "./10-d-low-no-clock";
import { step as s11 } from "./11-rising-edge-reset";
import { step as s12 } from "./12-d-changes-clk-high";
import { step as s13 } from "./13-falling-edge-again";
import { step as s14 } from "./14-rising-edge-set-again";

export const procedureSteps: SceneProcedureStep[] = [
  s01,
  s02,
  s03,
  s04,
  s05,
  s06,
  s07,
  s08,
  s09,
  s10,
  s11,
  s12,
  s13,
  s14,
];
