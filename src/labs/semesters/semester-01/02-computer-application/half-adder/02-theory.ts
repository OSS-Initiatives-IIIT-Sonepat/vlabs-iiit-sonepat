import { type TheorySection } from "@/labs/lab-content.types";
import { halfAdderTheoryDiagram } from "@/labs/schematics/half-adder-schematics";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    'A half adder is a combinational logic circuit that performs addition of two single-bit binary inputs, A and B. It produces two outputs: a Sum bit and a Carry bit. The Sum is the result of the XOR operation on A and B (Sum = A ⊕ B), while the Carry is the result of the AND operation (Carry = A · B). The name "half" adder reflects that it cannot handle a carry input from a previous stage — that capability belongs to the full adder.',
    "The XOR gate (74HC86) implements the Sum output. It produces a HIGH output only when its two inputs differ — that is, when exactly one of A or B is HIGH. The AND gate (74HC08) implements the Carry output. It produces a HIGH output only when both A and B are HIGH simultaneously, representing a carry into the next binary digit position.",
    "In binary arithmetic, 0+0=00, 0+1=01, 1+0=01, and 1+1=10. The two bits of the result map directly to the Carry (most significant) and Sum (least significant) outputs of the half adder. The circuit is the fundamental building block of all binary adder architectures and forms the basis of arithmetic logic units (ALUs) in processors.",
    "Both the 74HC86 (XOR) and 74HC08 (AND) are CMOS logic ICs operating from 2 V to 6 V. They are quad-gate packages, meaning each IC contains four independent gates. In this experiment only one gate from each IC is used. Current-limiting resistors (330 Ω) protect the output LEDs from excessive current draw.",
  ],
  circuitDiagram: halfAdderTheoryDiagram,
};
