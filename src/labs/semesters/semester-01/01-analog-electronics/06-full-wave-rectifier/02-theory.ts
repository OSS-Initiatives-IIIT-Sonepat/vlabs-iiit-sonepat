import { type LabSection } from "@/labs/lab-content.types";

export const theory: LabSection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A full-wave rectifier converts both positive and negative half-cycles of the AC input voltage into unidirectional direct current (DC) pulses across the load.",
    "In a center-tapped full-wave rectifier, a step-down transformer with a center-tapped secondary winding is used. The center tap (CT) is grounded, providing a common 0 V reference node, while the two outer secondary terminals (S1 and S2) develop AC voltages that are equal in magnitude but $180^\\circ$ out of phase.",
    "During the positive half-cycle of the AC input, terminal S1 is positive with respect to the center tap while S2 is negative. Diode D1 becomes forward biased and conducts current through the load resistor $R_L$, while diode D2 is reverse biased and remains OFF.",
    "During the negative half-cycle, the polarities invert: terminal S2 becomes positive with respect to the center tap while S1 is negative. Diode D2 becomes forward biased and conducts through $R_L$ in the same direction, while D1 is reverse biased and OFF. Thus, load current flows unidirectionally during both half-cycles.",
    "The theoretical average (DC) output voltage across the load without a filter is $V_{dc} = \\dfrac{2(V_m - V_D)}{\\pi} \\approx 0.636\\,V_m$, which is double that of a half-wave rectifier. The fundamental ripple frequency is twice the supply frequency ($2f = 100\\text{ Hz}$ for a 50 Hz line).",
    "Adding an electrolytic filter capacitor $C_1$ in parallel with $R_L$ charges to near peak voltage $V_m$ during conduction peaks and slowly discharges into $R_L$ between peaks, dramatically reducing the ripple factor to $r = \\dfrac{1}{4\\sqrt{3} f C_1 R_L}$.",
  ],
};
