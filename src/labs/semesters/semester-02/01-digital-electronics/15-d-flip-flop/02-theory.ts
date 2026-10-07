import { type TheorySection } from "@/labs/lab-content.types";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "The D (Data or Delay) flip-flop stores one bit. It has a data input $D$, a clock input $CLK$ and two complementary outputs $Q$ and $\\overline{Q}$. At the active clock edge the value on $D$ is copied to $Q$; at all other times $Q$ keeps its previous value.",
    "Characteristic equation: $Q_{n+1} = D$. Unlike the S-R flip-flop the D flip-flop has no invalid input combination, because $\\overline{Q}$ is always the complement of $Q$.",
    "The 74HC74 is positive-edge triggered. $Q$ can change only at the instant the clock goes from 0 to 1. While the clock is steady at 0 or 1, or when it falls from 1 to 0, changes of $D$ have no effect on $Q$. This is the difference from a level-triggered D latch, which follows $D$ for as long as the enable is active.",
    "The 74HC74 also has two asynchronous inputs, preset ($\\overline{PRE}$) and clear ($\\overline{CLR}$). Both are active LOW and override the clock. In this experiment both are tied to VCC so that they stay inactive.",
    "$D$ must be stable for a short setup time before the clock edge and a hold time after it. Changing $D$ right at the edge makes the result unpredictable.",
    "Circuit construction: an edge-triggered D flip-flop can be built from two gated D latches in a master-slave arrangement. The master follows $D$ while CLK = 0 and the slave copies the master when CLK = 1, so the output changes only at the rising edge.",
    "Applications: registers, shift registers, counters, frequency dividers (connect $\\overline{Q}$ to $D$ to divide the clock by 2), and synchronising an input with a clock.",
    "Each output drives an LED through a 330 Ω resistor: LED ON means logic 1.",
  ],
};
