import { type SceneProcedureStep } from "@/labs/experiments/types";

import { BB, PSU_ID, RAIL_LINK_ID } from "../gates";

export const step: SceneProcedureStep = {
  label: "Place the long breadboard and connect the 5 V supply.",
  body: "Place the 60-column breadboard on the bench. Seven ICs and seven LED indicators will be mounted on it, so the long board is used. Connect the DC power supply to the **top red rail** (+5 V) and the **top blue rail** (GND), then link the top +5 V rail to the **bottom +5 V rail** with a purple wire at the far right — the ICs take their supply from the bottom rail, since their VCC pins sit in the bottom half of the board. Keep the top rail pair free.",
  show: [BB, PSU_ID, RAIL_LINK_ID],
  highlight: PSU_ID,
};
