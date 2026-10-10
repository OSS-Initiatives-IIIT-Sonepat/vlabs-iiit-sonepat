import { type SceneProcedureStep } from "@/labs/experiments/types";
import { S4 } from "./show-sets";

export const step: SceneProcedureStep = {
  label: "Connect the clock source.",
  body: "Set the function generator to a $1\\,Hz$, 0–5 V square wave. Connect its output to the CLK tie-point and then to the clock input of FF0. Connect its ground to the GND rail.",
  show: S4,
  highlight: "fg1",
  supplyVoltage: 5.0,
};
