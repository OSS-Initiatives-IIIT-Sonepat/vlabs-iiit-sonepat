import { type TheorySection } from "@/labs/lab-content.types";
import { arithmeticCircuitTheoryDiagram } from "@/labs/schematics/semester-03/05-computer-arithmetic/arithmetic-circuit";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "The arithmetic microoperations can be implemented in one composite arithmetic circuit. The basic component is the parallel adder. By controlling the data inputs to the adder, the same row of full adders adds, subtracts, increments, decrements, or simply transfers A.",
    "The output of the binary adder is the arithmetic sum D = A + Y + Cin. A is one operand, taken straight from its register. Y is a 4-bit word built one bit at a time. Cin is a single bit added at the low end. Nothing else in the circuit changes between operations. Only Y and Cin change.",
    "A 4×1 multiplexer on each bit builds Y. Its select lines are S1 and S0, and they are common to all four bits. Input 0 of the mux is B. Input 1 is B', the 1's complement of that same bit. Input 2 is the constant 0. Input 3 is the constant 1. So the four choices of Y are the word B, the word B', the word 0000, and the word 1111.",
    "S1 S0 = 00 selects B, and D = A + B + Cin. Cin = 0 is a plain add. Cin = 1 is an add with carry, the operation used when a previous word produced a carry.",
    "S1 S0 = 01 selects B'. D = A + B' is called subtract with borrow: it is one less than A − B, because the +1 of the 2's complement has not been added yet. D = A + B' + 1, with Cin = 1, is a true subtract. That +1 completes the 2's complement of B.",
    "S1 S0 = 10 selects 0000. With Cin = 0 the adder computes D = A, a transfer. With Cin = 1 it computes D = A + 1, an increment.",
    "S1 S0 = 11 selects 1111. Adding a word of all ones is the same as subtracting one, because the 2's complement of 0001 is 1111. With Cin = 0, D = A + 1111, which is A − 1. The figure marks this case: A = 1101, Y = 1111, and the sum is 1 1100. The high bit is Cout. Discard it when only the 4-bit word is wanted, and D = 1100, which is 13 − 1 = 12. With Cin = 1 the adder computes A + 1111 + 1. The extra one cancels the decrement and D returns to A, with Cout = 1. That last row is also a transfer.",
    "On this board A is tied to 1101 and B to 0011, so B' is tied to 1100. The drawing shows an inverter on each B bit, which is how B' is formed when B comes from a register. The eight lamp readings, written as Cout followed by D3 D2 D1 D0, are 1 0000, 1 0001, 1 1001, 1 1010, 0 1101, 0 1110, 1 1100, and 1 1101.",
  ],
  circuitDiagram: arithmeticCircuitTheoryDiagram,
};
