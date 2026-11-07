import { type TheorySection } from "@/labs/lab-content.types";
import { divide8bitTheoryDiagram } from "@/labs/schematics/semester-04/01-8085-assembly-programming/assembly-diagrams";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "Like multiplication, the 8085 has no hardware division instruction. Division is implemented as repeated subtraction: the dividend is repeatedly reduced by the divisor until the remainder is less than the divisor. The number of successful subtractions is the quotient.",
    "The CMP (Compare) instruction subtracts the operand from A without storing the result, only updating flags. If A < operand, the Carry flag (CY) is set indicating the remainder is already less than the divisor, so the loop terminates. JC (Jump if Carry) implements this termination check.",
    "Before each subtraction, we compare the current dividend with the divisor. If DIVIDEND >= DIVISOR, subtract and increment the quotient counter. If DIVIDEND < DIVISOR, exit — the remaining value is the remainder.",
    "Key instructions used: CMP B (compare B with A), JC (jump if carry, i.e., A < B), SUB B (subtract B from A), INR C (increment quotient count). The quotient is stored in C and the remainder stays in A at the end of the loop.",
    "Division by zero must be handled specially; if the divisor is 0, the program should output 0FFH as an error indicator. The ORA instruction (OR A with itself) sets the Zero flag without changing A, allowing a JZ check for the zero-divisor case.",
  ],
  circuitDiagram: divide8bitTheoryDiagram,
};
