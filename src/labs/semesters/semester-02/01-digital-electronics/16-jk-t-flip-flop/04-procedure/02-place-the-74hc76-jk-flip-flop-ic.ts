import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Place the 74HC76 JK flip-flop IC.",
  body: "Insert 74HC76 DIP-16 straddling the centre gap. Pin 1 is CLK₁. Power it carefully: on the 7476 family **VCC is pin 5 and GND is pin 13**, not the usual corner pins. Flip-flop 1 uses pin 1 (CLK), 2 ($\\overline{PRE}$), 3 ($\\overline{CLR}$), 4 (J), 16 (K), 15 (Q) and 14 ($\\overline{Q}$). The 74HC76 is falling-edge triggered — transitions occur on HIGH→LOW clock edges.",
  show: [
    "bb",
    "psu",
    "w_rail_link",
    "w_gnd_link",
    "jk1",
    "w_vcc_jk1",
    "w_gnd_jk1",
  ],
  highlight: "psu",
};
