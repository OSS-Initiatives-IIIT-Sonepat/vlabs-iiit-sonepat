import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Inspect and place the breadboard.",
  body: "Set up the breadboard and connect the +5 V supply to the top rails; link the top and bottom +5 V rails. The 74HC139 is a 16-pin DIP holding two 2-to-4 decoders; we use the first. Its outputs are **active-LOW**: the selected output goes to 0 V and the others stay at +5 V. So each LED is wired from +5 V through its resistor **into** the output pin — the LED lights only when that pin goes LOW and sinks the current.",
  show: ["bb"],
};
