import { type ExperimentDefinition } from "@/labs/experiments/types";
import { rcFiltersTheoryDiagram } from "@/labs/schematics/semester-01/01-analog-electronics/14-rc-filters";

type Section = ExperimentDefinition["sections"][number];

export const theory: Section = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A filter is a circuit that passes signals in one range of frequencies and attenuates signals outside it. The simplest filters use one resistor and one capacitor. The reactance of a capacitor is XC = 1 / (2πfC): it is very large at low frequencies (the capacitor behaves like an open circuit) and very small at high frequencies (it behaves like a short circuit). An RC network is therefore a frequency-dependent voltage divider.",
    "Low-pass filter. The resistor is in series with the signal and the output is taken across the capacitor. At low frequencies XC ≫ R, so almost the whole input appears across C and Vo ≈ Vin. At high frequencies XC ≪ R and the output falls. The transfer function is H(f) = 1 / (1 + j f/fc), so the gain is |H| = 1 / √(1 + (f/fc)²) and the phase shift is φ = −tan⁻¹(f/fc). The output lags the input.",
    "High-pass filter. The positions are exchanged: the capacitor is in series and the output is taken across the resistor. At low frequencies the capacitor blocks the signal and Vo ≈ 0; at high frequencies it passes the signal and Vo ≈ Vin. The transfer function is H(f) = (j f/fc) / (1 + j f/fc), so |H| = (f/fc) / √(1 + (f/fc)²) and φ = +90° − tan⁻¹(f/fc). The output leads the input.",
    "Cut-off frequency. Both filters have the same cut-off (corner, or −3 dB) frequency, at which XC = R: fc = 1 / (2πRC). At fc the gain is 1/√2 = 0.707, which is −3 dB, the output power is half the input power and the phase shift is −45° for the low-pass and +45° for the high-pass filter. Far beyond the cut-off the gain changes by 20 dB per decade (6 dB per octave), which is the slope of every first-order filter.",
    "Gain in decibels. The gain is plotted as 20 log₁₀(Vo / Vin) dB against frequency on a logarithmic axis (a Bode plot). The low-pass response is flat at 0 dB up to about fc/10 and then falls at −20 dB/decade; the high-pass response rises at +20 dB/decade up to fc and then stays flat at 0 dB.",
    "Values used in this experiment. R = 1 kΩ and C = 0.1 µF give fc = 1 / (2π × 1000 × 0.1 × 10⁻⁶) ≈ 1591 Hz. A sine wave of 2 V peak-to-peak is applied and the frequency is varied from 100 Hz to 20 kHz. The generator output impedance (typically 50 Ω) is small compared with R and can be neglected.",
  ],
  circuitDiagram: rcFiltersTheoryDiagram,
};
