import { type LabSection } from "@/labs/lab-content.types";
import { binarySubtractor4bitTheoryDiagram } from "@/labs/schematics/semester-02/01-digital-electronics/14-binary-subtractor-4bit";

export const theory: LabSection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "Binary subtraction can be done with an adder. In 2's complement arithmetic, subtracting $B$ is the same as adding the 2's complement of $B$: $A - B = A + \\overline{B} + 1$, where $\\overline{B}$ is the bitwise complement (1's complement) of $B$.",
    "A 1-bit full subtractor has inputs $A$, $B$ and borrow-in $B_{in}$. Its outputs are $D = A \\oplus B \\oplus B_{in}$ and $B_{out} = \\overline{A}\\,B + \\overline{(A \\oplus B)}\\,B_{in}$. Chaining four of them (ripple borrow) gives a 4-bit subtractor, but needs about 20 gates.",
    "The adder-based design is smaller. Invert each bit of $B$ with a 74HC04 (four NOT gates), feed the result to the $B$ inputs of a 74HC283 4-bit adder, connect $A$ to its $A$ inputs, and tie the carry-in $C_0$ to logic 1 (+5 V). The adder then computes $S = A + \\overline{B} + 1$.",
    "Reading the result: the carry-out $C_4$ tells you whether a borrow happened. If $C_4 = 1$, then $A \\ge B$, there is no borrow, and $S_3S_2S_1S_0$ is the true difference. If $C_4 = 0$, then $A < B$, a borrow occurred (Borrow $= \\overline{C_4} = 1$), and $S$ is the 2's complement of the magnitude: the true difference is $-(\\overline{S} + 1)$.",
    "Worked examples: $9 - 5$: $1001 + 1010 + 1 = 1\\,0100$, so $S = 0100$ and $C_4 = 1$, giving $+4$. $5 - 9$: $0101 + 0110 + 1 = 0\\,1100$, so $S = 1100$ and $C_4 = 0$; the magnitude is $\\overline{1100} + 1 = 0100$, giving $-4$.",
    "Extension: replacing the inverters with 74HC86 XOR gates controlled by a mode line $M$ gives an adder/subtractor ($M = 0$ adds, $M = 1$ subtracts), with $M$ also wired to $C_0$.",
  ],
  circuitDiagram: binarySubtractor4bitTheoryDiagram,
};
