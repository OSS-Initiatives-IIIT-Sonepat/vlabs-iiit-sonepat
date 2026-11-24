import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Place the 74HC279 SR latch IC.",
  body: "Insert the 74HC279 DIP-16 straddling the centre gap. Pin 1 (notch/dot at the left) is $\\bar{R}$ of latch 1; pin 2 is $\\bar{S}_1$, pin 3 is $\\bar{S}_2$ and pin 4 is $Q$. Latch 1 sets when either $\\bar{S}$ input is LOW, so tie the unused $\\bar{S}_2$ (pin 3) to +5 V. Power the IC: pin 16 to +5 V, pin 8 to GND.",
  show: [
    "bb",
    "psu",
    "w_rail_link",
    "sr1",
    "w_vcc_sr1",
    "w_gnd_sr1",
    "w_s2_vcc",
  ],
  highlight: "psu",
};
