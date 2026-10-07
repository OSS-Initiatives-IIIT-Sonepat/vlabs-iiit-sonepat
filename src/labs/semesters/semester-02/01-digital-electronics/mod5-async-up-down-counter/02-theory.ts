import { type LabSection } from "@/labs/lab-content.types";

export const theory: LabSection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "An asynchronous (ripple) counter clocks only the first flip-flop from the external clock; each later flip-flop is clocked by the output of the one before it. A MOD-N counter has N stable states. Three flip-flops give 8 states, so a MOD-5 counter must skip three of them (5, 6 and 7 when counting up).",
    "Each D flip-flop is wired as a toggle stage by connecting $\\bar{Q}$ to D. A positive-edge-triggered toggle stage changes state on every rising edge of its clock. For up counting, stage $n+1$ must be clocked by $\\bar{Q}_n$ (a falling $Q_n$ gives a rising $\\bar{Q}_n$). For down counting, it must be clocked by $Q_n$.",
    "One XOR gate per stage selects between the two: $CLK_{n+1} = Q_n \\oplus U$, where $U = 1$ is up mode and $U = 0$ is down mode.",
    "Up counting runs 0, 1, 2, 3, 4. When the counter momentarily reaches 101 ($Q_0 Q_2 = 1$), an asynchronous clear resets every flip-flop to 000. Down counting runs 4, 3, 2, 1, 0 and then wraps to 4. From 000 the ripple takes the counter to 111, which is detected and used to clear $Q_0$ and $Q_1$ only, leaving 100.",
    "The clear signals are $\\overline{CLR_{01}} = \\overline{Q_0 Q_2 (U + Q_1)}$ for $Q_0$ and $Q_1$, and $\\overline{CLR_2} = \\overline{U \\cdot Q_0 Q_2}$ for $Q_2$. In down mode the transient state 101 is ignored because $U + Q_1 = 0$ and $U = 0$.",
    "Because of ripple delay, intermediate glitch states appear for a few nanoseconds. They are too short to see on the LEDs but matter in high-speed designs, which is the main drawback of asynchronous counters.",
  ],
};
