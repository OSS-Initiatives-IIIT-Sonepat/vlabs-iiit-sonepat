import { type TheorySection } from "@/labs/lab-content.types";
import { halfSubtractorTheoryDiagram } from "@/labs/schematics/semester-01/02-computer-application/half-subtractor";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    'A Half Subtractor is a combinational logic circuit that performs the subtraction of two single-bit binary numbers: minuend A and subtrahend B. It produces two outputs: the Difference bit (D) and the Borrow bit (Bout). The "half" qualifier indicates that it cannot accommodate a borrow-in from a previous stage — for multi-bit subtraction a Full Subtractor (or its cascade) is required.',
    "The truth table for a Half Subtractor follows directly from binary subtraction rules: 0−0 = 0 with no borrow; 0−1 = 1 with a borrow of 1 (since we must borrow from the next significant bit); 1−0 = 1 with no borrow; 1−1 = 0 with no borrow. The resulting Boolean expressions are: Difference D = A ⊕ B (XOR), Borrow Bout = A' · B = (NOT A) AND B.",
    "Gate-level implementation: one XOR gate (from 74HC86) produces the Difference output. One NOT gate (from 74HC04) inverts input A to produce A'. One AND gate (from 74HC08) computes A' AND B to produce the Borrow output. Total ICs required: one 74HC86 (XOR), one 74HC04 (NOT), and one 74HC08 (AND) — though all three functions may be found on a single 74HC series combination IC.",
    "The Half Subtractor's Borrow expression Bout = A'·B is the complement of the A term ANDed with B. This is asymmetric: subtracting 1 from 0 generates a borrow, but subtracting 0 from any value does not. This asymmetry contrasts with the Half Adder's symmetric carry expression Cout = A·B, which treats both inputs equivalently.",
  ],
  circuitDiagram: halfSubtractorTheoryDiagram,
};
