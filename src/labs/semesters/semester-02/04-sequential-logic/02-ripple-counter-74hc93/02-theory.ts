import { type ExperimentDefinition } from "@/labs/experiments/types";
import { rippleCounter74hc93TheoryDiagram } from "@/labs/schematics/semester-02/04-sequential-logic/02-ripple-counter-74hc93";

type Section = ExperimentDefinition["sections"][number];

export const theory: Section = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "In an asynchronous or ripple counter only the first flip-flop is driven by the external clock. Each following flip-flop is a toggle (T) flip-flop clocked by the output of the one before it. With falling-edge-triggered flip-flops, a stage toggles each time the previous output goes from 1 to 0, which makes the chain count up in binary. Each stage divides its input frequency by 2, so an n-stage ripple counter has $2^n$ states and its last output runs at $f_{clk} / 2^n$.",
    "Because each stage waits for the one before it, the propagation delays add up: the last output settles about $n \\cdot t_{pd}$ after the clock edge. During that time the counter passes through false intermediate states; for example, going from 0111 to 1000 it briefly shows 0110, 0100 and 0000. This limits the maximum clock frequency and makes decoding the outputs prone to glitches. A ripple counter is simple and uses little power, which makes it good for frequency division.",
    "The 74HC93 contains four falling-edge flip-flops arranged as a divide-by-2 stage (input CKA, output QA) and a separate divide-by-8 stage (input CKB, outputs QB, QC, QD). Connecting QA to CKB joins them into a 4-bit MOD-16 counter. The two reset inputs R0(1) and R0(2) feed an internal NAND gate: when both are HIGH, all outputs are cleared to 0 at once, regardless of the clock (asynchronous reset).",
    "Pin connections (datasheet). CKB pin 1, R0(1) pin 2, R0(2) pin 3, VCC pin 5, QC pin 8, QB pin 9, GND pin 10, QD pin 11, QA pin 12, CKA pin 14. Pins 4, 6, 7 and 13 are not connected. Note that VCC and GND are not at the corners as on most 14-pin logic ICs.",
    "MOD-N counter by reset. To count from 0 to N − 1, detect count N and use it to reset the counter. For a decade counter N = 10 = 1010, so connect R0(1) to QB and R0(2) to QD: the counter resets the moment it reaches 1010. State 1010 exists only for a few nanoseconds, so the visible sequence is 0 to 9. Only the 1 bits of N need to be decoded, because no smaller count has all of those bits HIGH.",
  ],
  circuitDiagram: rippleCounter74hc93TheoryDiagram,
};
