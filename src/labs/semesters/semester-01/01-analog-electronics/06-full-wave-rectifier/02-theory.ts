import { type LabSection } from "@/labs/lab-content.types";
import { step08 as circuitDiagram } from "@/labs/schematics/semester-01/01-analog-electronics/06-full-wave-rectifier";

export const theory: LabSection = {
  id: "theory",
  circuitDiagram,
  type: "text",
  title: "Theory",
  paragraphs: [
    "A rectifier converts AC into DC. A full-wave bridge rectifier uses four diodes (D1–D4) arranged so that current is routed through the load in the same direction during both the positive and negative half-cycles of the input, unlike a half-wave rectifier which uses only one half-cycle.",
    "During the positive half-cycle, terminal a1 of the AC source is at a higher potential than a2. D1 and D4 are forward-biased, so current flows: a1 -> D1 -> load (top to bottom) -> D4 -> a2. During the negative half-cycle, a2 is higher than a1, so D2 and D3 conduct instead: a2 -> D2 -> load (top to bottom, same direction) -> D3 -> a1. Because the load always sees current flowing the same way, the output is a series of positive pulses at twice the input frequency.",
    "Average (DC) output voltage: Vdc ≈ (2 x Vm - 1.4 V) / pi, where Vm is the peak of the secondary AC voltage and 1.4 V represents the two diode drops in the conduction path.",
    "Ripple frequency: for a 50 Hz mains supply, the rectified output pulses at 100 Hz (2x the input frequency) — twice the ripple frequency of a half-wave rectifier, which makes it much easier to filter.",
    "A filter capacitor placed across the load charges up to near the peak voltage and then discharges slowly through the load resistor as each diode pair cuts off, smoothing the pulsating waveform into a much steadier DC level. A commonly used approximation for the resulting ripple factor is r ~= 1 / (4 x sqrt(3) x f x R x C), where f is the ripple frequency, R is the load resistance, and C is the filter capacitance.",
  ],
};
