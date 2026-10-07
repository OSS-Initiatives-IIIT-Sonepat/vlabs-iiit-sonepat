import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step as s01 } from "./01-place-board";
import { step as s02 } from "./02-jk-flip-flop";
import { step as s03 } from "./03-jk-inputs";
import { step as s04 } from "./04-jk-outputs";
import { step as s05 } from "./05-jk-ground";
import { step as s06 } from "./06-t-flip-flop";
import { step as s07 } from "./07-t-input";
import { step as s08 } from "./08-t-outputs";
import { step as s09 } from "./09-complete";

export const procedureSteps: SceneProcedureStep[] = [
  s01,
  s02,
  s03,
  s04,
  s05,
  s06,
  s07,
  s08,
  s09
];
