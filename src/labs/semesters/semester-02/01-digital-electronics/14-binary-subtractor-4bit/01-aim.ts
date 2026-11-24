import { type LabSection } from "@/labs/lab-content.types";

export const aim: LabSection = {
  id: "aim",
  type: "text",
  title: "Aim",
  paragraphs: [
    "To design and verify a 4-bit binary subtractor that computes $A - B$ for two 4-bit unsigned numbers $A = A_3A_2A_1A_0$ and $B = B_3B_2B_1B_0$, using the 2's complement method with a 4-bit parallel adder (74HC283) and XOR gates (74HC86) used as inverters.",
    "To interpret the final carry $C_4$ as a no-borrow flag and decode a negative result when a borrow occurs.",
  ],
};
