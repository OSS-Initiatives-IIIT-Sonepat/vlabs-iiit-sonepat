import { type ExperimentDefinition } from "@/labs/experiments/types";
import { syncCounter74hc161TheoryDiagram } from "@/labs/schematics/semester-02/04-sequential-logic/01-sync-counter-74hc161";

type Section = ExperimentDefinition["sections"][number];

export const theory: Section = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A counter is a sequential circuit that goes through a fixed sequence of states on successive clock pulses. In a synchronous counter every flip-flop is driven by the same clock, and combinational logic decides which flip-flops toggle. All outputs therefore change together, a short propagation delay after the clock edge. This avoids the cumulative delay and the brief false states of a ripple counter, so synchronous counters can run faster and their outputs can safely be decoded.",
    "For a 4-bit binary up-counter, flip-flop Q0 toggles on every clock, Q1 toggles when Q0 = 1, Q2 when Q1 Q0 = 11 and Q3 when Q2 Q1 Q0 = 111. The counter goes from 0000 to 1111 and then rolls over to 0000, so it has 16 states (MOD-16).",
    "The 74HC161 is a 4-bit synchronous binary counter that counts on the rising edge of CLK. Its control inputs are: CLR' (master reset, active LOW, asynchronous), which forces all outputs to 0 at once; LD' (parallel enable, active LOW, synchronous), which loads D3–D0 into the counter on the next rising clock edge; and ENP and ENT (count enables), which must both be HIGH for counting. RCO (ripple carry out, called TC on some datasheets) is HIGH when the count is 1111 and ENT is HIGH; it is used to cascade counters into 8, 12 or 16 bits.",
    "Pin connections (datasheet). CLR' pin 1, CLK pin 2, D0–D3 pins 3–6, ENP pin 7, GND pin 8, LD' pin 9, ENT pin 10, Q3 pin 11, Q2 pin 12, Q1 pin 13, Q0 pin 14, RCO pin 15, VCC pin 16.",
    "MOD-N counter by synchronous load. To count from 0 to N − 1, detect state N − 1 and use it to load 0000 on the next edge. For a decade counter N − 1 = 9 = 1001, so LD' = (Q3 · Q0)', which a single NAND gate provides (no other count from 0 to 9 has both Q3 and Q0 HIGH). Because the load is synchronous, the counter goes from 9 directly to 0 on the next clock edge. The alternative of using CLR' to reset at count 10 works, but the counter briefly enters state 1010 before clearing, which produces a glitch.",
  ],
  circuitDiagram: syncCounter74hc161TheoryDiagram,
};
