import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "1. The whole board",
  body: "This is an Arduino Uno R3. It is a blue circuit board with a black microcontroller chip, two rows of black sockets around the edges and a few small parts. Every part has one job. We will go around it in order: power, the brain, timing, control, lights, then the pins.",
  show: ["bb", "uno"],
  highlight: "uno",
};
