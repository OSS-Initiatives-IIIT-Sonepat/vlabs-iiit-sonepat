import { type LabSection } from "@/labs/lab-content.types";

export const theory: LabSection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A **logic gate** is a basic digital circuit that produces a single binary output (0 or 1) from one or more binary inputs. In positive logic, logic 1 is a high voltage (+5 V here) and logic 0 is a low voltage (0 V). The behaviour of a gate is fully described by its **truth table**.",
    "**NOT gate (inverter):** one input, output is the complement of the input. $Y = \\overline{A}$. IC: 74HC04.",
    "**AND gate:** output is 1 only when all inputs are 1. $Y = A \\cdot B$. IC: 74HC08.",
    "**OR gate:** output is 1 when at least one input is 1. $Y = A + B$. IC: 74HC32.",
    "**NAND gate:** AND followed by NOT. $Y = \\overline{A \\cdot B}$. IC: 74HC00. NAND is a *universal gate*: any Boolean function can be built from NAND gates alone.",
    "**NOR gate:** OR followed by NOT. $Y = \\overline{A + B}$. IC: 74HC02. NOR is also a universal gate.",
    "**EX-OR (XOR) gate:** output is 1 when the inputs are different. $Y = A \\oplus B = A\\overline{B} + \\overline{A}B$. IC: 74HC86.",
    "**EX-NOR (XNOR) gate:** output is 1 when the inputs are the same. $Y = \\overline{A \\oplus B} = AB + \\overline{A}\\,\\overline{B}$. IC: 74HC266. It is also called the equivalence gate.",
    "**Truth tables** (A, B → NOT A, AND, OR, NAND, NOR, XOR, XNOR): 00 → 1, 0, 0, 1, 1, 0, 1; 01 → 1, 0, 1, 1, 0, 1, 0; 10 → 0, 0, 1, 1, 0, 1, 0; 11 → 0, 1, 1, 0, 0, 0, 1.",
  ],
};
