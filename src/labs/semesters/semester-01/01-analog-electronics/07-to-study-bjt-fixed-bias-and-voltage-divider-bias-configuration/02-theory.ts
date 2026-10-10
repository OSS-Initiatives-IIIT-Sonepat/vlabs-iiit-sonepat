import { type TheorySection } from "@/labs/lab-content.types";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "Biasing of a transistor refers to the application of suitable DC voltages across the emitter-base and collector-base junctions to ensure the transistor operates in the active region (emitter-base forward biased, collector-base reverse biased) for linear signal amplification without waveform clipping.",

    "**1. Fixed Bias (Base Bias) Configuration:**\n" +
      "In the fixed bias circuit, a single base resistor $R_B$ is connected between the DC supply $V_{CC}$ and the transistor base, while a collector resistor $R_C$ connects between $V_{CC}$ and the collector. The emitter is directly connected to ground.\n" +
      "- Base loop equation (KVL): $V_{CC} - I_B R_B - V_{BE} = 0 \\implies I_B = \\frac{V_{CC} - V_{BE}}{R_B}$\n" +
      "- Collector current: $I_C = \\beta I_B$\n" +
      "- Collector loop equation (KVL): $V_{CE} = V_{CC} - I_C R_C$\n" +
      "- Stability Factor: $S = \\frac{\\partial I_C}{\\partial I_{CO}} = 1 + \\beta$\n" +
      "Because $\\beta$ (current gain) varies substantially between transistors (even of the same type) and increases with temperature ($+0.5\\%/^\\circ\\text{C}$), $I_C$ and the operating Q-point shift dramatically, making fixed bias thermally unstable.",

    "**2. Voltage Divider Bias (Self-Bias) Configuration:**\n" +
      "Voltage divider bias uses two resistors, $R_1$ and $R_2$, forming a voltage divider across $V_{CC}$ to establish a constant base voltage $V_B$, and an emitter resistor $R_E$ to provide negative feedback.\n" +
      "- Thevenin equivalent voltage: $V_{TH} = V_{CC} \\left(\\frac{R_2}{R_1 + R_2}\\right)$\n" +
      "- Thevenin equivalent resistance: $R_{TH} = R_1 \\parallel R_2 = \\frac{R_1 R_2}{R_1 + R_2}$\n" +
      "- Base-emitter loop: $V_{TH} - I_B R_{TH} - V_{BE} - I_E R_E = 0$\n" +
      "- Since $I_E = (1 + \\beta) I_B \\approx I_C$, the emitter voltage is $V_E = I_E R_E \\approx V_B - V_{BE}$\n" +
      "- Collector current: $I_C \\approx \\frac{V_B - V_{BE}}{R_E}$\n" +
      "- Collector-to-emitter voltage: $V_{CE} = V_{CC} - I_C (R_C + R_E)$\n" +
      "- Stability Factor: $S = \\frac{1 + \\beta}{1 + \\beta \\left(\\frac{R_E}{R_{TH} + R_E}\\right)}$. When $R_{TH} \\ll \\beta R_E$, $S \\to 1 + \\frac{R_{TH}}{R_E} \\approx 1$.\n" +
      "If temperature rises, $I_C$ attempts to increase. This increases $V_E = I_E R_E$, which reduces $V_{BE} = V_B - V_E$, thereby reducing $I_B$ and bringing $I_C$ back down. This negative feedback stabilizes the Q-point regardless of variations in $\\beta$.",

    "**DC Load Line and Q-Point:**\n" +
      "The DC load line is plotted on the transistor output characteristics ($I_C$ vs $V_{CE}$):\n" +
      "- Saturation point: $I_{C(sat)} = \\frac{V_{CC}}{R_C}$ (Fixed Bias) or $\\frac{V_{CC}}{R_C + R_E}$ (Voltage Divider Bias) at $V_{CE} = 0$.\n" +
      "- Cutoff point: $V_{CE(cutoff)} = V_{CC}$ at $I_C = 0$.\n" +
      "The intersection of the DC load line with the base current curve ($I_B$) establishes the quiescent operating point $Q(V_{CEQ}, I_{CQ})$. For maximum symmetrical dynamic range, the Q-point is biased near the center of the active region ($V_{CEQ} \\approx V_{CC} / 2$).",
  ],
};
