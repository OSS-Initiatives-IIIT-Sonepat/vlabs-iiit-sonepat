import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Identify the inductor and build the series RLC circuit.",
  body: "The 10 mH inductor is a coil of enamelled copper wire wound on a ferrite core; it has no polarity. Insert it in row c from column 5 to column 8. Insert the 0.1 µF capacitor in row a at columns 8 and 9, and the 100 Ω resistor in row c from column 9 to column 12. L, C and R are now in series: column 8 joins L to C and column 9 joins C to R. Connect the free end of R (column 12) to the ground rail. The resonant frequency is $f_0 = \\frac{1}{2\\pi\\sqrt{LC}} \\approx 5.03$ kHz.",
  show: ["bb", "l1", "c1", "r1", "w_r_gnd"],
  highlight: "l1",
};
