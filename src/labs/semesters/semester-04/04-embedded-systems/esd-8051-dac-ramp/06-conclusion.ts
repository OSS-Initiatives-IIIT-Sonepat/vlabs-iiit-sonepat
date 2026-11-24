import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "An R-2R ladder converts a 4-bit code to one of 16 voltages in equal steps of Vref/16. Software writes the code, so a ramp, a sine table or any waveform can be produced by changing the sequence of codes.",
  ],
};
