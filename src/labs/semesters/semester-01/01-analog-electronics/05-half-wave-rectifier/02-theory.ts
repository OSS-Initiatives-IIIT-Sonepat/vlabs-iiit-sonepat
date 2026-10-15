import { type LabSection } from "@/labs/lab-content.types";
import { step09 as circuitDiagram } from "@/labs/schematics/half-wave-rectifier-schematics";

export const theory: LabSection = {
  id: "theory",
  type: "text",
  title: "Theory",
  circuitDiagram,
  audioPath:
    "/semesters/semester-01/01-analog-electronics/half-wave-rectifier/02-theory.mp3",
  paragraphs: [
    "A half-wave rectifier converts an alternating current (AC) input into a pulsating direct current (DC) output by allowing current to flow through the load during only one half-cycle of the input waveform.",
    "The diode D1 is forward biased during the positive half-cycle of the AC input, conducting and dropping roughly $0.7\\,V$ across itself (for a silicon diode). During the negative half-cycle, D1 is reverse biased and blocks conduction, so no current flows through the load $R_L$.",
    "For a sinusoidal input with peak voltage $V_m$, the average (DC) output voltage across the load, ignoring the diode forward drop, is $V_{dc} = \\dfrac{V_m}{\\pi} \\approx 0.318\\,V_m$.",
    "The raw rectified output still contains a large AC ripple component, since current flows only for half of each cycle. Adding a filter capacitor $C_1$ in parallel with $R_L$ charges during conduction and discharges through $R_L$ when the diode is reverse biased, smoothing the output and raising the effective $V_{dc}$ closer to $V_m$.",
    "The ripple factor $r = \\dfrac{V_{r(rms)}}{V_{dc}}$ quantifies the residual AC content in the filtered output; a larger filter capacitance or load resistance reduces ripple by slowing the capacitor\u2019s discharge between conduction pulses.",
  ],
};
