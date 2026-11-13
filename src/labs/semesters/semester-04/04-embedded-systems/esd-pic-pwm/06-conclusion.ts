import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "PWM turns a digital pin into an adjustable average voltage without any analog hardware. The CCP module makes the waveform in hardware, so the CPU only sets the duty cycle.",
  ],
};
