import { type SceneProcedureStep } from "@/labs/experiments/types";
import { S1 } from "./show-sets";

export const step: SceneProcedureStep = {
  label: "Place the long breadboard and connect the 5 V supply.",
  body: "Place the 60-column breadboard and set the DC supply to $5\\,V$. Connect its + terminal to the top VCC rail and its − terminal to the top GND rail. Keep the supply switched off until wiring is complete.",
  show: S1,
  supplyVoltage: 5.0,
};
