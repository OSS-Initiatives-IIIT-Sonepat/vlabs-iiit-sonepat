import { type TheorySection } from "@/labs/lab-content.types";
import { s2Decoder2to4TheoryDiagram } from "@/labs/schematics/semester-02/01-digital-electronics/12-decoder-2to4";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A binary decoder converts an n-bit binary input code into one of 2ⁿ output lines. A 2:4 decoder takes a 2-bit input (A, B) and asserts exactly one of four output lines (Y0, Y1, Y2, Y3) corresponding to the decimal value of the binary input. At any given time, exactly one output is HIGH (active-high decoder) and the remaining three are LOW. Alternatively, an active-low decoder has exactly one output LOW while the others are HIGH.",
    "The Boolean expressions for an active-high 2:4 decoder are derived from minterms: Y0 = A'·B' (minterm 0 — inputs 00); Y1 = A'·B (minterm 1 — inputs 01); Y2 = A·B' (minterm 2 — inputs 10); Y3 = A·B (minterm 3 — inputs 11). Each output is a unique minterm of the two input variables. Four AND gates and two NOT gates implement the decoder.",
    "Gate-level implementation: two NOT gates (74HC04) generate A' and B'; four AND gates (74HC08 — uses all four gates in one IC) each implement one minterm (Y0=A'B', Y1=A'B, Y2=AB', Y3=AB). Total ICs: 1× 74HC04, 1× 74HC08. This is a complete one-IC-each solution. Commercial decoders such as the 74HC139 (dual 2:4) or 74HC138 (3:8) include an active-low enable input for chip-select and cascading.",
    "Applications of 2:4 decoders include: memory address decoding (selecting one of four memory chips based on two address lines), instruction decoding in CPUs (activating one of four functional units), display digit selection in multiplexed 7-segment displays, and as a fundamental sub-block in larger decoders (two 2:4 decoders plus an inverter form a 3:8 decoder).",
  ],
  circuitDiagram: s2Decoder2to4TheoryDiagram,
};
