import { type TheorySection } from "@/labs/lab-content.types";
import { fullAdderRippleTheoryDiagram } from "@/labs/schematics/semester-02/02-advanced-adders/full-adder-ripple";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  circuitDiagram: fullAdderRippleTheoryDiagram,
  paragraphs: [
    "A Ripple Carry Adder (RCA) is formed by chaining multiple Full Adder stages in series, with the Carry-out (Cout) of each stage connected to the Carry-in (Cin) of the next more-significant stage. A 4-bit RCA can add two 4-bit numbers A[3:0] and B[3:0] to produce a 4-bit sum S[3:0] and a final carry-out C4. The least-significant bit (bit 0) has Cin = 0 (no initial carry).",
    "The fundamental limitation of the RCA is carry propagation latency. The worst-case scenario occurs when the carry must ripple through all stages: e.g., A = 0111 and B = 0001 → the carry generated at bit 0 propagates through bits 1, 2, and 3. Total worst-case delay = n × t_pd(FA), where n is the number of bits and t_pd(FA) is the carry-propagation delay of one Full Adder stage (approximately 2× t_pd(gate) for the AND+OR carry path).",
    "For a 74HC implementation with t_pd ≈ 7 ns per gate: each Full Adder's carry path involves one AND gate and one OR gate, giving t_pd(carry) ≈ 14 ns per stage. A 4-bit RCA has a worst-case latency of 4 × 14 = 56 ns. This limits the maximum clock frequency of any synchronous circuit using this adder. Carry Look-Ahead Adders (CLAs) resolve this by computing all carries simultaneously, reducing latency to O(log n) gate delays.",
    "The 4-bit RCA requires four sets of Full Adder gate circuits: 4× XOR pairs (8 XOR gates total → two 74HC86 ICs), 4× AND pairs (8 AND gates total → two 74HC08 ICs), 4× OR gates (4 gates total → one 74HC32 IC). The carry chain connections (C0→C1→C2→C3→C4) form the critical path. Sum outputs S[3:0] and the final carry C4 are displayed on five LEDs.",
  ],
};
