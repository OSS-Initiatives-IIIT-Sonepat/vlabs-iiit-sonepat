import { type SceneProcedureStep } from "@/labs/experiments/types";
import { buttonOnPin } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Add the LED on RD0",
  body: "Place the 330 ohm resistor across row c, from column 15 to column 18, and the LED with its anode in column 18 and cathode in column 19. Connect an orange jumper from RD0 to column 15, row a, and a black jumper from the cathode to the ground rail.",
  show: [
    "bb",
    "pic",
    "btn1",
    "r_pd",
    "r1",
    "led1",
    "w_rb0",
    "w_btn_vdd",
    "w_pd_gnd",
    "w_vdd",
    "w_vss",
    "w_rd0",
    "w_led_gnd",
  ],
  highlight: "led1",
  schematic: buttonOnPin("PIC18 RB0", "down")[3],
};
