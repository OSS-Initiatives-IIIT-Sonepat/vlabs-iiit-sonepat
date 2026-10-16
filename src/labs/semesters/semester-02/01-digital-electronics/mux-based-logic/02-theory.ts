import { type TheorySection } from "@/labs/lab-content.types";
import { muxBasedLogicTheoryDiagram } from "@/labs/schematics/semester-02/01-digital-electronics/mux-based-logic";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A 2:1 MUX is a universal logic element in the sense that any two-variable Boolean function can be realised by connecting constant logic values (0 or 1) or one of the input variables to its two data inputs, while using the other variable as the select input. A 2ⁿ:1 MUX can implement any n-variable Boolean function with no additional gates by exhaustively mapping the function's truth table to the data inputs.",
    "For a 2:1 MUX with select S and data inputs D0, D1 — output Y = D0·S' + D1·S. To implement any 2-variable function f(A, B), assign S = A (one variable controls selection), then set D0 and D1 based on the function's behaviour: D0 = f(A=0, B) = a function of B only; D1 = f(A=1, B) = a function of B only. The possible values for D0 and D1 are {0, 1, B, B'}.",
    "Example implementations: AND(A,B) — with S=A: f(0,B)=0, f(1,B)=B → D0=0, D1=B. OR(A,B) — with S=A: f(0,B)=B, f(1,B)=1 → D0=B, D1=1. XOR(A,B) — with S=A: f(0,B)=B, f(1,B)=B' → D0=B, D1=B'. XNOR(A,B) — D0=B', D1=B. These assignments are read directly from columns of the truth table where A=0 and A=1 respectively.",
    "MUX-based logic synthesis is practically important in FPGAs (Field-Programmable Gate Arrays), where each logic cell is a small MUX-based Look-Up Table (LUT). A 4-input LUT can implement any 4-variable Boolean function by programming its 16 data inputs. Understanding MUX-as-logic reduces design to a table look-up, eliminating the need for algebraic minimisation in hardware.",
  ],
  circuitDiagram: muxBasedLogicTheoryDiagram,
};
