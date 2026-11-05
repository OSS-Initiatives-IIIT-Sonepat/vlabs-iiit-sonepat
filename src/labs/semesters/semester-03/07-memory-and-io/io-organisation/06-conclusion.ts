import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "A strobe latches the input and raises a flag. Wired to the CPU, that flag is an interrupt.",
    "Handshake, serial start bits, a daisy chain, DMA, and an I/O processor are the other ways a device and a CPU agree on a transfer.",
  ],
};
