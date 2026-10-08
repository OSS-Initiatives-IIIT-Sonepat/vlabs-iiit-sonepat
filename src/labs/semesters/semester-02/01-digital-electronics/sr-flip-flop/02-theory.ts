import { type TheorySection } from "@/labs/lab-content.types";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A flip-flop is a bistable circuit: it has two stable states and can store one bit of information. The S-R flip-flop is the simplest one. It has two inputs, Set ($S$) and Reset ($R$), and two complementary outputs, $Q$ and $\\overline{Q}$.",
    "The circuit is built from two NOR gates whose outputs are cross-coupled to each other's inputs: $Q = \\overline{R + \\overline{Q}}$ and $\\overline{Q} = \\overline{S + Q}$. This feedback is what gives the circuit memory.",
    "Operation of the NOR S-R flip-flop: (1) $S=0, R=0$: no change, the output holds its previous state. (2) $S=0, R=1$: reset, $Q=0$ and $\\overline{Q}=1$. (3) $S=1, R=0$: set, $Q=1$ and $\\overline{Q}=0$. (4) $S=1, R=1$: invalid, both outputs go to 0 so $Q \\ne \\overline{Q}$ no longer holds. If S and R then return to 0 together, the final state is unpredictable, so this input is forbidden.",
    "Characteristic equation: $Q_{n+1} = S + \\overline{R}\\,Q_n$ with the constraint $S\\cdot R = 0$.",
    "A flip-flop built from NAND gates works the same way but with active-LOW inputs: the inputs are $\\overline{S}$ and $\\overline{R}$ and the invalid condition is $\\overline{S}=\\overline{R}=0$.",
    "The 74HC02 quad 2-input NOR gate is used. Each output drives an LED through a 330 Ω resistor so the stored state can be seen directly: LED ON means the output is logic 1.",
    "Applications: the S-R flip-flop is the basic building block of memory elements, switch debouncing circuits, registers and counters.",
  ],
};
