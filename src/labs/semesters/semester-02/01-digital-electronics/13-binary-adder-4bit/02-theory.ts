import { type LabSection } from "@/labs/lab-content.types";
import { binaryAdder4bitTheoryDiagram } from "@/labs/schematics/semester-02/01-digital-electronics/13-binary-adder-4bit";

export const theory: LabSection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A **binary adder** adds two binary numbers. A **full adder** adds three 1-bit inputs, the two operands $A_i$ and $B_i$ and a carry-in $C_i$, and produces a sum bit $S_i$ and a carry-out $C_{i+1}$. A **4-bit ripple-carry adder** is made by cascading four full adders so that the carry-out of each stage becomes the carry-in of the next stage.",
    "Full-adder equations for bit $i$: $P_i = A_i \\oplus B_i$ (propagate), $G_i = A_i \\cdot B_i$ (generate), $S_i = P_i \\oplus C_i$ and $C_{i+1} = G_i + P_i \\cdot C_i$. Each full adder therefore needs two XOR gates, two AND gates and one OR gate.",
    "For the 4-bit adder, $A = A_3A_2A_1A_0$ and $B = B_3B_2B_1B_0$ are added with an external carry-in $C_0 = C_{in}$. The result is a 5-bit number $C_{out}\\,S_3S_2S_1S_0$ where $C_{out} = C_4$. The result ranges from 0 (0 + 0 + 0) to 31 (15 + 15 + 1), so the carry-out is needed to represent sums above 15.",
    "The experiment uses discrete gates: **74HC86** (quad 2-input XOR), **74HC08** (quad 2-input AND) and **74HC32** (quad 2-input OR). Four full adders need 8 XOR, 8 AND and 4 OR gates, which is exactly two 74HC86, two 74HC08 and one 74HC32. The same function is available in a single IC, the 74HC283 (7483) 4-bit binary adder, which uses carry look-ahead internally.",
    "In a ripple-carry adder the carry must pass through every stage in turn. The worst-case delay is therefore about $4 \\times (t_{AND} + t_{OR})$ for the carry chain plus one XOR delay for the last sum bit, and it grows linearly with the number of bits. This is why wide adders use carry look-ahead.",
  ],
  circuitDiagram: binaryAdder4bitTheoryDiagram,
};
