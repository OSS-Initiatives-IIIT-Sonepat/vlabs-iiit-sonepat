import { type SceneProcedureStep } from "@/labs/experiments/types";

import { BB, icId } from "../gates";

export const step: SceneProcedureStep = {
  label: "Mount the NOT, AND and OR ICs.",
  body: "Insert the **74HC04** (NOT), **74HC08** (AND) and **74HC32** (OR) so that each straddles the centre gap of the breadboard on row $e$. Pin 1 of each IC faces the left. Power each IC: a red jumper from the bottom +5 V rail to pin 14 (VCC) and a black jumper from pin 7 (GND) to the top GND rail. Only one gate of each package is used.",
  show: [BB, icId("not"), icId("and"), icId("or")],
  highlight: icId("not"),
};
