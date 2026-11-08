import { type SceneProcedureStep } from "@/labs/experiments/types";

import { step as s01 } from "./01-the-room";
import { step as s02 } from "./02-fit-nic";
import { step as s03 } from "./03-driver";
import { step as s04 } from "./04-cable";
import { step as s05 } from "./05-address";
import { step as s06 } from "./06-ping-wired";
import { step as s07 } from "./07-share";
import { step as s08 } from "./08-copy-wired";
import { step as s09 } from "./09-wifi-router";
import { step as s10 } from "./10-join";
import { step as s11 } from "./11-copy-wireless";

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
];
