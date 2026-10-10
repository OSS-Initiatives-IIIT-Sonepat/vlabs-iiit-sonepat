import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Identify the active components.",
  body: "Mount the green LED, the 1N4148 diode and the BC547 NPN transistor. For the LED and diode the longer lead or non-banded end is the anode. For the BC547 the pins are Base, Collector, Emitter.",
  show: ["bb", "psu", "r1", "r2", "c1", "led1", "d1", "q1"],
  highlight: "q1",
};
