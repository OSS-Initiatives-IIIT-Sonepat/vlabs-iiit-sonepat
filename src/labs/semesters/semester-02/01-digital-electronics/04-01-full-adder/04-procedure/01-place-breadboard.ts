import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Place the breadboard and connect the 5 V supply",
  body: "Place the long breadboard (60 columns) on the workbench. Connect the DC power supply to the +5 V and ground rails (top rails), then link the top +5 V rail to the bottom +5 V rail with a purple wire at the far right. The input tie-points A, B and Cin will be on the left (columns 1 to 3), the logic ICs in the middle and the output LEDs on the right.",
  show: ["bb", "psu", "w_rail_link"],
  highlight: "psu",
};
