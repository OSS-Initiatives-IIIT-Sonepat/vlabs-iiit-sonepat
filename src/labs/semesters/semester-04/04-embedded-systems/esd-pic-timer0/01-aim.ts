import { type TheorySection } from "@/labs/lab-content.types";

export const aim: TheorySection = {
  id: "aim",
  type: "text",
  title: "Aim",
  paragraphs: [
    "To use Timer0 on a PIC18F4550 as a hardware timer with an overflow interrupt, so that the LED toggles every 0.5 s while the CPU does other work.",
  ],
};
