import { type TheorySection } from "@/labs/lab-content.types";
import { theoryDiagram as circuitDiagram } from "@/labs/schematics/semester-01/03-FEE/parallel-rlc-resonance";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "In a parallel combination of R, L and C the same voltage appears across every branch, and the line current is the sum of the three branch currents. The inductor current lags the voltage by 90° and the capacitor current leads by 90°, so those two currents oppose each other.",
    "The admittance is $Y = 1/R + j(\\omega C - 1/\\omega L)$. At one frequency the susceptance is zero: $\\omega_0 C = 1/\\omega_0 L$, so $f_0 = 1/(2\\pi\\sqrt{LC})$. The line current is then a minimum, $I = V/R$, and it is in phase with the voltage. This is parallel resonance, also called current magnification, because the circulating branch current is $Q$ times the line current.",
    "The quality factor is $Q = R\\sqrt{C/L} = R / (2\\pi f_0 L)$. The half-power frequencies are where the line current rises to $\\sqrt{2}$ times its minimum. Their difference is the bandwidth $BW = f_2 - f_1 = 1/(2\\pi RC)$, and $Q = f_0 / BW$. Changing R changes Q and the bandwidth but not $f_0$. Changing C changes $f_0$ and Q.",
    "Values used here: $L = 10\\,\\mathrm{mH}$, $C = 0.1\\,\\mu\\mathrm{F}$, $R = 1\\,\\mathrm{k}\\Omega$, $V = 2\\,\\mathrm{V}$ peak-to-peak. Then $f_0 = 5.03\\,\\mathrm{kHz}$, $Q = 3.16$, $BW = 1.59\\,\\mathrm{kHz}$, so $f_1 = 4.30\\,\\mathrm{kHz}$ and $f_2 = 5.89\\,\\mathrm{kHz}$. The line current dips to $2.00\\,\\mathrm{mA}$ and the capacitor current is $6.32\\,\\mathrm{mA}$. With $R = 470\\,\\Omega$, $Q$ falls to $1.49$ and the dip rises to $4.26\\,\\mathrm{mA}$. With $C = 0.22\\,\\mu\\mathrm{F}$, $f_0$ falls to $3.39\\,\\mathrm{kHz}$ and $Q$ rises to $4.69$.",
  ],
  circuitDiagram,
};
