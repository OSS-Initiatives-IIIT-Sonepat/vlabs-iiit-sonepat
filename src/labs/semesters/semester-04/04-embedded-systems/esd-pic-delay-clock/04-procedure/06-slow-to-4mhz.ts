import { type SceneProcedureStep } from "@/labs/experiments/types";
import { ledFromPin } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Change the clock to 4 MHz",
  body: "Change only the first line of main() to OSCCON = 0x60; (4 MHz) and keep the delays and _XTAL_FREQ unchanged. Program it again. The same __delay_ms(500) now lasts about twice as long in real time, so one blink takes about 2.0 s. The program did not change; the clock did.",
  show: ["bb", "pic", "r1", "led1", "w_rd0", "w_vdd", "w_vss", "w_led_gnd"],
  highlight: "led1",
  ledBrightness: { led1: 0 },
  readings: { "Blink period": "about 2.0 s at 4 MHz" },
  schematic: ledFromPin("PIC18 RD0", "330 ohm")[3],
};
