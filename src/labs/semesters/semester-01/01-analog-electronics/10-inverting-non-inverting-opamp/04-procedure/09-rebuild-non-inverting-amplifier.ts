import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label:
    "Rebuild the circuit as the non-inverting amplifier (R1 = 10 kΩ, Rf = 100 kΩ).",
  body: "Reduce the function generator amplitude to zero and switch off the supply. Remove Rin and the ground connection of pin 3. Keep +12 V at pin 7 and −12 V at pin 4. Connect the input point Vin directly to pin 3. Connect R1 = 10 kΩ between pin 2 and ground. Fit Rf = 100 kΩ between pin 6 and pin 2. Leave pins 1, 5 and 8 unconnected. The function generator stays connected to Vin, CH1 of the CRO stays at Vin (now pin 3) and CH2 stays at the output at pin 6.",
  show: [
    "bb",
    "opamp1",
    "psu",
    "fg",
    "r_1",
    "r_f",
    "scope",
    "vm",
    "w_fg_in",
    "w_pin6_rf",
    "w_rf_pin2",
    "w_pin7_vcc",
    "w_pin4_gnd",
    "w_out_scope",
    "w_fg_noninv",
    "w_r1_pin2",
    "w_r1_gnd",
  ],
};
