import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Connect the supply and the collector load.",
  body: "Connect the +5 V supply to the red rail and its ground to the blue rail. Insert the 330 Ω collector resistor Rc in row c from column 5 to column 8 and connect column 5 to the +5 V rail. Insert the red LED in row d with its anode (longer lead) in column 13 and its cathode in column 14, the collector column. Join the end of Rc to the LED anode. The load current when the transistor is fully on is $I_{C(sat)} \\approx \\frac{5 - 1.9 - 0.1}{330} \\approx 9.1$ mA.",
  show: ["bb", "q1", "w_e_gnd", "psu", "rc", "led", "w_vcc_rc", "w_rc_led"],
  highlight: "led",
  readings: { psu: "5.00 V" },
  ledBrightness: { led: 0 },
};
