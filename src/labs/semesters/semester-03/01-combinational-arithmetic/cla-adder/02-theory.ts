import { type TheorySection } from "@/labs/lab-content.types";
import { claAdderTheoryDiagram } from "@/labs/schematics/semester-03/01-combinational-arithmetic/cla-adder";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  circuitDiagram: claAdderTheoryDiagram,
  paragraphs: [
    "A Ripple Carry Adder (RCA) chains n full adders in series: each stage must wait for the carry from the previous stage before it can compute its sum and carry. The total propagation delay is $n \\times t_{FA}$ where $t_{FA}$ is the delay through one full adder. For a 64-bit adder, this means 64 gate delays — unacceptably slow for modern processors.",
    "The Carry-Look-Ahead Adder (CLA) solves this by pre-computing all carry signals in parallel before the actual addition. Two auxiliary signals are defined for each bit position $i$: the Generate signal $G_i = A_i \\cdot B_i$ (this stage will definitely produce a carry regardless of carry-in) and the Propagate signal $P_i = A_i \\oplus B_i$ (this stage will propagate an incoming carry).",
    "With G and P defined, the carry into bit position $i+1$ is: $$C_{i+1} = G_i + P_i \\cdot C_i$$ Expanding this recursively for a 4-bit CLA: $$C_1 = G_0 + P_0 C_0$$ $$C_2 = G_1 + P_1 G_0 + P_1 P_0 C_0$$ $$C_3 = G_2 + P_2 G_1 + P_2 P_1 G_0 + P_2 P_1 P_0 C_0$$ $$C_4 = G_3 + P_3 G_2 + P_3 P_2 G_1 + P_3 P_2 P_1 G_0 + P_3 P_2 P_1 P_0 C_0$$ All four carry signals are computed simultaneously from the original inputs — O(1) depth, not O(n).",
    "The sum bits are then: $S_i = P_i \\oplus C_i$ (since $P_i = A_i \\oplus B_i$, this gives the XOR of three signals). The CLA logic block computes G, P, and all carries in a fixed number of gate levels (typically 2–3 AND-OR levels). Sum computation adds one more XOR level. Total: $\\approx 4$ gate levels for any width, vs $2n$ for RCA.",
    "Block CLA (BCLA) extends this to wider adders: a 16-bit CLA uses four 4-bit CLA units, with a second-level CLA that looks ahead across the four blocks using block-level Generate and Propagate signals. This gives O(log n) depth for arbitrary width.",
    "The 74HC283 is a 4-bit CLA adder IC — it implements exactly the equations above in CMOS logic, providing fast binary addition with carry-in and carry-out for cascading.",
  ],
};
