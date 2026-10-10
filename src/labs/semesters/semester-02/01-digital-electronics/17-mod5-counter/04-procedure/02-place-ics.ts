import { type SceneProcedureStep } from "@/labs/experiments/types";
import { S2 } from "./show-sets";

export const step: SceneProcedureStep = {
  label: "Insert the ICs.",
  body: "Insert two 74HC74 dual D flip-flops (FF0 and FF1 in the first, FF2 in the second), then the 74HC86 XOR, 74HC08 AND, 74HC32 OR and 74HC00 NAND ICs left to right. Each IC straddles the centre gap and the notch faces the left. Connect pin 14 to VCC and pin 7 to GND on every IC.",
  show: S2,
  highlight: "dff_a",
  supplyVoltage: 5.0,
};
