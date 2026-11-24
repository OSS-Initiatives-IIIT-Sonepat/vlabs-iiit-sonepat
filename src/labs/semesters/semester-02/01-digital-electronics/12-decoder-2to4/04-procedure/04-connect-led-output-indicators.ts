import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Connect LED output indicators",
  body: "Connect each AND gate output through a 330 Ω resistor to the corresponding LED anode: Y0 (AND gate 1, pin 3) → LED0 (rightmost); Y1 (pin 6) → LED1; Y2 (pin 8) → LED2; Y3 (pin 11) → LED3 (leftmost). All LED cathodes connect to GND. At any input code, exactly one LED should illuminate. If more than one LED is ON, check for wiring errors on the NOT or AND gate connections.",
  show: [
    "bb",
    "psu",
    "w_rail_link",
    "not_a",
    "w_vcc_not_a",
    "w_gnd_not_a",
    "and0",
    "w_vcc_and0",
    "w_gnd_and0",
    "w_a_na",
    "w_b_nb",
    "w_na_and0",
    "w_nb_and0",
    "w_na_and1",
    "w_b_and1",
    "w_a_and2",
    "w_nb_and2",
    "w_a_and3",
    "w_b_and3",
  ],
  activeInputs: {
    A: 0,
    B: 0,
  },
};
