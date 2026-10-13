import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Wire the data input",
  body: "Connect the data input D (purple wire) to the enable pin 1G. On the 74HC139 the enable input acts as the data input of the demultiplexer.",
  show: ["bb", "psu", "dmx1", "w_s0", "w_s1", "w_d"],
  highlight: "w_d",
};
