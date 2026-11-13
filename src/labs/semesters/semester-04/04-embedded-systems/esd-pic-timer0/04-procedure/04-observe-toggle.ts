import { type SceneProcedureStep } from "@/labs/experiments/types";
import { timerChain } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Watch the toggle",
  body: "Each overflow toggles the LED, so it switches state every 0.5 s and blinks with a period of 1.0 s. Add a second task to the main loop, for example a counter, to show that the blink does not stop while the CPU is busy.",
  show: ["bb", "pic", "r1", "led1", "w_vdd", "w_rd0", "w_vss", "w_led_gnd"],
  highlight: "led",
  ledBrightness: { led1: 0 },
  readings: { "Blink period": "1.0 s" },
  schematic: timerChain()[4],
};
