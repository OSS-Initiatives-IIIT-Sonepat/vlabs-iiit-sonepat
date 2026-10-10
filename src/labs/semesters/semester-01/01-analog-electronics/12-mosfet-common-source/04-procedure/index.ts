import { type SceneProcedureStep } from "@/labs/experiments/types";

import { step as s01 } from "./01-breadboard-and-supplies";
import { step as s02 } from "./02-place-mosfet";
import { step as s03 } from "./03-ground-connections";
import { step as s04 } from "./04-drain-resistor-ammeter";
import { step as s05 } from "./05-gate-bias";
import { step as s06 } from "./06-connect-voltmeters";
import { step as s07 } from "./07-dc-operating-point";
import { step as s08 } from "./08-vary-gate-voltage";
import { step as s09 } from "./09-apply-input-signal";
import { step as s10 } from "./10-observe-output";

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
