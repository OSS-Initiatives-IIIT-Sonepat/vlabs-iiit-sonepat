import { type LabSection } from "@/labs/lab-content.types";

export const theory: LabSection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "An **encoder** is a combinational circuit that converts information from $2^n$ input lines into an $n$-bit binary code. Only one input line is expected to be active (logic 1) at a time, and the output is the binary number of that line. A 4-to-2 encoder has four inputs $D_0$–$D_3$ and two outputs $Y_1$, $Y_0$.",
    "Truth table (valid one-hot inputs): $D_0 = 1 \\Rightarrow Y_1Y_0 = 00$, $D_1 = 1 \\Rightarrow 01$, $D_2 = 1 \\Rightarrow 10$, $D_3 = 1 \\Rightarrow 11$.",
    "Reading the table gives the Boolean expressions $Y_1 = D_2 + D_3$ and $Y_0 = D_1 + D_3$. $D_0$ does not appear in either expression because its code is $00$, which is also the output when no input is active. The circuit therefore needs just **two 2-input OR gates**.",
    "**Limitations.** If two or more inputs are high at once the output is meaningless (for example $D_1 = D_2 = 1$ gives $11$). An all-zero input also gives $00$, so it cannot be distinguished from $D_0$. A *priority encoder* with a valid output solves both problems.",
  ],
};
