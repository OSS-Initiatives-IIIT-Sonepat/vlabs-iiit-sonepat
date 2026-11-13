import { type SceneProcedureStep } from "@/labs/experiments/types";
import { buttonOnPin } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Release the button",
  body: "Release the button. The pull-down pulls RB0 back to 0 V and the LED turns off. The LED state is the same as the button state, one read per loop.",
  show: ["bb", "pic", "btn1", "r_pd", "r1", "led1", "w_rb0", "w_btn_vdd", "w_pd_gnd", "w_vdd", "w_vss", "w_rd0", "w_led_gnd"],
  highlight: "btn1",
  ledBrightness: { led1: 0 },
  readings: { RB0: "LOW while released" },
  schematic: buttonOnPin("PIC18 RB0", "down")[3],
};
