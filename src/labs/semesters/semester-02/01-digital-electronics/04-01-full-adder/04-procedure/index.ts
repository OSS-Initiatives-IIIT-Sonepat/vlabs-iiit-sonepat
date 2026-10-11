import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step as s01 } from "./01-place-breadboard";
import { step as s02 } from "./02-place-xor-gates";
import { step as s03 } from "./03-place-and-or-gates";
import { step as s04 } from "./04-place-outputs";
import { step as s05 } from "./05-wire-inputs-a-b";
import { step as s06 } from "./06-wire-cin-second-stage";
import { step as s07 } from "./07-wire-carry-or";
import { step as s08 } from "./08-wire-outputs-ground";
import { step as s09 } from "./09-test-011";
import { step as s10 } from "./10-test-111";

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
];
