import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "A memory map uses the high address bits as a chip select. The low bits are the address inside the selected chip.",
    "Only one chip may drive a shared data bus. The decoder's active-low output is the chip-select.",
  ],
};
