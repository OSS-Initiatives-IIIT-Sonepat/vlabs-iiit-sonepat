import { type SceneProcedureStep } from "@/labs/experiments/types";

import { step as s01 } from "./01-whole-board";
import { step as s02 } from "./02-usb-jack";
import { step as s03 } from "./03-power-jack-regulator";
import { step as s04 } from "./04-atmega-chip";
import { step as s05 } from "./05-crystal";
import { step as s06 } from "./06-reset";
import { step as s07 } from "./07-leds";
import { step as s08 } from "./08-digital-pins";
import { step as s09 } from "./09-analog-pins";
import { step as s10 } from "./10-power-pins";
import { step as s11 } from "./11-capacitors-and-icsp";
import { step as s12 } from "./12-how-a-sketch-runs";

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
