import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "The accumulator logic is the nine transfers that change AC, and nothing else. An adder and logic circuit forms the next 16-bit word from DR and INPR. AC loads it, increments it, or clears it.",
    "AND gates produce AND, ADD, DR, INPR, and CMA. Their outputs, together with the shift controls, are ORed into LD. B5 drives INR. B11 drives CLR. The clock writes the register.",
  ],
};
