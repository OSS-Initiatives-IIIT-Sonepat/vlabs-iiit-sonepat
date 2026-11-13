import { type SceneProcedureStep } from "@/labs/experiments/types";
import { dividerOnPin } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Change the divider",
  body: "Replace the bottom resistor with a 20 kohm one. The middle point rises to 5 x 20 / 30 = 3.33 V and the reading becomes about 682. The LED now stays on. Replace it with 5 kohm and the reading falls to about 341 and the LED goes off.",
  show: ["bb", "pic", "r_top", "r_bot", "w_vdd", "w_top", "w_ra0", "w_bot", "w_vss", "r1", "led1", "w_rd0", "w_led_gnd"],
  highlight: "r_bot",
  ledBrightness: { led1: 1 },
  readings: { "ADC result": "682 (about 3.3 V)" },
  schematic: dividerOnPin("PIC18 RA0 (AN0)")[3],
};
