import { type SceneProcedureStep } from "@/labs/experiments/types";

import { step as s01 } from "./01-the-bench";
import { step as s02 } from "./02-application";
import { step as s03 } from "./03-presentation";
import { step as s04 } from "./04-session";
import { step as s05 } from "./05-transport";
import { step as s06 } from "./06-network";
import { step as s07 } from "./07-data-link";
import { step as s08 } from "./08-physical";
import { step as s09 } from "./09-switch";
import { step as s10 } from "./10-router-unwrap";
import { step as s11 } from "./11-router-forward";
import { step as s12 } from "./12-server-physical";
import { step as s13 } from "./13-server-data-link";
import { step as s14 } from "./14-server-network";
import { step as s15 } from "./15-server-transport";
import { step as s16 } from "./16-server-session";
import { step as s17 } from "./17-server-presentation";
import { step as s18 } from "./18-server-application";

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
  s15,
  s16,
  s17,
  s18,
];
