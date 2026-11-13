import { type SceneProcedureStep } from "@/labs/experiments/types";
import { ledFromPin } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Watch the count",
  body: "The LEDs show the count in binary, one step per half second. Count 5 is LED0 and LED2 on (0101). Count 15 is all four on, and the next step returns to 0. Change STOP to 9 and the count restarts after 9. Change the delay to slow or speed up the count.",
  show: [
    "bb",
    "mcu",
    "w_vcc",
    "w_gnd",
    "w_rst",
    "r0",
    "led0",
    "r1",
    "led1",
    "r2",
    "led2",
    "r3",
    "led3",
    "w_p10",
    "w_p11",
    "w_p12",
    "w_p13",
    "w_k0",
    "w_k1",
    "w_k2",
    "w_k3",
  ],
  highlight: "led2",
  readings: { "P1 (binary)": "0101 = 5" },
  schematic: ledFromPin("8051 P1.0", "330 ohm")[3],
};
