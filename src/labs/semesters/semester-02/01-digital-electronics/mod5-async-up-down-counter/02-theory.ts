import { type LabSection } from "@/labs/lab-content.types";

export const theory: LabSection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A **counter** is a sequential circuit that goes through a prescribed sequence of states when clock pulses are applied. In an **asynchronous (ripple) counter** only the first flip-flop receives the external clock. The clock input of every later flip-flop is driven by the output of the previous one, so the flip-flops do not change state at the same instant.",
    "**MOD number and number of flip-flops.** A MOD-$N$ counter has $N$ distinct states. The number of flip-flops $n$ must satisfy $2^n \\ge N$. For $N = 5$, $n = 3$, because $2^2 = 4 < 5 \\le 2^3 = 8$. Three of the eight states are therefore unused. Call the flip-flops $A$ (LSB), $B$ and $C$ (MSB), with outputs $Q_A$, $Q_B$, $Q_C$.",
    "**Toggle flip-flop.** A JK flip-flop with $J = K = 1$ toggles on every active clock edge. The 74HC76 is negative-edge triggered, so its output changes on the falling edge of the clock input. Each toggle stage divides its input frequency by 2.",
    "**Asynchronous UP counter.** Connect $Q_A$ to the clock of $B$ and $Q_B$ to the clock of $C$. The counter then counts $000, 001, 010, \\dots, 111$, a natural MOD-8 up sequence.",
    "**MOD-5 UP counter.** The required sequence is $000 \\rightarrow 001 \\rightarrow 010 \\rightarrow 011 \\rightarrow 100$ and then back to $000$. After 100 the next clock edge would give 101, the first state outside the sequence. This state is detected and all flip-flops are cleared asynchronously. Among the states 000 to 101, $Q_A = Q_C = 1$ occurs first and only at 101. So $\\overline{CLR} = \\overline{Q_A \\cdot Q_C}$ (one 2-input NAND gate, 74HC00) is connected to the CLR input of all three flip-flops. State 101 exists only for a few nanoseconds (the gate and flip-flop propagation delay), so the LEDs never visibly show it.",
    "**Asynchronous DOWN counter.** Connect $\\overline{Q_A}$ to the clock of $B$ and $\\overline{Q_B}$ to the clock of $C$. The counter then counts down $111, 110, \\dots, 000$ and rolls over from $000$ to $111$.",
    "**MOD-5 DOWN counter.** The required sequence is $100 \\rightarrow 011 \\rightarrow 010 \\rightarrow 001 \\rightarrow 000$ and then back to $100$. After 000 the next clock edge naturally gives 111. This state is detected with a 3-input NAND gate (74HC10): $\\overline{CLR_{A,B}} = \\overline{Q_A \\cdot Q_B \\cdot Q_C}$. The output goes to the CLR inputs of $A$ and $B$ only. Flip-flop $C$ is already 1, so the state 111 becomes 100 (decimal 4) and the sequence restarts. None of the valid states 100, 011, 010, 001, 000 has $Q_A = Q_B = Q_C = 1$, so the NAND gate never acts early. Clearing $A$ and $B$ makes $\\overline{Q_A}$ and $\\overline{Q_B}$ rise, which is not a falling edge, so no false clock is produced.",
    "**State tables.** UP: 000, 001, 010, 011, 100, (101 transient), then 000. DOWN: 100, 011, 010, 001, 000, (111 transient), then 100. The unused states converge to the main sequence without help. In the UP counter 110 goes to 111 and then to 000. In the DOWN counter 110 goes to 101 and then to 100. Both counters are therefore self-starting.",
    "**Propagation delay.** In a ripple counter the delays of the stages add up. For $n$ flip-flops the output settles after about $n\\,t_{pd}$, so the maximum clock frequency is roughly $f_{max} \\approx 1/(n\\,t_{pd} + t_{decode})$. This is the main drawback compared with synchronous counters.",
    "**Frequency division.** A MOD-5 counter divides the clock frequency by 5, so $f_{out} = f_{clk}/5$. In the UP counter, $Q_C$ is high for only one clock period in every five, which is a 20% duty cycle.",
  ],
};
