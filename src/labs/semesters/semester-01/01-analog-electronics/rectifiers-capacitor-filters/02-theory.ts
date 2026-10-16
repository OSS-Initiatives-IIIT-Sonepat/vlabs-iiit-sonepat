import { type TheorySection } from "@/labs/lab-content.types";
import { rectifiersCapacitorFiltersTheoryDiagram } from "@/labs/schematics/semester-01/01-analog-electronics/rectifiers-capacitor-filters";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A capacitor filter in parallel with the load reduces AC ripple. During conduction the diode charges the capacitor to near the peak voltage. Between conduction periods the capacitor discharges slowly through the load.",
    "Ripple voltage for a full-wave rectifier with filter: $V_r \\approx I_L / (2fC)$. Ripple factor: $\\gamma \\approx 1/(2\\sqrt{3} f R_L C)$. Larger $C$ or $R_L$ gives lower ripple.",
    "PIV across non-conducting diodes increases with a filter: for a half-wave rectifier $\\text{PIV} = 2V_m$; for a full-wave bridge $\\text{PIV} = V_m$ per diode regardless of filter.",
    "Larger $C$ improves ripple at the cost of higher peak diode current — the capacitor charges in short bursts. Practical designs balance ripple reduction against diode surge current ratings.",
  ],
  circuitDiagram: rectifiersCapacitorFiltersTheoryDiagram,
};
