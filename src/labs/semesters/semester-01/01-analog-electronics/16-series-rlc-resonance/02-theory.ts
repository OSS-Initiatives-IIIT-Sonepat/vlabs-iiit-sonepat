import { type ExperimentDefinition } from "@/labs/experiments/types";
import { seriesRlcTheoryDiagram } from "@/labs/schematics/semester-01/01-analog-electronics/16-series-rlc-resonance";

type Section = ExperimentDefinition["sections"][number];

export const theory: Section = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "An inductor opposes changes in current. Its reactance XL = 2πfL rises in proportion to frequency, and the voltage across it leads the current by 90°. A capacitor has reactance XC = 1 / (2πfC), which falls as frequency rises, and its voltage lags the current by 90°. In a series circuit the two reactances therefore oppose each other.",
    "Impedance. For R, L and C in series the impedance is Z = R + j(XL − XC), with magnitude |Z| = √(R² + (XL − XC)²) and phase angle θ = tan⁻¹((XL − XC) / R). The current is I = Vin / |Z|. Below resonance XC > XL, the circuit is capacitive and the current leads the applied voltage. Above resonance XL > XC, the circuit is inductive and the current lags.",
    "Resonance. At one frequency the two reactances are equal and cancel: 2πf0L = 1 / (2πf0C), which gives f0 = 1 / (2π√(LC)). At f0 the impedance is at its minimum, Z = R, the current is at its maximum, I = Vin / R, and the current is in phase with the applied voltage. Because the voltage across R is VR = I × R, a CRO across R shows a curve with the same shape as the current, peaking at f0.",
    "Bandwidth and Q. The half-power frequencies f1 and f2 are where the current falls to 1/√2 = 0.707 of its maximum (power falls to half). At these points |XL − XC| = R and the phase angle is ±45°. The bandwidth is BW = f2 − f1 = R / (2πL), and f0 = √(f1 f2). The quality factor is Q = f0 / BW = (1/R) √(L/C) = XL / R at resonance. A high Q gives a sharp, narrow peak.",
    "Voltage magnification. At resonance the voltages across L and C are equal and opposite, each Q times the input: VL = VC = Q × Vin. They cancel each other, so the whole input appears across R. This is why a series resonant circuit is also called a voltage magnification circuit.",
    "Values used in this experiment. L = 10 mH, C = 0.1 µF, R = 100 Ω. Then f0 = 1 / (2π√(10⁻² × 10⁻⁷)) ≈ 5033 Hz, Q = (1/100)√(0.01 / 10⁻⁷) ≈ 3.16 and BW = f0 / Q ≈ 1592 Hz, so f1 ≈ 4.30 kHz and f2 ≈ 5.89 kHz. With Vin = 2 V peak-to-peak, VR reaches 2 V peak-to-peak at resonance and VC reaches about 6.3 V peak-to-peak. The winding resistance of a real inductor (a few tens of ohms) adds to R and lowers the peak and Q slightly.",
  ],
  circuitDiagram: seriesRlcTheoryDiagram,
};
