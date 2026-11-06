import { type TheorySection } from "@/labs/lab-content.types";
import { registersCountersTheoryDiagram } from "@/labs/schematics/semester-03/01-combinational-arithmetic/registers-counters-theory";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  circuitDiagram: registersCountersTheoryDiagram,
  paragraphs: [
    "Registers and counters are sequential logic circuits built from flip-flops. Unlike combinational circuits whose output depends only on current inputs, sequential circuits have memory — their output depends on both current inputs and past history (stored state).",
    "Flip-flop types: SR flip-flop: Set-Reset latch — S=1 sets Q=1, R=1 resets Q=0, S=R=1 is forbidden. D flip-flop: Data/Delay — Q captures D on the clock edge. Simple and most commonly used. JK flip-flop: J (set), K (reset); J=K=1 causes toggle. Universal flip-flop — any other type can be derived from it. T flip-flop: Toggle — T=1 toggles Q, T=0 holds. Used directly in counters.",
    "A register is an array of flip-flops that stores multiple bits. All flip-flops share a common clock. Shift register types: SIPO (Serial-In Parallel-Out): data shifted in 1 bit per clock, all n bits available simultaneously after n clocks. Used in serial-to-parallel conversion. SISO (Serial-In Serial-Out): shift register used as a delay line — data takes n clocks to traverse. PIPO (Parallel-In Parallel-Out): all n bits loaded and output simultaneously on one clock edge. Used as a data buffer or pipeline register. PISO (Parallel-In Serial-Out): n bits loaded in one clock, shifted out one bit per subsequent clock. Used in parallel-to-serial conversion (e.g., SPI transmitter).",
    "A counter is a sequential circuit that cycles through a predefined sequence of states on each clock edge. The modulus (MOD) is the number of states in the sequence. A MOD-8 counter counts 0→1→2→3→4→5→6→7→0. Ripple (asynchronous) counter: each flip-flop is clocked by the output of the previous stage. Simple but introduces propagation glitches — the MSB changes only after n flip-flop delays. Synchronous counter: all flip-flops clocked simultaneously. Faster and glitch-free, at the cost of slightly more complex combinational logic for the J/K or T inputs.",
    "Presettable counters can be loaded with any starting value on a LOAD command, enabling arbitrary modulus: for MOD-6, load 0 when count reaches 6 (using a NAND gate detecting state 6). Up/down counters count in either direction based on a control input. Ring counter: a single 1 bit circulates through n flip-flops — n states but requires n flip-flops (less efficient than binary). Johnson (twisted ring) counter: feedback is inverted — 2n states from n flip-flops.",
    "Key ICs: 74HC74 (dual D flip-flop), 74HC76 (dual JK), 74HC194 (4-bit universal shift register), 74HC163 (4-bit synchronous binary counter with synchronous load and clear), 74HC273 (8-bit D register, used in the SIPO shift register lab).",
  ],
};
