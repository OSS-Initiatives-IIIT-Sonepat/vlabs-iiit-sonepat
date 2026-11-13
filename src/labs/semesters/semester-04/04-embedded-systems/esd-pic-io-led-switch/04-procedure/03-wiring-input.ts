import { type SceneProcedureStep } from "@/labs/experiments/types";
import { buttonOnPin } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Wire the input and the supply",
  body: "Run a blue jumper from RB0 to column 9, row a. Run a red jumper from the button's right leg (column 11) to the +5 V rail. Run a black jumper from the pull-down's far leg (column 12) to the ground rail. Connect VDD to the top rail (red) and VSS to the ground rail (black).",
  show: [
    "bb",
    "pic",
    "btn1",
    "r_pd",
    "w_rb0",
    "w_btn_vdd",
    "w_pd_gnd",
    "w_vdd",
    "w_vss",
  ],
  highlight: "w_rb0",
  schematic: buttonOnPin("PIC18 RB0", "down")[3],
};
