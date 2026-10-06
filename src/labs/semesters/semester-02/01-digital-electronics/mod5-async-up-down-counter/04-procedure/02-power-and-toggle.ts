import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Power the ICs and set toggle mode.",
  body: "Mount IC1 and IC2 and connect $V_{CC}$ = +5 V (pin 5) and GND (pin 13) on each 74HC76. Tie **J and K of all three flip-flops to +5 V** so that every stage toggles. Tie PRE of all three flip-flops to +5 V (inactive). Tie CLR to +5 V for now, and connect it to the reset logic later.",
  show: [],
};
