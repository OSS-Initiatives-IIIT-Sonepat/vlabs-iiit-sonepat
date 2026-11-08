import { type SceneProcedureStep } from "@/labs/experiments/types";

import { step as s01 } from "./01-the-path";
import { step as s02 } from "./02-wan";
import { step as s03 } from "./03-dhcp";
import { step as s04 } from "./04-ipconfig";
import { step as s05 } from "./05-ping";
import { step as s06 } from "./06-nslookup";
import { step as s07 } from "./07-tracert";
import { step as s08 } from "./08-netstat";
import { step as s09 } from "./09-fault-cable";
import { step as s10 } from "./10-fault-dns";

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
