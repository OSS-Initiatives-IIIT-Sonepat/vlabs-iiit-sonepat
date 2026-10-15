import { type SceneProcedureStep } from "@/labs/experiments/types";

import { step as s01 } from "./01-breadboard-and-supply";
import { step as s02 } from "./02-ammeter-in-series";
import { step as s03 } from "./03-resistor";
import { step as s04 } from "./04-diode-forward";
import { step as s05 } from "./05-wire-forward-path";
import { step as s06 } from "./06-voltmeter-forward";
import { step as s07 } from "./07-forward-sweep";
import { step as s08 } from "./08-reverse-diode";
import { step as s09 } from "./09-reverse-wiring";
import { step as s10 } from "./10-reverse-sweep";

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
