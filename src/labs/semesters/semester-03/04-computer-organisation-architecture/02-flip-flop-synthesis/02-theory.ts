import { type TheorySection } from "@/labs/lab-content.types";
import { flipFlopSynthesisTheoryDiagram } from "@/labs/schematics/semester-03/04-computer-organisation-architecture/02-flip-flop-synthesis";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  circuitDiagram: flipFlopSynthesisTheoryDiagram,
  paragraphs: [
    "A flip-flop stores one bit. Its characteristic table lists the next state $Q^+$ for every present state $Q$ and every combination of the control inputs. The characteristic equation is that table compressed into Boolean algebra.",
    "For an SR latch the equation is $Q^+ = S + \\bar{R} Q$, and the input $SR = 11$ is forbidden because both NAND (or both NOR) outputs would be driven to the same value. A JK flip-flop removes that hole: $Q^+ = J\\bar{Q} + \\bar{K} Q$. Toggle is the case $J = K = 1$, which gives $Q^+ = \\bar{Q}$. A D flip-flop is the assignment $Q^+ = D$. A T flip-flop is $Q^+ = T \\oplus Q$.",
    "The excitation table runs the characteristic table backwards. You choose the next state you want, and the table tells you which inputs produce it. For JK: hold 0 with $J = 0$ ($K$ is anything), set with $J = 1$, reset with $K = 1$, and hold 1 with $K = 0$. Those don't-cares are what make one flip-flop cheap to convert into another.",
    "Synthesis here means picking a target equation and wiring the inputs of a flip-flop you already have. To make a D from a JK, set $J = D$ and $K = \\bar{D}$. Then $Q^+ = D\\bar{Q} + D Q = D$. The clocked breadboard labs for the 74HC74 and 74HC76 in Digital Electronics are the same devices on a board; this lab is the equation that those pins implement.",
  ],
};
