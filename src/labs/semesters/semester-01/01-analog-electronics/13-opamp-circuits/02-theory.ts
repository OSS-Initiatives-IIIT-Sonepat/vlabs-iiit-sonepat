import { type TheorySection } from "@/labs/lab-content.types";
import { opampCircuitsTheoryDiagram } from "@/labs/schematics/opamp-circuits-schematics";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "An **operational amplifier (op-amp)** is a high-gain differential amplifier IC. The LM741 has an open-loop voltage gain $A_{OL} \\approx 200{,}000$ (106 dB), input impedance $Z_{in} > 2\\,\\text{M}\\Omega$, and output impedance $Z_{out} < 75\\,\\Omega$ under closed-loop conditions. When negative feedback is applied, two **virtual ground rules** hold: (1) $V_+ = V_-$ (the differential input is forced to zero), and (2) $I_+ = I_- = 0$ (no current flows into the input terminals).",
    "For the **inverting amplifier**, the signal enters the inverting (−) input through $R_{in}$; the non-inverting (+) input is grounded. Virtual ground forces $V_- = 0$, so all of $V_{in}$ drops across $R_{in}$ setting $I_{in} = V_{in}/R_{in}$. This current must flow through $R_f$ (since $I_- = 0$), giving $V_{out} = -I_{in} R_f$:$$A_v = \\frac{V_{out}}{V_{in}} = -\\frac{R_f}{R_{in}} = -\\frac{100\\,\\text{k}}{10\\,\\text{k}} = -10$$The negative sign indicates **180° phase inversion**. Input impedance equals $R_{in} = 10\\,\\text{k}\\Omega$.",
    "For the **non-inverting amplifier**, $V_{in}$ connects directly to $V_+$. Virtual ground forces $V_- = V_{in}$, so the voltage divider $R_1$–$R_f$ must produce $V_{in}$ at the inverting input:$$V_{in} = V_{out}\\frac{R_1}{R_1 + R_f} \\implies A_v = 1 + \\frac{R_f}{R_1} = 1 + \\frac{100\\,\\text{k}}{10\\,\\text{k}} = +11$$No phase inversion occurs. Input impedance is $Z_{in} \\approx A_{OL} \\times Z_{diff}$ — essentially infinite.",
    "**Practical limitations**: the LM741 has a unity-gain bandwidth (GBW) of $\\approx 1\\,\\text{MHz}$, so the bandwidth at gain 10 is $f_{-3\\text{dB}} \\approx 1\\,\\text{MHz}/10 = 100\\,\\text{kHz}$ (inverting) and $1\\,\\text{MHz}/11 \\approx 91\\,\\text{kHz}$ (non-inverting). The output will be clipped if $|V_{out}|$ exceeds $V_{CC} - 1.5\\,\\text{V} \\approx \\pm 10.5\\,\\text{V}$ (rail-to-rail headroom). The slew rate ($0.5\\,\\text{V}/\\mu\\text{s}$) limits large-signal bandwidth.",
  ],
  circuitDiagram: opampCircuitsTheoryDiagram,
};
