import { type TheorySection } from "@/labs/lab-content.types";
import { dFlipFlopTheoryDiagram } from "@/labs/schematics/s2-d-flip-flop-schematics";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A D flip-flop (Data or Delay flip-flop) captures the value of the D input on a specific clock edge and holds it until the next clock edge. The 74HC74 provides two independent rising-edge-triggered D flip-flops in a DIP-14 package.",
    'The characteristic equation is $$Q_{n+1} = D \\quad \\text{(on the rising clock edge)}$$ Between clock edges the output Q is stable — it holds the last captured value regardless of changes on D. This is the "data latch on clock edge" behaviour.',
    "The 74HC74 also has asynchronous override inputs: active-low $\\overline{PRE}$ (preset, forces Q=1) and active-low $\\overline{CLR}$ (clear, forces Q=0). These take effect immediately, independent of the clock. In normal operation both are tied HIGH (inactive). **Setup time** ($t_{su}$) is the minimum time D must be stable before the clock edge. **Hold time** ($t_h$) is the minimum time D must remain stable after the clock edge.",
    "Applications: shift registers, pipeline registers, state machines, frequency dividers (connect Q_bar to D → output toggles every clock cycle = ÷2 counter). The D-FF eliminates the forbidden state of the SR latch, making it the most common storage element in digital systems.",
  ],
  circuitDiagram: dFlipFlopTheoryDiagram,
};
