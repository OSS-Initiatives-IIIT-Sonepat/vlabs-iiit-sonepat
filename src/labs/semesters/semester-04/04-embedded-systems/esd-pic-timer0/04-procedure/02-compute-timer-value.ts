import { type SceneProcedureStep } from "@/labs/experiments/types";
import { timerChain } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Work out the timer value",
  body: "Clock 8 MHz gives Fosc/4 = 2 MHz. Prescale 1:64 gives 31 250 counts per second. For a 0.5 s overflow, the count needed is 15 625. Load TMR0 with 65 536 - 15 625 = 49 911 (0xC2F7) after every overflow.",
  show: ["bb", "pic", "r1", "led1", "w_vdd", "w_rd0", "w_vss", "w_led_gnd"],
  highlight: "tmr",
  schematic: timerChain()[2],
};
