import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "The PIC18F4550 ran the blink program with only a supply, decoupling capacitors and a pull-up on MCLR, because its clock comes from the internal oscillator. TRIS sets a pin's direction and LAT drives it. The PIC18 experiments that follow start from this circuit.",
  ],
};
