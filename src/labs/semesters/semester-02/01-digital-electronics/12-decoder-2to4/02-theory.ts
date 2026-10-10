import { type LabSection } from "@/labs/lab-content.types";

export const theory: LabSection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A **decoder** is a combinational circuit that converts an $n$-bit binary code into $2^n$ output lines, of which exactly one is active for each input combination. A 2-to-4 decoder has two inputs $A_1$, $A_0$ and four outputs $Y_0$–$Y_3$. It is the reverse of an encoder, and each output is a *minterm* of the inputs.",
    "Truth table: $A_1A_0 = 00 \\Rightarrow Y_0 = 1$, $01 \\Rightarrow Y_1 = 1$, $10 \\Rightarrow Y_2 = 1$, $11 \\Rightarrow Y_3 = 1$; all other outputs are 0.",
    "Standard minterm expressions: $Y_0 = \\overline{A_1}\\,\\overline{A_0}$, $Y_1 = \\overline{A_1}\\,A_0$, $Y_2 = A_1\\,\\overline{A_0}$, $Y_3 = A_1\\,A_0$. This needs two NOT gates and four AND gates.",
    "**Breadboard realisation.** To save board space and ICs, the same functions are built without inverters: $Y_0 = \\overline{A_1 + A_0}$ (NOR), $Y_3 = A_1 A_0$ (AND), and with $X = A_1 \\oplus A_0$ (XOR): $Y_1 = A_0 \\cdot X$ and $Y_2 = A_1 \\cdot X$. For example, when $A_1A_0 = 01$, $X = 1$ and $Y_1 = 1\\cdot1 = 1$, while for $11$, $X = 0$ so $Y_1 = 0$. These are logically identical to the minterm expressions.",
    "Decoders are used for address decoding, memory chip-select generation, and display drivers. With an *enable* input, decoders can also be cascaded or used as demultiplexers.",
  ],
};
