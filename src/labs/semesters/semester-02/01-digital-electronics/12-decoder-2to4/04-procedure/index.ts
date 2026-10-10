import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step as s01 } from "./01-place-breadboard";
import { step as s02 } from "./02-connect-supply";
import { step as s03 } from "./03-place-gates";
import { step as s04 } from "./04-place-leds";
import { step as s05 } from "./05-wire-first-level";
import { step as s06 } from "./06-wire-and-gates";
import { step as s07 } from "./07-wire-outputs";
import { step as s08 } from "./08-connect-ground";
import { step as s09 } from "./09-test-a1a0-00";
import { step as s10 } from "./10-test-a1a0-01";
import { step as s11 } from "./11-test-a1a0-10";
import { step as s12 } from "./12-test-a1a0-11";

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
];
