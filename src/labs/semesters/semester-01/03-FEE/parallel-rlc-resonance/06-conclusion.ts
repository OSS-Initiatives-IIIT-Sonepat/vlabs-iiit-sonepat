import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "The line current of the parallel RLC circuit is a minimum at $f_0 = 1/(2\\pi\\sqrt{LC})$. With $L = 10\\,\\mathrm{mH}$ and $C = 0.1\\,\\mu\\mathrm{F}$ that frequency is $5.03\\,\\mathrm{kHz}$.",
    "Lowering R from $1\\,\\mathrm{k}\\Omega$ to $470\\,\\Omega$ leaves $f_0$ unchanged and lowers Q from 3.16 to 1.49. Raising C to $0.22\\,\\mu\\mathrm{F}$ moves $f_0$ to $3.39\\,\\mathrm{kHz}$ and raises Q to 4.69. At resonance the capacitor current is Q times the line current.",
  ],
};
