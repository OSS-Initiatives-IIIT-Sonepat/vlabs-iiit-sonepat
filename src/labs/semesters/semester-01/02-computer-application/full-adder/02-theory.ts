import { type TheorySection } from "@/labs/lab-content.types";
import { fullAdderTheoryDiagram } from "@/labs/schematics/semester-01/02-computer-application/full-adder";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A Full Adder is a combinational logic circuit that computes the arithmetic sum of three input bits: augend A, addend B, and carry-in Cin. It produces two outputs: the Sum bit and the Carry-out bit (Cout). Unlike a Half Adder, the Full Adder can accept a carry from a previous less-significant stage, making it suitable for chaining into multi-bit ripple-carry or carry-look-ahead adder architectures.",
    "The Boolean expressions for a Full Adder are derived from its truth table. Sum = A ⊕ B ⊕ Cin (three-input XOR). Cout = (A · B) + (B · Cin) + (A · Cin) = (A · B) + Cin · (A ⊕ B). The Cout expression can be factored using the intermediate XOR term P = A ⊕ B: Cout = (A · B) + (Cin · P), which directly maps to the gate-level implementation: two XOR gates for Sum, two AND gates and one OR gate for Cout.",
    "Gate-level implementation using 74HC-series ICs: two 74HC86 (quad XOR) gates for the Sum path, two gates from a 74HC08 (quad AND) for the carry generation, and one gate from a 74HC32 (quad OR) for the carry combination. Total IC count: 1× 74HC86, 1× 74HC08, 1× 74HC32. All three ICs are DIP-14 packages powered from a 5 V supply.",
    "A 4-bit ripple-carry adder is constructed by cascading four Full Adders in series, with each stage's Cout connected to the next stage's Cin. The carry \"ripples\" from LSB to MSB, introducing a cumulative propagation delay. The total worst-case delay is 4 × (carry propagation time per stage), which limits the maximum operating frequency of the adder.",
  ],
  circuitDiagram: fullAdderTheoryDiagram,
};
