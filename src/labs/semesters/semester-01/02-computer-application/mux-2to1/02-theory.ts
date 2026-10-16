import { type TheorySection } from "@/labs/lab-content.types";
import { mux2to1TheoryDiagram } from "@/labs/schematics/semester-01/02-computer-application/mux-2to1";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A Multiplexer (MUX) is a combinational logic circuit that selects one of several input data lines and routes it to a single output line. The selection is controlled by select (address) inputs. A 2:1 MUX has two data inputs (A and B), one select input (S), and one output (Y). It acts as a digitally controlled switch: when S = 0, the output follows input A; when S = 1, the output follows input B.",
    "The Boolean expression for a 2:1 MUX is: Y = A·S' + B·S. This can be derived from the truth table: for S=0, the B term (B·S = B·0 = 0) drops out and Y = A·1 = A; for S=1, the A term (A·S' = A·0 = 0) drops out and Y = B·1 = B. The expression is a sum-of-products (SOP) form and maps directly to a two-AND, one-OR, one-NOT gate implementation.",
    "Gate-level implementation of the 2:1 MUX: one NOT gate (74HC04) to generate S'; two AND gates (74HC08) — one computing A·S' and the other computing B·S; one OR gate (74HC32) combining the AND outputs. Total ICs: 1× 74HC04, 1× 74HC08, 1× 74HC32. This is the canonical gate-level realisation.",
    "MUX circuits are fundamental in digital systems: they implement data routing in buses, enable time-division multiplexing (TDM) in communication systems, implement any Boolean function (a 2ⁿ:1 MUX can implement any n-variable function by connecting its data inputs to the required minterms), and form the basis of FPGA look-up tables (LUTs).",
  ],
  circuitDiagram: mux2to1TheoryDiagram,
};
