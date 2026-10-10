import { type LabSection } from "@/labs/lab-content.types";

export const conclusion: LabSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "The center-tapped full-wave rectifier was successfully constructed and analyzed. By utilizing a center-tapped step-down transformer and two diodes conducting alternately on opposite half-cycles, continuous unidirectional load current is maintained throughout both half-cycles.",
    "The measured average DC output voltage ($V_{dc} \\approx 10.30\\text{ V}$) is approximately twice that of a half-wave rectifier, with a ripple frequency of $100\\text{ Hz}$ ($2f_{in}$) and an unfiltered ripple factor of $0.485$, closely agreeing with theoretical predictions.",
    "Connecting the $100\\ \\mu\\text{F}$ electrolytic filter capacitor across the load significantly suppressed ripple voltage down to $\\approx 0.029$ and boosted the DC voltage to $15.80\\text{ V}$, demonstrating an efficient DC power supply stage.",
  ],
};
