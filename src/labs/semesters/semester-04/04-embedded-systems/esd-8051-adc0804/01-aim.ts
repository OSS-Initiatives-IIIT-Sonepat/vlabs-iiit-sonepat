import { type TheorySection } from "@/labs/lab-content.types";

export const aim: TheorySection = {
  id: "aim",
  type: "text",
  title: "Aim",
  paragraphs: [
    "To interface an ADC0804 analog-to-digital converter with the 8051, start conversions in software, read the 8-bit result from P1, and check it against a known input voltage.",
  ],
};
