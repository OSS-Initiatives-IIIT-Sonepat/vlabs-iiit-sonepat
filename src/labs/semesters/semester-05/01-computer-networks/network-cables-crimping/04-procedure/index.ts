import { type SceneProcedureStep } from "@/labs/experiments/types";

import { step as s01 } from "./01-the-bench";
import { step as s02 } from "./02-four-cables";
import { step as s03 } from "./03-inside-utp";
import { step as s04 } from "./04-tools";
import { step as s05 } from "./05-strip";
import { step as s06 } from "./06-order-t568b";
import { step as s07 } from "./07-trim-insert";
import { step as s08 } from "./08-crimp";
import { step as s09 } from "./09-end-b-t568b";
import { step as s10 } from "./10-test-straight";
import { step as s11 } from "./11-end-b-t568a";
import { step as s12 } from "./12-test-cross";
import { step as s13 } from "./13-patch-corner";

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
];
